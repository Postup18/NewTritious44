import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json();
    const {
      date,
      time_slot,
      client_name,
      client_email,
      client_phone,
      client_state,
      appointment_type,
      status,
    } = body || {};

    // Validate required fields
    const missing = [];
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) missing.push("date");
    if (!time_slot) missing.push("time_slot");
    if (!client_name || !String(client_name).trim()) missing.push("client_name");
    if (!client_email || !String(client_email).trim()) missing.push("client_email");
    if (!client_phone || !String(client_phone).trim()) missing.push("client_phone");
    if (!client_state || !String(client_state).trim()) missing.push("client_state");
    if (missing.length > 0) {
      return Response.json(
        { error: "Missing or invalid fields.", fields: missing },
        { status: 400 }
      );
    }

    // Conflict check: is this date + time_slot already taken by a non-cancelled appointment?
    const existing = await base44.asServiceRole.entities.Appointment.filter({
      date: date,
      time_slot: time_slot,
      status: { $ne: "cancelled" },
    });

    if (existing && existing.length > 0) {
      return Response.json(
        { error: "This time slot is no longer available.", conflict: true },
        { status: 409 }
      );
    }

    // Create the appointment using the service role (bypasses RLS for public visitors)
    const created = await base44.asServiceRole.entities.Appointment.create({
      date,
      time_slot,
      client_name: String(client_name).trim(),
      client_email: String(client_email).trim(),
      client_phone: String(client_phone).trim(),
      client_state: String(client_state).trim(),
      appointment_type: appointment_type || "session",
      status: status || "pending",
    });

    // For free calls, send confirmation emails server-side (anonymous visitors
    // have no client-side permissions to send email, so this must run here).
    if (appointment_type === "free_call") {
      const dateObj = new Date(date + "T00:00:00");
      const dateFormatted = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: "Newtritious.life@gmail.com",
          from_name: "NewTritious Life Booking",
          subject: `New Free Call Booking: ${client_name} — ${dateFormatted} at ${time_slot}`,
          body: `New Free Call Booking Alert:\n\n${client_name} has scheduled a free 15-minute discovery call for ${dateFormatted} at ${time_slot}.\nEmail: ${client_email}\nPhone: ${client_phone}\nState: ${client_state}`,
        });
      } catch (err) {
        console.error("createBooking: admin notification email failed:", err);
      }

      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: client_email,
          from_name: "NewTritious Life",
          subject: `Confirmed: Your 15-Minute Discovery Call with NewTritious Life`,
          body: `Hi ${client_name},\n\nYour free 15-minute discovery call is officially booked! I'm looking forward to connecting with you, hearing about your goals, and seeing how we can best support your health journey.\n\nCall Details:\n• Date: ${dateFormatted}\n• Time: ${time_slot} EST\n• Where: Google Meet (Secure Video Link)\n\n👉 Join Video Call: meet.google.com/abc-defg-hij\n\nNeed to reschedule or cancel? Email Newtritious.life@gmail.com to adjust or cancel your appointment.\n\nWarmly,\nYael Laniado, RD\nNewTritious Life LLC`,
        });
      } catch (err) {
        console.error("createBooking: client confirmation email failed:", err);
      }
    }

    return Response.json({ success: true, appointmentId: created.id });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to create booking." },
      { status: 500 }
    );
  }
}
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { sendResendEmail } from "../../shared/resendEmail.ts";
import { freeCallClientEmail, freeCallAdminEmail } from "../../shared/emailTemplates.ts";

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
      language,
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

    const lang = language === "es" ? "es" : "en";

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
      language: lang,
    });

    // For free calls, send confirmation emails server-side (anonymous visitors
    // have no client-side permissions to send email, so this must run here).
    if (appointment_type === "free_call") {
      const adminMail = freeCallAdminEmail(
        String(client_name).trim(), date, time_slot,
        String(client_email).trim(), String(client_phone).trim(), String(client_state).trim(),
        lang
      );
      await sendResendEmail({
        to: "Newtritious.life@gmail.com",
        subject: adminMail.subject,
        text: adminMail.text,
      });

      const clientMail = freeCallClientEmail(String(client_name).trim(), date, time_slot, lang);
      await sendResendEmail({
        to: client_email,
        subject: clientMail.subject,
        text: clientMail.text,
      });
    }

    return Response.json({ success: true, appointmentId: created.id });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to create booking." },
      { status: 500 }
    );
  }
}
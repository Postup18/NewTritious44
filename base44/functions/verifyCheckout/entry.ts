import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from 'base44:runtime';
import { format, parseISO } from 'npm:date-fns@3.6.0';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { sessionId } = body || {};

    if (!sessionId) {
      return Response.json({ error: "Missing checkout session ID." }, { status: 400 });
    }

    const stripeKey = secrets.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("verifyCheckout: STRIPE_SECRET_KEY not set");
      return Response.json({ error: "Payment is not configured." }, { status: 500 });
    }

    const resp = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Stripe-Version": "2025-10-29.clover",
      },
    });

    const session = await resp.json();
    if (!resp.ok) {
      console.error("verifyCheckout Stripe retrieve error:", session);
      return Response.json(
        { error: session?.error?.message || "Failed to verify payment." },
        { status: 500 }
      );
    }

    if (session.payment_status !== "paid") {
      return Response.json({ paid: false, error: "Payment has not been completed." }, { status: 402 });
    }

    const appointmentId = session.metadata?.appointmentId;
    if (!appointmentId) {
      return Response.json({ error: "No appointment linked to this payment." }, { status: 400 });
    }

    const appointment = await base44.asServiceRole.entities.Appointment.get(appointmentId);
    if (!appointment) {
      return Response.json({ error: "Appointment not found." }, { status: 404 });
    }

    // Confirm only if still pending — idempotent on page reload
    if (appointment.status === "pending") {
      await base44.asServiceRole.entities.Appointment.update(appointmentId, { status: "confirmed" });

      let dateFormatted = appointment.date;
      try {
        dateFormatted = format(parseISO(appointment.date), "EEEE, MMMM d, yyyy");
      } catch {}

      // Send client confirmation email
      const clientBody = `Hi ${appointment.client_name},

Your payment has been received and your consultation is officially confirmed for ${dateFormatted} at ${appointment.time_slot}!

1. Your Intake Form
To help me prepare for our time together, please complete your health history intake form here:
https://nurture-flow-diet.base44.app/intake

2. Need to Change Your Time?
If you need to adjust or cancel your reservation, email: Newtritious.life@gmail.com
(Note: Cancellations or reschedules made less than 24 hours before your session are subject to a $75 fee).

What happens next?
You will receive a reminder email 24 hours before our meeting that will include your secure Google Meet video link.

If you have any questions, feel free to reply to this email. I look forward to working with you!

Warmly,
Yael Laniado, RD
NewTritious Life LLC`;

      base44.asServiceRole.integrations.Core.SendEmail({
        to: appointment.client_email,
        from_name: "NewTritious",
        subject: "Your Session is Confirmed! – Preparation Details & Links",
        body: clientBody,
      }).catch((err: any) => console.warn("Client confirmation email failed:", err));

      // Notify Yael of the confirmed booking
      base44.asServiceRole.integrations.Core.SendEmail({
        to: "Newtritious.life@gmail.com",
        from_name: "NewTritious Life Booking",
        subject: `New Booking: ${appointment.client_name} — ${dateFormatted} at ${appointment.time_slot}`,
        body: `New Booking Alert (Paid & Confirmed):\n\n${appointment.client_name} has scheduled a session for ${dateFormatted} at ${appointment.time_slot}.\nEmail: ${appointment.client_email}\nPhone: ${appointment.client_phone}\nState: ${appointment.client_state}`,
      }).catch((err: any) => console.warn("Admin email failed:", err));
    }

    return Response.json({
      paid: true,
      appointment: {
        id: appointmentId,
        date: appointment.date,
        time_slot: appointment.time_slot,
        client_name: appointment.client_name,
        client_email: appointment.client_email,
        client_phone: appointment.client_phone,
        client_state: appointment.client_state,
        status: "confirmed",
      },
    });
  } catch (error) {
    console.error("verifyCheckout error:", error);
    return Response.json(
      { error: error.message || "Failed to verify payment." },
      { status: 500 }
    );
  }
}
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from 'base44:runtime';
import { sendResendEmail } from "../../shared/resendEmail.ts";
import { paidSessionClientEmail, paidSessionAdminEmail } from "../../shared/emailTemplates.ts";

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
      return Response.json({ paid: false, error: "Payment has not been completed yet." }, { status: 200 });
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

      const lang = appointment.language === "es" ? "es" : "en";

      // Send client confirmation email
      const clientMail = paidSessionClientEmail(
        appointment.client_name, appointment.date, appointment.time_slot, lang
      );
      await sendResendEmail({
        to: appointment.client_email,
        subject: clientMail.subject,
        text: clientMail.text,
      });

      // Notify Yael of the confirmed booking
      const adminMail = paidSessionAdminEmail(
        appointment.client_name, appointment.date, appointment.time_slot,
        appointment.client_email, appointment.client_phone, appointment.client_state, lang
      );
      await sendResendEmail({
        to: "Newtritious.life@gmail.com",
        subject: adminMail.subject,
        text: adminMail.text,
      });
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
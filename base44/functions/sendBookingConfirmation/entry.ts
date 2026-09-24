import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { sendResendEmail } from "../../shared/resendEmail.ts";
import { manualSessionClientEmail } from "../../shared/emailTemplates.ts";

export default async function(req: Request): Promise<Response> {
  try {
    const requestBody = await req.json();
    const email = requestBody?.email;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Look up the most recent appointment for this email (service role to bypass RLS)
    const appointments = await base44.asServiceRole.entities.Appointment.filter(
      { client_email: email },
      "-created_date",
      1
    );

    if (!appointments || appointments.length === 0) {
      return Response.json({ message: "No appointment found for this email" }, { status: 200 });
    }

    const appt = appointments[0];

    // Only send the paid-session confirmation for full sessions, not free calls
    if (appt.appointment_type && appt.appointment_type !== "session") {
      return Response.json({ message: "Not a paid session, skipping confirmation" }, { status: 200 });
    }

    const lang = appt.language === "es" ? "es" : "en";
    const mail = manualSessionClientEmail(appt.client_name, appt.date, appt.time_slot, lang);

    await sendResendEmail({
      to: appt.client_email,
      subject: mail.subject,
      text: mail.text,
    });

    return Response.json({ success: true, message: "Confirmation email sent" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
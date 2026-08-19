import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

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

    // Format the date nicely
    const dateObj = new Date(appt.date + "T00:00:00");
    const dateFormatted = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const emailBody = `Hi ${appt.client_name},

Your consultation slot is reserved for ${dateFormatted} at ${appt.time_slot}!

1. Payment Instructions: Please complete your payment to finalize your booking:
  • Venmo: @NewTritious-Life
  • Zelle: ylaniado@hotmail.com (Please include your full name in the payment memo)

2. Your Intake Form
To help me prepare for our time together, please complete your health history intake form here: 🔗 https://nurture-flow-diet.base44.app/intake

3. Need to Change Your Time?
If you need to adjust or cancel your reservation, you can send us an email: Newtritious.life@gmail.com (Note: Cancellations or reschedules made less than 24 hours before your session are subject to a $75 fee).

What happens next?
Once your payment is processed, your session is officially confirmed! You will receive a separate reminder email 24 hours before our meeting that will include your secure Google Meet video link.

If you have any questions, feel free to reply to this email. I look forward to working with you!

Warmly,
Yael Laniado, RD
NewTritious Life LLC`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: appt.client_email,
      from_name: "NewTritious Life",
      subject: `Your nutrition session is confirmed — ${dateFormatted}`,
      body: emailBody,
    });

    return Response.json({ success: true, message: "Confirmation email sent" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { sendResendEmail } from "../../shared/resendEmail.ts";

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const {
      client_name,
      client_email,
      client_phone,
      client_state,
      primary_goal,
      past_approaches,
      dietary_preferences,
      medical_history,
      language,
    } = body || {};

    // Validate required fields
    const missing = [];
    if (!client_name || !String(client_name).trim()) missing.push("client_name");
    if (!client_email || !String(client_email).trim()) missing.push("client_email");
    if (!client_state || !String(client_state).trim()) missing.push("client_state");
    if (!primary_goal || !String(primary_goal).trim()) missing.push("primary_goal");
    if (missing.length > 0) {
      return Response.json(
        { error: "Missing required fields.", fields: missing },
        { status: 400 }
      );
    }

    const lang = language === "es" ? "es" : "en";

    // Save the intake submission (service role bypasses RLS for anonymous visitors)
    const created = await base44.asServiceRole.entities.IntakeSubmission.create({
      client_name: String(client_name).trim(),
      client_email: String(client_email).trim(),
      client_phone: String(client_phone || "").trim(),
      client_state: String(client_state).trim(),
      primary_goal: String(primary_goal).trim(),
      past_approaches: String(past_approaches || "").trim(),
      dietary_preferences: String(dietary_preferences || "").trim(),
      medical_history: String(medical_history || "").trim(),
      language: lang,
    });

    // Notify Yael about the new intake submission
    const subject = lang === "es"
      ? `Nuevo formulario de admisión — ${String(client_name).trim()}`
      : `New Intake Form Submission — ${String(client_name).trim()}`;

    const text = [
      `Name / Nombre: ${String(client_name).trim()}`,
      `Email: ${String(client_email).trim()}`,
      `Phone: ${String(client_phone || "").trim()}`,
      `State / Estado: ${String(client_state).trim()}`,
      ``,
      lang === "es" ? "Meta principal:" : "Primary goal:",
      String(primary_goal).trim(),
      ``,
      lang === "es" ? "Enfoques anteriores:" : "Past approaches:",
      String(past_approaches || "—").trim(),
      ``,
      lang === "es" ? "Preferencias dietéticas / Alergias:" : "Dietary preferences / Allergies:",
      String(dietary_preferences || "—").trim(),
      ``,
      lang === "es" ? "Historial médico / Medicamentos:" : "Medical history / Medications:",
      String(medical_history || "—").trim(),
    ].join("\n");

    await sendResendEmail({
      to: "Newtritious.life@gmail.com",
      subject,
      text,
    });

    return Response.json({ success: true, submissionId: created.id });
  } catch (error) {
    console.error("submitIntake error:", error);
    return Response.json(
      { error: error.message || "Failed to submit intake form." },
      { status: 500 }
    );
  }
}
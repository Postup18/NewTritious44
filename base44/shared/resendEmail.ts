import { secrets } from "base44:runtime";

const FROM_ADDRESS = "NewTritious Life <hello@newtritiouslife.com>";

export async function sendResendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const apiKey = secrets.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("sendResendEmail: RESEND_API_KEY not set");
    return false;
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to, subject, text }),
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      console.error("sendResendEmail error:", resp.status, errData);
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendResendEmail fetch failed:", err);
    return false;
  }
}
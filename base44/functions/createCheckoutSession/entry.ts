import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from 'base44:runtime';

// Server-side source of truth for package prices (in cents).
// The frontend only sends a packageId — the amount is never trusted from the client.
const PACKAGES: Record<string, { name: string; amount: number }> = {
  kickstart: { name: "Kickstart Consultation", amount: 17500 },
  habit_builder: { name: "90-Day Habit Builder", amount: 52500 },
  vip_deep_dive: { name: "VIP Deep Dive", amount: 95000 },
};

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { packageId, appointmentId, origin } = body || {};

    if (!packageId || !PACKAGES[packageId]) {
      return Response.json({ error: "Invalid package selected." }, { status: 400 });
    }
    if (!appointmentId) {
      return Response.json({ error: "Missing appointment reference." }, { status: 400 });
    }

    const stripeKey = secrets.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("createCheckoutSession: STRIPE_SECRET_KEY not set");
      return Response.json({ error: "Payment is not configured." }, { status: 500 });
    }

    const pkg = PACKAGES[packageId];
    const baseUrl = origin || "https://nurture-flow-diet.base44.app";
    const appId = secrets.get("BASE44_APP_ID") || "";

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("payment_method_configuration", "pmc_1UIYXEGcjxebiOVK0ZBEv41A");
    params.append("success_url", `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${baseUrl}/book-session?checkout=cancelled`);
    params.append("line_items[0][quantity]", "1");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][unit_amount]", String(pkg.amount));
    params.append("line_items[0][price_data][product_data][name]", pkg.name);
    params.append("metadata[appointmentId]", appointmentId);
    if (appId) params.append("metadata[base44_app_id]", appId);

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2025-10-29.clover",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: params,
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("createCheckoutSession Stripe error:", data);
      return Response.json(
        { error: data?.error?.message || "Failed to create checkout session." },
        { status: 500 }
      );
    }

    return Response.json({ url: data.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    return Response.json(
      { error: error.message || "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
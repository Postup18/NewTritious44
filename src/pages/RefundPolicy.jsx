import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-5 px-6 flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-heading text-lg font-semibold text-gray-900">NewTritious Life</span>
        </button>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">Refund Policy</h1>
        <p className="font-body text-sm text-muted-foreground mb-10">Last updated: May 2026</p>

        <div className="space-y-8 font-body text-foreground leading-relaxed">

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Session Cancellations</h2>
            <p className="text-muted-foreground">
              We understand that life happens. If you need to cancel or reschedule your session, we ask that you notify us at least <strong>48 hours in advance</strong>. Cancellations made with at least 48 hours notice will receive a full refund or the option to reschedule at no additional charge.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Late Cancellations</h2>
            <p className="text-muted-foreground">
              Cancellations made less than 48 hours before a scheduled session will not be eligible for a refund. You may, however, request to reschedule once without penalty, subject to availability.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">No-Shows</h2>
            <p className="text-muted-foreground">
              If you do not attend your scheduled session without prior notice, the session fee will be forfeited and no refund will be issued.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Packages and Programs</h2>
            <p className="text-muted-foreground">
              For multi-session packages, refunds will be issued on a pro-rated basis for any unused sessions, provided the cancellation request is made within 30 days of purchase. Sessions already completed are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Exceptional Circumstances</h2>
            <p className="text-muted-foreground">
              We review all refund requests on a case-by-case basis. If you are experiencing a medical emergency or extenuating circumstances, please contact us and we will do our best to accommodate you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">How to Request a Refund</h2>
            <p className="text-muted-foreground">
              To request a refund or reschedule, please email us at{" "}
              <a href="mailto:Newtritious.life@gmail.com" className="text-primary underline hover:opacity-80">
                Newtritious.life@gmail.com
              </a>{" "}
              with your name, session date, and reason for cancellation. We aim to respond within 2 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
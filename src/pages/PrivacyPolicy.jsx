import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">Privacy Policy</h1>
        <p className="font-body text-sm text-muted-foreground mb-10">Last updated: May 2026</p>

        <div className="space-y-8 font-body text-foreground leading-relaxed">

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Introduction</h2>
            <p className="text-muted-foreground">
              NewTritious Life ("we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or book a session with us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Personal identification information</strong> — name, email address, and phone number provided when booking a session.</li>
              <li><strong>Health information</strong> — health goals, dietary preferences, and other information you voluntarily share during consultations.</li>
              <li><strong>Usage data</strong> — information about how you interact with our website (e.g., pages visited, time spent).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Schedule and manage your appointments.</li>
              <li>Send you booking confirmations and reminders.</li>
              <li>Provide personalized nutrition services.</li>
              <li>Improve our website and services.</li>
              <li>Communicate important updates related to your care.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">How We Protect Your Information</h2>
            <p className="text-muted-foreground">
              We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely and is only accessible to authorized personnel involved in your care.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Sharing Your Information</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to provide services directly related to your care (e.g., appointment reminders sent via email).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Cookies</h2>
            <p className="text-muted-foreground">
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain features of the site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or request deletion of your personal information at any time. To exercise these rights, please contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:Newtritious.life@gmail.com" className="text-primary underline hover:opacity-80">
                Newtritious.life@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
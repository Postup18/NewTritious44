import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

export default function MedicalDisclaimer() {
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
        <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">Medical Disclaimer</h1>
        <p className="font-body text-sm text-muted-foreground mb-10">Last updated: May 2026</p>

        <div className="space-y-8 font-body text-foreground leading-relaxed">

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Not Medical Advice</h2>
            <p className="text-muted-foreground">
              The information provided on this website and through NewTritious Life's services is intended for general informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Registered Dietitian Services</h2>
            <p className="text-muted-foreground">
              Yael is a registered dietitian, not a medical doctor. Nutrition counseling and medical nutrition therapy provided through NewTritious Life are intended to complement, not replace, the care provided by your physician or other licensed healthcare professionals. Always consult your doctor before making significant changes to your diet, especially if you have a chronic health condition.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">No Doctor-Patient Relationship</h2>
            <p className="text-muted-foreground">
              Use of this website and/or booking a session with NewTritious Life does not create a doctor-patient relationship. The information shared during consultations is based on the information you provide and is not a clinical diagnosis.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Individual Results May Vary</h2>
            <p className="text-muted-foreground">
              Nutritional outcomes discussed on this site or during sessions are not guaranteed. Individual results will vary based on a number of factors including health status, adherence, lifestyle, and medical history.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Emergency Situations</h2>
            <p className="text-muted-foreground">
              If you are experiencing a medical emergency, please call 911 or your local emergency services immediately. Do not rely on information from this website or wait for a nutrition consultation in the event of a medical emergency.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this disclaimer, please reach out at{" "}
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
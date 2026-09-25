import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/lib/i18n";
import { ArrowLeft, Leaf, CheckCircle, ArrowRight, User, Heart, ClipboardList, Utensils, Stethoscope } from "lucide-react";

const STEPS = [
  { key: "info", icon: User },
  { key: "goal", icon: Heart },
  { key: "history", icon: ClipboardList },
  { key: "diet", icon: Utensils },
  { key: "medical", icon: Stethoscope },
];

export default function IntakeChat() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const tf = t.intakeForm;
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_state: "",
    primary_goal: "",
    past_approaches: "",
    dietary_preferences: "",
    medical_history: "",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canProceed = () => {
    if (step === 0) return form.client_name.trim() && form.client_email.trim() && form.client_state.trim();
    if (step === 1) return form.primary_goal.trim();
    return true; // steps 2-4 are optional
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await base44.functions.invoke("submitIntake", { ...form, language: lang });
      setDone(true);
    } catch (err) {
      console.error("Intake submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success screen ───────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fafaf8" }}>
        <HeaderBar navigate={navigate} tf={tf} />
        <div className="flex items-center justify-center flex-1 px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "#f0f5ec" }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: "#87a96b" }} />
            </motion.div>
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-3">{tf.successTitle}</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">{tf.successMsg}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#87a96b" }}
            >
              {tf.returnHome}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fafaf8" }}>
      <HeaderBar navigate={navigate} tf={tf} />

      {/* Title */}
      <div className="text-center py-8 px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-gray-900 mb-2">{tf.title}</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">{tf.subtitle}</p>
      </div>

      {/* Progress steps */}
      <div className="max-w-2xl mx-auto w-full px-4 mb-6">
        <div className="flex items-center justify-between gap-1">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const completed = i < step;
            return (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: completed ? "#87a96b" : active ? "#f0f5ec" : "#f5f5f4",
                      border: active ? "2px solid #87a96b" : "2px solid transparent",
                    }}
                  >
                    {completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Icon className="w-4 h-4" style={{ color: active ? "#87a96b" : "#c4c4c2" }} />
                    )}
                  </div>
                  <span className="text-[10px] font-medium hidden sm:block" style={{ color: active ? "#87a96b" : "#c4c4c2" }}>
                    {tf[`${s.key === "info" ? "step1" : s.key === "goal" ? "step2" : s.key === "history" ? "step3" : s.key === "diet" ? "step4" : "step5"}Label`]}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-1 rounded-full" style={{ backgroundColor: completed ? "#87a96b" : "#e5e7eb" }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-32 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >
            {step === 0 && (
              <div className="space-y-5">
                <Field label={tf.fullName} required>
                  <input
                    type="text"
                    value={form.client_name}
                    onChange={(e) => setField("client_name", e.target.value)}
                    placeholder={tf.fullNamePh}
                    className={inputCls}
                    onFocus={focusGreen}
                    onBlur={blurDefault}
                  />
                </Field>
                <Field label={tf.email} required>
                  <input
                    type="email"
                    value={form.client_email}
                    onChange={(e) => setField("client_email", e.target.value)}
                    placeholder={tf.emailPh}
                    className={inputCls}
                    onFocus={focusGreen}
                    onBlur={blurDefault}
                  />
                </Field>
                <Field label={tf.phone}>
                  <input
                    type="tel"
                    value={form.client_phone}
                    onChange={(e) => setField("client_phone", e.target.value)}
                    placeholder={tf.phonePh}
                    className={inputCls}
                    onFocus={focusGreen}
                    onBlur={blurDefault}
                  />
                </Field>
                <Field label={tf.state} required>
                  <input
                    type="text"
                    value={form.client_state}
                    onChange={(e) => setField("client_state", e.target.value)}
                    placeholder={tf.statePh}
                    className={inputCls}
                    onFocus={focusGreen}
                    onBlur={blurDefault}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <Field label={tf.primaryGoal} required>
                <textarea
                  rows={5}
                  value={form.primary_goal}
                  onChange={(e) => setField("primary_goal", e.target.value)}
                  placeholder={tf.primaryGoalPh}
                  className={`${inputCls} resize-none`}
                  onFocus={focusGreen}
                  onBlur={blurDefault}
                />
              </Field>
            )}

            {step === 2 && (
              <Field label={tf.pastApproaches}>
                <textarea
                  rows={6}
                  value={form.past_approaches}
                  onChange={(e) => setField("past_approaches", e.target.value)}
                  placeholder={tf.pastApproachesPh}
                  className={`${inputCls} resize-none`}
                  onFocus={focusGreen}
                  onBlur={blurDefault}
                />
              </Field>
            )}

            {step === 3 && (
              <Field label={tf.dietary}>
                <textarea
                  rows={6}
                  value={form.dietary_preferences}
                  onChange={(e) => setField("dietary_preferences", e.target.value)}
                  placeholder={tf.dietaryPh}
                  className={`${inputCls} resize-none`}
                  onFocus={focusGreen}
                  onBlur={blurDefault}
                />
              </Field>
            )}

            {step === 4 && (
              <Field label={tf.medical}>
                <textarea
                  rows={6}
                  value={form.medical_history}
                  onChange={(e) => setField("medical_history", e.target.value)}
                  placeholder={tf.medicalPh}
                  className={`${inputCls} resize-none`}
                  onFocus={focusGreen}
                  onBlur={blurDefault}
                />
              </Field>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop nav buttons */}
      <div className="hidden md:flex max-w-2xl mx-auto w-full px-4 pb-8 gap-3">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {tf.backBtn}
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed() || submitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-opacity"
          style={{ backgroundColor: canProceed() && !submitting ? "#87a96b" : "#c5d9b8" }}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {tf.submitting}
            </>
          ) : step === STEPS.length - 1 ? (
            tf.submit
          ) : (
            <>
              {tf.next} <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3" style={{ zIndex: 50 }}>
        {step > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-4 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed() || submitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-opacity"
          style={{ backgroundColor: canProceed() && !submitting ? "#87a96b" : "#c5d9b8" }}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {tf.submitting}
            </>
          ) : step === STEPS.length - 1 ? (
            tf.submit
          ) : (
            <>
              {tf.next} <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Shared bits ─────────────────────────────────────────────────────────────
function HeaderBar({ navigate, tf }) {
  return (
    <div className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {tf.back}
      </button>
      <div className="flex items-center gap-2">
        <Leaf className="w-5 h-5" style={{ color: "#87a96b" }} />
        <span className="font-heading text-lg font-semibold text-gray-900">{tf.brand}</span>
      </div>
      <div className="w-16" />
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span style={{ color: "#87a96b" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white";

const focusGreen = (e) => (e.target.style.borderColor = "#87a96b");
const blurDefault = (e) => (e.target.style.borderColor = "#e5e7eb");
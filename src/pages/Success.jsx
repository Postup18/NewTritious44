import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Leaf,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  ClipboardList,
  Home,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { base44 } from "@/api/base44Client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

export default function Success() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem("pendingCheckout");
    let cancelled = false;

    const verify = async (attempt = 0) => {
      if (!sessionId) {
        setError("No checkout session was found.");
        setLoading(false);
        return;
      }
      try {
        const response = await base44.functions.invoke("verifyCheckout", { sessionId });
        if (cancelled) return;
        if (response.data?.paid && response.data?.appointment) {
          setAppointment(response.data.appointment);
          setLoading(false);
        } else if (attempt < 4) {
          // Stripe may not have marked the session as paid yet — retry
          setTimeout(() => verify(attempt + 1), 1500);
        } else {
          setError(response.data?.error || "Your payment could not be verified. Please contact us if you were charged.");
          setLoading(false);
        }
      } catch (err) {
        if (cancelled) return;
        if (attempt < 4) {
          setTimeout(() => verify(attempt + 1), 1500);
        } else {
          setError(err?.response?.data?.error || "Failed to verify your payment. Please contact us if you were charged.");
          setLoading(false);
        }
      }
    };

    verify();
    return () => { cancelled = true; };
  }, [sessionId]);

  let dateFormatted = "";
  if (appointment?.date) {
    try { dateFormatted = format(parseISO(appointment.date), "EEEE, MMMM d, yyyy"); } catch {}
  }

  const Header = () => (
    <div className="bg-white border-b border-gray-100 py-5 px-6 flex items-center justify-between max-w-5xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> {t.success.back}
      </button>
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <Leaf className="w-5 h-5" style={{ color: "#87a96b" }} />
        <span className="font-heading text-lg font-semibold text-gray-900">{t.success.brand}</span>
      </button>
      <div className="w-16" />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f7f9f6" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#87a96b] rounded-full animate-spin" />
          <p className="text-sm text-gray-500">{t.success.confirming}</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f7f9f6" }}>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 mb-4" style={{ color: "#b5654a" }} />
          <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-2">{t.success.errorTitle}</h1>
          <p className="text-gray-500 text-sm mb-6">{error || t.success.errorDefault}</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "#87a96b" }}
          >
            <Home className="w-4 h-4" /> {t.success.returnHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f9f6" }}>
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-28 md:pb-10">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-10 text-center mb-8"
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
          <h1 className="font-heading text-3xl font-semibold text-gray-900 mb-2">{t.success.title}</h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            {t.success.welcome.replace("{name}", appointment.client_name?.split(" ")[0] || "")}
          </p>
        </motion.div>

        {/* Appointment summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" style={{ color: "#87a96b" }} />
            {t.success.appointmentDetails}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.date}</span>
              <span className="text-sm font-medium text-gray-800">{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.time}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.time_slot}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.name}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.email}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.phone}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.success.state}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_state}</span>
            </div>
          </div>
        </motion.div>

        {/* Intake form CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-5 h-5" style={{ color: "#87a96b" }} />
            <h2 className="font-heading text-lg font-semibold text-gray-900">{t.success.intakeTitle}</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {t.success.intakeDesc}
          </p>
          <button
            onClick={() => navigate("/intake")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#87a96b" }}
          >
            {t.success.startIntake} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: "#f0f5ec" }}
        >
          <h3 className="font-heading text-base font-semibold mb-2" style={{ color: "#5a7a47" }}>{t.success.whatsNext}</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5a7a47" }}>
            {t.success.whatsNextDesc}
          </p>
        </motion.div>

        {/* Desktop return home */}
        <div className="hidden md:block text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" /> {t.success.returnHome}
          </button>
        </div>

        <p className="hidden md:block text-center text-xs text-gray-400 mt-6">
          {t.success.changeTime} <span className="font-medium text-gray-500">Newtritious.life@gmail.com</span>. {t.success.cancellationFee}
        </p>
      </div>

      {/* Mobile fixed bottom action bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3" style={{ zIndex: 50 }}>
        <button
          onClick={() => navigate("/")}
          className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600"
        >
          {t.success.home}
        </button>
        <button
          onClick={() => navigate("/intake")}
          className="flex-[1.5] py-3 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "#87a96b" }}
        >
          {t.success.completeIntake}
        </button>
      </div>
    </div>
  );
}
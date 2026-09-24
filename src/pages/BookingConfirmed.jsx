import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CreditCard, ClipboardList, ArrowRight, Leaf, ArrowLeft, User, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

export default function BookingConfirmed() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mark that we've shown the confirmation page, so Home won't keep redirecting back here
    sessionStorage.setItem("seen_booking_confirmed", "true");
    let cancelled = false;
    (async () => {
      try {
        const user = await base44.auth.me();
        if (!user?.email) { setLoading(false); return; }
        const appts = await base44.entities.Appointment.filter({
          client_email: user.email,
          status: "pending",
          appointment_type: "session",
        }, "-created_date", 1);
        if (!cancelled) setAppointment(appts[0] || null);
      } catch {
        // not logged in — silently skip
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  let dateFormatted = "";
  if (appointment?.date) {
    try { dateFormatted = format(parseISO(appointment.date), "EEEE, MMMM d, yyyy"); } catch {}
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fafaf8" }}>
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#87a96b] rounded-full animate-spin" />
      </div>
    );
  }

  // Header bar
  const Header = () => (
    <div className="bg-white border-b border-gray-100 py-5 px-6 flex items-center justify-between max-w-5xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> {t.bookingConfirmed.back}
      </button>
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <Leaf className="w-5 h-5" style={{ color: "#87a96b" }} />
        <span className="font-heading text-lg font-semibold text-gray-900">{t.bookingConfirmed.brand}</span>
      </button>
      <div className="w-16" />
    </div>
  );

  // No appointment found
  if (!appointment) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-2">{t.bookingConfirmed.noBooking}</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">{t.bookingConfirmed.noBookingDesc}</p>
          <button onClick={() => navigate("/book-session")} className="px-6 py-3 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "#87a96b" }}>
            {t.bookingConfirmed.bookSession}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
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
          <h1 className="font-heading text-3xl font-semibold text-gray-900 mb-2">{t.bookingConfirmed.title}</h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            {t.bookingConfirmed.welcome.replace("{name}", appointment.client_name?.split(" ")[0] || "")}
          </p>
        </motion.div>

        {/* Appointment details card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8"
        >
          <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" style={{ color: "#87a96b" }} />
            {t.bookingConfirmed.appointmentDetails}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.date}</span>
              <span className="text-sm font-medium text-gray-800">{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.time}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.time_slot}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.name}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.email}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.phone}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500 w-24">{t.bookingConfirmed.state}</span>
              <span className="text-sm font-medium text-gray-800">{appointment.client_state}</span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: "#87a96b" }}>
              1
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" style={{ color: "#87a96b" }} />
              <h2 className="font-heading text-lg font-semibold text-gray-900">{t.bookingConfirmed.step1Title}</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{t.bookingConfirmed.step1Desc}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ backgroundColor: "#f7faf4" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#87a96b" }}>{t.bookingConfirmed.venmo}</p>
              <p className="text-sm font-medium text-gray-800">@NewTritious-Life</p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: "#f7faf4" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#87a96b" }}>{t.bookingConfirmed.zelle}</p>
              <p className="text-sm font-medium text-gray-800">ylaniado@hotmail.com</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">{t.bookingConfirmed.paymentMemo}</p>
        </motion.div>

        {/* Step 2: Intake Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: "#87a96b" }}>
              2
            </div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" style={{ color: "#87a96b" }} />
              <h2 className="font-heading text-lg font-semibold text-gray-900">{t.bookingConfirmed.step2Title}</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t.bookingConfirmed.step2Desc}
          </p>
          <button
            onClick={() => navigate("/intake")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#87a96b" }}
          >
            {t.bookingConfirmed.startIntake} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#f0f5ec" }}
        >
          <h3 className="font-heading text-base font-semibold mb-2" style={{ color: "#5a7a47" }}>{t.bookingConfirmed.whatsNext}</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5a7a47" }}>
            {t.bookingConfirmed.whatsNextDesc}
          </p>
        </motion.div>

        {/* Need to change */}
        <p className="text-center text-xs text-gray-400">
          {t.bookingConfirmed.changeTime} <span className="font-medium text-gray-500">Newtritious.life@gmail.com</span>. {t.bookingConfirmed.cancellationFee}
        </p>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CheckCircle, Leaf, ArrowLeft, User, Mail, Phone, MapPin, Lock, CreditCard, Wallet } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { base44 } from "@/api/base44Client";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
];

const AVAILABLE_SLOTS = ["8:00 AM", "4:00 PM", "5:00 PM", "6:00 PM"];

const isUnavailableDay = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// ─── Step 1: Selection ───────────────────────────────────────────────────────
function SelectionStep({ onConfirm, t, bookingError, onDismissError, pendingRetry, onRetryCheckout, onDismissRetry }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [form, setForm] = useState({ client_name: "", client_email: "", client_phone: "", client_state: "" });
  const [selectedPackage, setSelectedPackage] = useState("kickstart");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleDateSelect = async (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setSlotsError(false);
    setLoadingSlots(true);
    const dateStr = format(date, "yyyy-MM-dd");
    try {
      const response = await base44.functions.invoke("getAvailableSlots", { date: dateStr });
      setBookedSlots(response.data.bookedSlots || []);
    } catch (err) {
      console.warn("Failed to load availability:", err);
      setSlotsError(true);
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const canSubmit =
    selectedDate && selectedSlot && form.client_name.trim() && form.client_email.trim() && form.client_phone.trim() && form.client_state.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onConfirm({ selectedDate, selectedSlot, form, selectedPackage, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Booking error banner */}
      <AnimatePresence>
        {bookingError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8 rounded-xl px-5 py-4 flex items-start justify-between gap-3"
            style={{ backgroundColor: "#fdf2f0", color: "#b5654a" }}
          >
            <p className="text-sm font-medium leading-relaxed">{bookingError}</p>
            <button
              type="button"
              onClick={onDismissError}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment incomplete notice (returning from cancelled Stripe checkout) */}
      <AnimatePresence>
        {pendingRetry && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8 rounded-xl px-5 py-4 flex items-start justify-between gap-3"
            style={{ backgroundColor: "#fef9e7", color: "#8a6d1f" }}
          >
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed mb-3">Payment incomplete — your selected time slot is still held. Complete checkout to confirm your booking.</p>
              <button
                type="button"
                onClick={onRetryCheckout}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#87a96b" }}
              >
                Complete Checkout
              </button>
            </div>
            <button
              type="button"
              onClick={onDismissRetry}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Package Selection */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-4 h-4" style={{ color: "#87a96b" }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#87a96b" }}>
            {t.bookSession.choosePackage}
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {t.bookSession.packages.map((pkg) => {
            const active = selectedPackage === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-200 bg-white ${active ? "shadow-md" : "border-gray-200 hover:border-gray-300"}`}
                style={active ? { borderColor: "#87a96b" } : {}}
              >
                {pkg.badge && (
                  <span
                    className="absolute -top-2.5 left-5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#87a96b" }}
                  >
                    {pkg.badge}
                  </span>
                )}
                {active && (
                  <span
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#87a96b" }}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </span>
                )}
                <h3 className="font-heading text-base font-semibold text-gray-900 mb-1 pr-6">
                  {pkg.name}
                </h3>
                <p className="font-heading text-2xl font-semibold mb-2" style={{ color: "#87a96b" }}>
                  {pkg.price}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{pkg.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left: Calendar + Time Slots */}
        <div className="space-y-8">
          {/* Calendar */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-4 h-4" style={{ color: "#87a96b" }} />
              <h2 className="font-heading text-base font-semibold text-foreground tracking-wide uppercase text-xs" style={{ color: "#87a96b", letterSpacing: "0.12em" }}>
                {t.bookSession.selectDate}
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  isBefore(date, startOfDay(new Date())) || isUnavailableDay(date)
                }
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Time Slots */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4" style={{ color: "#87a96b" }} />
                  <h2 className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: "#87a96b" }}>
                    {t.bookSession.availableTimes} · {format(selectedDate, "EEEE, MMMM d")}
                  </h2>
                </div>
                {loadingSlots ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#87a96b", borderTopColor: "transparent" }} />
                  </div>
                ) : slotsError ? (
                  <div className="rounded-xl px-4 py-6 text-center text-sm" style={{ backgroundColor: "#fdf2f0", color: "#b5654a" }}>
                    We couldn't load available times right now. Please try again or refresh the page.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const unavailable = bookedSlots.includes(slot) || !AVAILABLE_SLOTS.includes(slot);
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={unavailable}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all duration-200
                            ${unavailable
                              ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                              : active
                                ? "text-white border-transparent shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:border-opacity-80"
                            }`}
                          style={active ? { backgroundColor: "#87a96b", borderColor: "#87a96b" } : !unavailable ? { borderColor: "#e5e7eb" } : {}}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Details Form */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4" style={{ color: "#87a96b" }} />
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#87a96b" }}>
              {t.bookSession.yourDetails}
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

            {/* Appointment summary pill */}
            <AnimatePresence>
              {selectedDate && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ backgroundColor: "#f0f5ec", color: "#5a7a47" }}
                >
                  📅 {format(selectedDate, "MMMM d, yyyy")} · {selectedSlot}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                {t.bookSession.fullName} <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder={t.bookSession.fullNamePh}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                {t.bookSession.email} <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="email"
                required
                value={form.client_email}
                onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                placeholder={t.bookSession.emailPh}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                {t.bookSession.telephone} <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="tel"
                required
                value={form.client_phone}
                onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                placeholder={t.bookSession.telephonePh}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                {t.bookSession.state} <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.client_state}
                onChange={(e) => setForm({ ...form, client_state: e.target.value })}
                placeholder={t.bookSession.statePh}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Payment method selector */}
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-2.5 rounded-xl p-3.5 border-2 transition-all duration-200 text-left ${paymentMethod === "card" ? "shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                  style={paymentMethod === "card" ? { borderColor: "#87a96b", backgroundColor: "#f0f5ec" } : { backgroundColor: "#fafaf8" }}
                >
                  <CreditCard className="w-5 h-5 flex-shrink-0" style={{ color: "#87a96b" }} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Card</p>
                    <p className="text-[11px] text-gray-400">Visa, MC, Amex</p>
                  </div>
                  {paymentMethod === "card" && (
                    <CheckCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: "#87a96b" }} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("venmo")}
                  className={`flex items-center gap-2.5 rounded-xl p-3.5 border-2 transition-all duration-200 text-left ${paymentMethod === "venmo" ? "shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                  style={paymentMethod === "venmo" ? { borderColor: "#87a96b", backgroundColor: "#f0f5ec" } : { backgroundColor: "#fafaf8" }}
                >
                  <Wallet className="w-5 h-5 flex-shrink-0" style={{ color: "#87a96b" }} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Venmo</p>
                    <p className="text-[11px] text-gray-400">@NewTritious-Life</p>
                  </div>
                  {paymentMethod === "venmo" && (
                    <CheckCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: "#87a96b" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Secure checkout notice */}
            <div className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-xs leading-relaxed" style={{ backgroundColor: "#f0f5ec", color: "#5a7a47" }}>
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Secure checkout via {paymentMethod === "card" ? "Stripe" : "Venmo (@NewTritious-Life)"} — your payment is processed safely after you request your booking.</span>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                backgroundColor: canSubmit ? "#87a96b" : "#c5d9b8",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              <Lock className="w-3.5 h-3.5" />
              {t.bookSession.requestBooking}
            </button>

            {!selectedDate && (
              <p className="text-center text-xs text-gray-400">{t.bookSession.selectFirst}</p>
            )}
          </div>
        </div>

      </div>
    </form>
  );
}

// ─── Step 2: Processing ───────────────────────────────────────────────────────
function ProcessingStep({ t }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-t-transparent"
        style={{ borderColor: "#87a96b", borderTopColor: "transparent" }}
      />
      <p className="text-gray-500 text-sm font-medium">Redirecting to secure checkout…</p>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────
function ConfirmationStep({ selectedDate, selectedSlot, form, selectedPackage, onReset, t }) {
  const navigate = useNavigate();
  const pkg = t.bookSession.packages.find((p) => p.id === selectedPackage) || t.bookSession.packages[0];
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 max-w-md w-full text-center"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#f0f5ec" }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: "#87a96b" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-2">{t.bookSession.allSet}</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            {t.bookSession.confirmationEmail}{" "}
            <strong>{form.client_email}</strong>. {t.bookSession.checkInbox}
          </p>

          {/* Summary card */}
          <div className="rounded-2xl p-5 text-left space-y-3 mb-8" style={{ backgroundColor: "#f7faf4" }}>
            <div className="flex items-center gap-3">
              <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm font-medium text-gray-800">
                {pkg.name} · {pkg.price}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm font-medium text-gray-800">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm font-medium text-gray-800">{selectedSlot}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm text-gray-700">{form.client_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm text-gray-700">{form.client_email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm text-gray-700">{form.client_phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#87a96b" }} />
              <span className="text-sm text-gray-700">{form.client_state}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            {t.bookSession.confirmationEmail} <strong>{form.client_email}</strong>
          </p>

          {/* Intake form CTA */}
          <div className="rounded-2xl p-4 mb-6" style={{ backgroundColor: "#f0f5ec" }}>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              {t.bookSession.intakeCta}
            </p>
            <button
              onClick={() => navigate("/intake")}
              className="w-full py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#87a96b" }}
            >
              {t.bookSession.startIntake}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {t.bookSession.returnHome}
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#87a96b" }}
            >
              {t.bookSession.bookAnother}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Step: Venmo Instructions ──────────────────────────────────────────────────
function VenmoInstructionsStep({ selectedDate, selectedSlot, form, selectedPackage, t }) {
  const navigate = useNavigate();
  const pkg = t.bookSession.packages.find((p) => p.id === selectedPackage) || t.bookSession.packages[0];
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
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
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#f0f5ec" }}
        >
          <Wallet className="w-10 h-10" style={{ color: "#87a96b" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-2">Complete Your Venmo Payment</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Your session is reserved! Send your payment via Venmo to confirm your booking.
          </p>

          {/* Venmo details */}
          <div className="rounded-2xl p-5 text-left space-y-4 mb-8" style={{ backgroundColor: "#f7faf4" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Venmo Handle</span>
              <span className="text-sm font-bold text-gray-900 select-all">@NewTritious-Life</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-bold text-gray-900">{pkg.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Package</span>
              <span className="text-sm font-medium text-gray-800">{pkg.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-medium text-gray-800">{format(selectedDate, "EEEE, MMMM d")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-medium text-gray-800">{selectedSlot}</span>
            </div>
          </div>

          <div className="rounded-xl p-4 mb-6 text-left" style={{ backgroundColor: "#f0f5ec" }}>
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Instructions:</strong> Open Venmo, send {pkg.price} to <strong>@NewTritious-Life</strong>, and include your name and session date in the note. Once your payment is received, you'll get a confirmation email with your secure Google Meet link.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {t.bookSession.returnHome}
            </button>
            <a
              href="https://venmo.com/NewTritious-Life"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#87a96b" }}
            >
              <Wallet className="w-4 h-4" />
              Open Venmo
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookSession() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [step, setStep] = useState("selection"); // selection | processing
  const [booking, setBooking] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [pendingRetry, setPendingRetry] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "cancelled") {
      const stored = sessionStorage.getItem("pendingCheckout");
      if (stored) {
        try { setPendingRetry(JSON.parse(stored)); } catch {}
      }
    }
  }, []);

  const handleRetryCheckout = async () => {
    if (!pendingRetry) return;
    if (window.self !== window.top) {
      setBookingError("Checkout works only from the published app. Please open the app in a new tab.");
      return;
    }
    setStep("processing");
    try {
      const checkoutResponse = await base44.functions.invoke("createCheckoutSession", {
        packageId: pendingRetry.packageId,
        appointmentId: pendingRetry.appointmentId,
        origin: window.location.origin,
      });
      const url = checkoutResponse.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        setBookingError("Couldn't restart checkout. Please try booking again.");
        setStep("selection");
      }
    } catch (err) {
      setBookingError("Couldn't restart checkout. Please try booking again.");
      setStep("selection");
    }
  };

  const handleConfirm = async ({ selectedDate, selectedSlot, form, selectedPackage, paymentMethod }) => {
    // Block checkout inside the builder iframe preview
    if (window.self !== window.top) {
      setBookingError("Checkout works only from the published app. Please open the app in a new tab to complete your booking.");
      return;
    }

    setBooking({ selectedDate, selectedSlot, form, selectedPackage });
    setBookingError(null);
    setStep("processing");

    // Step 1: Create the pending appointment through the secure backend function
    let appointmentId;
    try {
      const response = await base44.functions.invoke("createBooking", {
        date: format(selectedDate, "yyyy-MM-dd"),
        time_slot: selectedSlot,
        client_name: form.client_name,
        client_email: form.client_email,
        client_phone: form.client_phone,
        client_state: form.client_state,
        appointment_type: "session",
        status: "pending",
        language: lang,
      });
      if (response.data?.success) {
        appointmentId = response.data.appointmentId;
      } else if (response.status === 409) {
        setBookingError("The time you selected was just booked by someone else. Please choose another time.");
        setStep("selection");
        return;
      } else {
        setBookingError(response.data?.error || "We couldn't complete your booking right now. Please try again.");
        setStep("selection");
        return;
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        setBookingError("The time you selected was just booked by someone else. Please choose another time.");
      } else {
        setBookingError("We couldn't complete your booking right now. Please try again.");
      }
      setStep("selection");
      return;
    }

    // Venmo path: skip Stripe, show Venmo instructions instead
    if (paymentMethod === "venmo") {
      setBooking({ selectedDate, selectedSlot, form, selectedPackage, paymentMethod });
      setStep("venmo_instructions");
      return;
    }

    // Store pending checkout so we can retry if the client abandons payment
    sessionStorage.setItem("pendingCheckout", JSON.stringify({ appointmentId, packageId: selectedPackage }));

    // Step 2: Create the Stripe checkout session and redirect
    try {
      const checkoutResponse = await base44.functions.invoke("createCheckoutSession", {
        packageId: selectedPackage,
        appointmentId,
        origin: window.location.origin,
      });
      const url = checkoutResponse.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        setBookingError(checkoutResponse.data?.error || "Couldn't start secure checkout. Please try again.");
        setStep("selection");
      }
    } catch (err) {
      console.warn("Checkout session failed:", err);
      setBookingError("Couldn't start secure checkout. Please try again.");
      setStep("selection");
    }
  };

  const handleReset = () => {
    setStep("selection");
    setBooking(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-5 px-6 flex items-center justify-between max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.bookSession.back}
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <Leaf className="w-5 h-5" style={{ color: "#87a96b" }} />
          <span className="font-heading text-lg font-semibold text-gray-900">{t.bookSession.brand}</span>
        </button>
        <div className="w-16" /> {/* spacer */}
      </div>

      {/* Page title — only shown on selection step */}
      {step === "selection" && (
        <div className="text-center py-12 px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#87a96b" }}>
            {t.bookSession.scheduleOnline}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-gray-900">
            {t.bookSession.title}
          </h1>
          <p className="text-gray-500 mt-3 text-sm max-w-sm mx-auto">
            {t.bookSession.subtitle}
          </p>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === "selection" && (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SelectionStep
              onConfirm={handleConfirm}
              t={t}
              bookingError={bookingError}
              onDismissError={() => setBookingError(null)}
              pendingRetry={pendingRetry}
              onRetryCheckout={handleRetryCheckout}
              onDismissRetry={() => setPendingRetry(null)}
            />
          </motion.div>
        )}
        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProcessingStep t={t} />
          </motion.div>
        )}
        {step === "venmo_instructions" && booking && (
          <motion.div key="venmo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VenmoInstructionsStep
              selectedDate={booking.selectedDate}
              selectedSlot={booking.selectedSlot}
              form={booking.form}
              selectedPackage={booking.selectedPackage}
              t={t}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
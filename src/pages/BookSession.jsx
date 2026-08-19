import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CheckCircle, Leaf, ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";
import { format, isBefore, startOfDay, isSameDay } from "date-fns";
import { base44 } from "@/api/base44Client";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

const isUnavailableDay = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// ─── Step 1: Selection ───────────────────────────────────────────────────────
function SelectionStep({ onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ client_name: "", client_email: "", client_phone: "", client_state: "" });

  const handleDateSelect = async (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setLoadingSlots(true);
    const dateStr = format(date, "yyyy-MM-dd");
    const existing = await base44.entities.Appointment.filter({ date: dateStr });
    setBookedSlots(existing.map((a) => a.time_slot));
    setLoadingSlots(false);
  };

  const canSubmit =
    selectedDate && selectedSlot && form.client_name.trim() && form.client_email.trim() && form.client_phone.trim() && form.client_state.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onConfirm({ selectedDate, selectedSlot, form });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left: Calendar + Time Slots */}
        <div className="space-y-8">
          {/* Calendar */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-4 h-4" style={{ color: "#87a96b" }} />
              <h2 className="font-heading text-base font-semibold text-foreground tracking-wide uppercase text-xs" style={{ color: "#87a96b", letterSpacing: "0.12em" }}>
                Select a Date
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
                    Available Times · {format(selectedDate, "EEEE, MMMM d")}
                  </h2>
                </div>
                {loadingSlots ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#87a96b", borderTopColor: "transparent" }} />
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const booked = bookedSlots.includes(slot);
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={booked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all duration-200
                            ${booked
                              ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                              : active
                                ? "text-white border-transparent shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:border-opacity-80"
                            }`}
                          style={active ? { backgroundColor: "#87a96b", borderColor: "#87a96b" } : !booked ? { borderColor: "#e5e7eb" } : {}}
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
              Your Details
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
                Full Name <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                style={{ focusBorderColor: "#87a96b" }}
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                Email Address <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="email"
                required
                value={form.client_email}
                onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                Telephone <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="tel"
                required
                value={form.client_phone}
                onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-medium">
                State <span style={{ color: "#87a96b" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.client_state}
                onChange={(e) => setForm({ ...form, client_state: e.target.value })}
                placeholder="e.g. FL"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                backgroundColor: canSubmit ? "#87a96b" : "#c5d9b8",
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              Confirm Booking →
            </button>

            {!selectedDate && (
              <p className="text-center text-xs text-gray-400">Please select a date and time first</p>
            )}
          </div>
        </div>

      </div>
    </form>
  );
}

// ─── Step 2: Processing ───────────────────────────────────────────────────────
function ProcessingStep() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-t-transparent"
        style={{ borderColor: "#87a96b", borderTopColor: "transparent" }}
      />
      <p className="text-gray-500 text-sm font-medium">Confirming your session…</p>
    </div>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────
function ConfirmationStep({ selectedDate, selectedSlot, form, onReset }) {
  const navigate = useNavigate();
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
          <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-2">You're all set!</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Your nutrition session is confirmed. We'll see you soon!
          </p>

          {/* Summary card */}
          <div className="rounded-2xl p-5 text-left space-y-3 mb-8" style={{ backgroundColor: "#f7faf4" }}>
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

          <p className="text-xs text-gray-400 mb-6">
            A confirmation will be sent to <strong>{form.client_email}</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Return Home
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#87a96b" }}
            >
              Book Another
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookSession() {
  const navigate = useNavigate();
  const [step, setStep] = useState("selection"); // selection | processing | confirmation
  const [booking, setBooking] = useState(null);

  const handleConfirm = async ({ selectedDate, selectedSlot, form }) => {
    setBooking({ selectedDate, selectedSlot, form });
    setStep("processing");

    // Save appointment
    await base44.entities.Appointment.create({
      date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedSlot,
      client_name: form.client_name,
      client_email: form.client_email,
      client_phone: form.client_phone,
      client_state: form.client_state,
      appointment_type: "session",
      status: "pending",
    });

    const dateFormatted = format(selectedDate, "EEEE, MMMM d, yyyy");

    // Invite the client so they can access the app later (optional, not required for email)
    base44.users.inviteUser(form.client_email, "user").catch(() => {});

    // Notify Yael of the new booking (sent server-side via backend function)
    base44.integrations.Core.SendEmail({
      to: "Newtritious.life@gmail.com",
      from_name: "NewTritious Life Booking",
      subject: `New Booking: ${form.client_name} — ${dateFormatted} at ${selectedSlot}`,
      body: `New Booking Alert:\n\n${form.client_name} has scheduled a session for ${dateFormatted} at ${selectedSlot}.\nEmail: ${form.client_email}\nPhone: ${form.client_phone}\nState: ${form.client_state}`,
    }).catch((err) => console.warn("Admin email failed:", err));

    // Send the full confirmation email to the customer immediately (server-side, no registration needed)
    base44.functions.sendBookingConfirmation({ email: form.client_email }).catch((err) =>
      console.warn("Confirmation email failed:", err)
    );

    // 1.5s processing state
    await new Promise((r) => setTimeout(r, 1500));
    setStep("confirmation");
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
          Back
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <Leaf className="w-5 h-5" style={{ color: "#87a96b" }} />
          <span className="font-heading text-lg font-semibold text-gray-900">NewTritious Life</span>
        </button>
        <div className="w-16" /> {/* spacer */}
      </div>

      {/* Page title — only shown on selection step */}
      {step === "selection" && (
        <div className="text-center py-12 px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-sm text-gray-500">Before booking please check my Intake Form</span>
            <button
              onClick={() => navigate("/intake")}
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full border transition-all"
              style={{ color: "#87a96b", borderColor: "#87a96b" }}
            >
              🌿 Start Intake Form
            </button>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#87a96b" }}>
            Schedule Online
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-gray-900">
            Book a Session
          </h1>
          <p className="text-gray-500 mt-3 text-sm max-w-sm mx-auto">
            Choose a date and time that works for you. All sessions are 50 minutes.
          </p>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === "selection" && (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SelectionStep onConfirm={handleConfirm} />
          </motion.div>
        )}
        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProcessingStep />
          </motion.div>
        )}
        {step === "confirmation" && booking && (
          <motion.div key="confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfirmationStep
              selectedDate={booking.selectedDate}
              selectedSlot={booking.selectedSlot}
              form={booking.form}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
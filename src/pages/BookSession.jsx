import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { base44 } from "@/api/base44Client";
import { Leaf, CheckCircle } from "lucide-react";

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

// Weekends are unavailable
const isUnavailableDay = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export default function BookSession() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ client_name: "", client_email: "", client_phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const dateFormatted = format(selectedDate, "EEEE, MMMM d, yyyy");
    await base44.entities.Appointment.create({
      date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedSlot,
      ...form,
      status: "pending",
    });
    setSubmitting(false);
    setSubmitted(true);
    // Send confirmation email non-blocking (after showing confirmation)
    base44.integrations.Core.SendEmail({
      to: form.client_email,
      from_name: "NewTritious Life",
      subject: `Your Session is Confirmed — ${dateFormatted} at ${selectedSlot}`,
      body: `Hi ${form.client_name},\n\nThank you for booking a session with NewTritious Life!\n\nHere are your appointment details:\n📅 Date: ${dateFormatted}\n🕐 Time: ${selectedSlot}\n⏱ Duration: 50 minutes\n\nIf you have any questions or need to reschedule, please reach out:\n📞 786-853-6259\n📧 Newtritious.life@gmail.com\n\nLooking forward to speaking with you!\n\nWarm regards,\nYael\nNewTritious Life`,
    }).catch(console.error);
  };

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-3">You're Booked!</h2>
          <p className="font-body text-muted-foreground mb-2">
            Your session on <strong>{format(selectedDate, "MMMM d, yyyy")}</strong> at <strong>{selectedSlot}</strong> has been requested.
          </p>
          <p className="font-body text-sm text-muted-foreground">
            You'll receive a confirmation shortly at <strong>{form.client_email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedSlot(null); setForm({ client_name: "", client_email: "", client_phone: "", notes: "" }); }}
            className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Book Another Session
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground/5 border-b border-border py-16 px-6 text-center">
        <button onClick={() => window.location.href = "/"} className="flex items-center gap-2 mx-auto mb-8 group">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-heading text-lg font-semibold text-foreground">NewTritious Life</span>
        </button>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">Schedule Online</p>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
          Book a Session
        </h1>
        <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
          Choose a date and time that works for you. All sessions are 50 minutes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Date + Time Picker */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
              1. Pick a Date
            </h2>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex justify-center">
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

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-8"
                >
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                    2. Pick a Time
                    <span className="font-body text-sm font-normal text-muted-foreground ml-2">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </span>
                  </h2>
                  {loadingSlots ? (
                    <div className="flex items-center justify-center h-24">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const booked = bookedSlots.includes(slot);
                        const active = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={booked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 px-2 rounded-xl text-xs font-body font-medium border transition-all duration-200
                              ${booked
                                ? "bg-muted text-muted-foreground border-border cursor-not-allowed line-through"
                                : active
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                              }`}
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

          {/* Right: Client Details Form */}
          <AnimatePresence>
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  3. Your Details
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5"
                >
                  {/* Summary */}
                  <div className="bg-accent/60 rounded-xl px-4 py-3 border border-primary/10">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Your Appointment</p>
                    <p className="font-body text-sm font-medium text-foreground">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")} · {selectedSlot}
                    </p>
                  </div>

                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.client_name}
                      onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.client_email}
                      onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.client_phone}
                      onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">Notes (optional)</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Tell me about your goals or any questions..."
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {submitting ? "Confirming..." : "Confirm Booking"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
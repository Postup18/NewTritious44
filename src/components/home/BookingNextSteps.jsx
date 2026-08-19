import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, CreditCard, ClipboardList, ArrowRight, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

export default function BookingNextSteps() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
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
        if (!cancelled && appts.length > 0) setAppointment(appts[0]);
      } catch {
        // not logged in or no appointment — silently skip
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading || dismissed || !appointment) return null;

  let dateFormatted = appointment.date;
  try { dateFormatted = format(parseISO(appointment.date), "EEEE, MMMM d, yyyy"); } catch {}

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#87a96b" }}>
            Welcome! Complete Your Booking
          </span>
        </div>
        <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-1">
          You're almost there, {appointment.client_name?.split(" ")[0]}!
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Your session is reserved for{" "}
          <strong className="text-gray-700">{dateFormatted} at {appointment.time_slot}</strong>.
          Complete the two steps below to finalize your booking.
        </p>

        {/* Appointment summary pill */}
        <div className="inline-flex items-center gap-4 rounded-xl px-4 py-3 mb-6" style={{ backgroundColor: "#f0f5ec" }}>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5a7a47" }}>
            <CalendarIcon className="w-4 h-4" /> {dateFormatted}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5a7a47" }}>
            <Clock className="w-4 h-4" /> {appointment.time_slot}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Step 1: Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#87a96b" }}>
                1
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" style={{ color: "#87a96b" }} />
                <h3 className="font-heading text-base font-semibold text-gray-900">Complete Your Payment</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Send your session payment via:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="font-medium" style={{ color: "#87a96b" }}>Venmo:</span> @NewTritious-Life
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium" style={{ color: "#87a96b" }}>Zelle:</span> ylaniado@hotmail.com
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-3">Please include your full name in the payment memo.</p>
          </div>

          {/* Step 2: Intake Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#87a96b" }}>
                2
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" style={{ color: "#87a96b" }} />
                <h3 className="font-heading text-base font-semibold text-gray-900">Fill Out Your Intake Form</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Complete your health history intake form so I can prepare for our session.
            </p>
            <button
              onClick={() => navigate("/intake")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#87a96b" }}
            >
              Start Intake Form <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Need to change your time? Email Newtritious.life@gmail.com. A detailed confirmation has also been sent to your inbox.
        </p>
      </div>
    </motion.div>
  );
}
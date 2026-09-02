import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

export default function BookingNextSteps() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Only auto-redirect once per session — after that, let the user browse Home freely
      if (sessionStorage.getItem("seen_booking_confirmed") === "true") {
        setChecking(false);
        return;
      }
      try {
        const user = await base44.auth.me();
        if (!user?.email) { setChecking(false); return; }
        const appts = await base44.entities.Appointment.filter({
          client_email: user.email,
          status: "pending",
          appointment_type: "session",
        }, "-created_date", 1);
        if (!cancelled && appts.length > 0) {
          navigate("/booking-confirmed", { replace: true });
        }
      } catch {
        // not logged in — silently skip
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  if (checking) return null;
  return null;
}
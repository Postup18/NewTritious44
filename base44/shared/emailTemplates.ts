// Localized email templates for booking confirmations.
// `lang` defaults to "en" if not provided or unrecognized.

function formatDate(dateStr: string, lang: string): string {
  const locale = lang === "es" ? "es-ES" : "en-US";
  const dateObj = new Date(dateStr + "T00:00:00");
  return dateObj.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Free Call: Client Confirmation ───────────────────────────────────────────
export function freeCallClientEmail(client_name: string, date: string, time_slot: string, lang: string = "en") {
  const dateFormatted = formatDate(date, lang);
  if (lang === "es") {
    return {
      subject: "Confirmado: Tu Llamada de Descubrimiento de 15 Minutos con NewTritious Life",
      text: `Hola ${client_name},

¡Tu llamada gratuita de descubrimiento de 15 minutos está oficialmente reservada! Espero conectarme contigo, escuchar sobre tus objetivos y ver cómo podemos apoyar mejor tu viaje de salud.

Detalles de la Llamada:
• Fecha: ${dateFormatted}
• Hora: ${time_slot} EST
• Donde: Google Meet (Enlace de Video Seguro)

👉 Unirse a la Videollamada: meet.google.com/abc-defg-hij

¿Necesitas reprogramar o cancelar? Envía un correo a Newtritious.life@gmail.com para ajustar o cancelar tu cita.

Cordialmente,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
    };
  }
  return {
    subject: `Confirmed: Your 15-Minute Discovery Call with NewTritious Life`,
    text: `Hi ${client_name},

Your free 15-minute discovery call is officially booked! I'm looking forward to connecting with you, hearing about your goals, and seeing how we can best support your health journey.

Call Details:
• Date: ${dateFormatted}
• Time: ${time_slot} EST
• Where: Google Meet (Secure Video Link)

👉 Join Video Call: meet.google.com/abc-defg-hij

Need to reschedule or cancel? Email Newtritious.life@gmail.com to adjust or cancel your appointment.

Warmly,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
  };
}

// ─── Free Call: Admin Notification ────────────────────────────────────────────
export function freeCallAdminEmail(client_name: string, date: string, time_slot: string, client_email: string, client_phone: string, client_state: string, lang: string = "en") {
  const dateFormatted = formatDate(date, lang);
  if (lang === "es") {
    return {
      subject: `Nueva Reserva de Llamada Gratis: ${client_name} — ${dateFormatted} a las ${time_slot}`,
      text: `Alerta de Nueva Reserva de Llamada Gratis:

${client_name} ha programado una llamada gratuita de descubrimiento de 15 minutos para ${dateFormatted} a las ${time_slot}.
Correo: ${client_email}
Teléfono: ${client_phone}
Estado: ${client_state}`,
    };
  }
  return {
    subject: `New Free Call Booking: ${client_name} — ${dateFormatted} at ${time_slot}`,
    text: `New Free Call Booking Alert:

${client_name} has scheduled a free 15-minute discovery call for ${dateFormatted} at ${time_slot}.
Email: ${client_email}
Phone: ${client_phone}
State: ${client_state}`,
  };
}

// ─── Paid Session: Client Confirmation (after Stripe payment) ────────────────
export function paidSessionClientEmail(client_name: string, date: string, time_slot: string, lang: string = "en") {
  const dateFormatted = formatDate(date, lang);
  if (lang === "es") {
    return {
      subject: "¡Tu Sesión Está Confirmada! – Detalles de Preparación y Enlaces",
      text: `Hola ${client_name},

¡Tu pago ha sido recibido y tu consulta está oficialmente confirmada para ${dateFormatted} a las ${time_slot}!

1. Tu Formulario de Admisión
Para ayudarme a prepararme para nuestro tiempo juntos, por favor completa tu formulario de historial de salud aquí:
https://nurture-flow-diet.base44.app/intake

2. ¿Necesitas Cambiar tu Hora?
Si necesitas ajustar o cancelar tu reserva, envía un correo a: Newtritious.life@gmail.com
(Nota: Las cancelaciones o reprogramaciones hechas con menos de 24 horas antes de tu sesión están sujetas a una tarifa de $75).

¿Qué pasa después?
Recibirás un correo de recordatorio 24 horas antes de nuestra reunión que incluirá tu enlace seguro de video de Google Meet.

Si tienes alguna pregunta, no dudes en responder a este correo. ¡Espero trabajar contigo!

Cordialmente,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
    };
  }
  return {
    subject: "Your Session is Confirmed! – Preparation Details & Links",
    text: `Hi ${client_name},

Your payment has been received and your consultation is officially confirmed for ${dateFormatted} at ${time_slot}!

1. Your Intake Form
To help me prepare for our time together, please complete your health history intake form here:
https://nurture-flow-diet.base44.app/intake

2. Need to Change Your Time?
If you need to adjust or cancel your reservation, email: Newtritious.life@gmail.com
(Note: Cancellations or reschedules made less than 24 hours before your session are subject to a $75 fee).

What happens next?
You will receive a reminder email 24 hours before our meeting that will include your secure Google Meet video link.

If you have any questions, feel free to reply to this email. I look forward to working with you!

Warmly,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
  };
}

// ─── Paid Session: Admin Notification ────────────────────────────────────────
export function paidSessionAdminEmail(client_name: string, date: string, time_slot: string, client_email: string, client_phone: string, client_state: string, lang: string = "en") {
  const dateFormatted = formatDate(date, lang);
  if (lang === "es") {
    return {
      subject: `Nueva Reserva: ${client_name} — ${dateFormatted} a las ${time_slot}`,
      text: `Alerta de Nueva Reserva (Pagada y Confirmada):

${client_name} ha programado una sesión para ${dateFormatted} a las ${time_slot}.
Correo: ${client_email}
Teléfono: ${client_phone}
Estado: ${client_state}`,
    };
  }
  return {
    subject: `New Booking: ${client_name} — ${dateFormatted} at ${time_slot}`,
    text: `New Booking Alert (Paid & Confirmed):

${client_name} has scheduled a session for ${dateFormatted} at ${time_slot}.
Email: ${client_email}
Phone: ${client_phone}
State: ${client_state}`,
  };
}

// ─── Venmo/Manual Path: Client Confirmation (sendBookingConfirmation) ───────
export function manualSessionClientEmail(client_name: string, date: string, time_slot: string, lang: string = "en") {
  const dateFormatted = formatDate(date, lang);
  if (lang === "es") {
    return {
      subject: `Tu sesión de nutrición está confirmada — ${dateFormatted}`,
      text: `Hola ${client_name},

Tu consulta de nutrición está reservada para ${dateFormatted} a las ${time_slot}.
Para finalizar tu reserva, por favor completa estos 2 pasos:

━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 1 — Completa Tu Pago
━━━━━━━━━━━━━━━━━━━━━━━━━
Por favor envía el pago de tu sesión usando uno de los métodos a continuación:
• Venmo: @NewTritious-Life
• Zelle: ylaniado@hotmail.com
(Por favor incluye tu nombre completo en la nota de pago)

━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 2 — Completa Tu Formulario de Admisión
━━━━━━━━━━━━━━━━━━━━━━━━━
Para ayudarme a prepararme para nuestro tiempo juntos, completa tu formulario de historial de salud aquí:
🔗 https://nurture-flow-diet.base44.app/intake

━━━━━━━━━━━━━━━━━━━━━━━━━
¿Necesitas Cambiar tu Hora?
━━━━━━━━━━━━━━━━━━━━━━━━━
Envía un correo a Newtritious.life@gmail.com para ajustar o cancelar tu reserva.
(Nota: Las cancelaciones o reprogramaciones hechas con menos de 24 horas antes de tu sesión están sujetas a una tarifa de $75.)

¿Qué pasa después?
Una vez que tu pago sea procesado, ¡tu sesión estará oficialmente confirmada! Recibirás un correo de recordatorio por separado 24 horas antes de nuestra reunión con tu enlace seguro de video de Google Meet.

Si tienes alguna pregunta, no dudes en responder a este correo. ¡Espero trabajar contigo!

Cordialmente,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
    };
  }
  return {
    subject: `Your nutrition session is confirmed — ${dateFormatted}`,
    text: `Hi ${client_name},

Your nutrition consultation is reserved for ${dateFormatted} at ${time_slot}.
To finalize your booking, please complete these 2 steps:

━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — Complete Your Payment
━━━━━━━━━━━━━━━━━━━━━━━━━
Please send your session payment using one of the methods below:
• Venmo: @NewTritious-Life
• Zelle: ylaniado@hotmail.com
(Please include your full name in the payment memo)

━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — Fill Out Your Intake Form
━━━━━━━━━━━━━━━━━━━━━━━━━
To help me prepare for our time together, complete your health history intake form here:
🔗 https://nurture-flow-diet.base44.app/intake

━━━━━━━━━━━━━━━━━━━━━━━━━
Need to Change Your Time?
━━━━━━━━━━━━━━━━━━━━━━━━━
Email Newtritious.life@gmail.com to adjust or cancel your reservation.
(Note: Cancellations or reschedules made less than 24 hours before your session are subject to a $75 fee.)

What happens next?
Once your payment is processed, your session is officially confirmed! You'll receive a separate reminder email 24 hours before our meeting with your secure Google Meet video link.

If you have any questions, feel free to reply to this email. I look forward to working with you!

Warmly,
Yael Laniado, MS, RD, LD/N
NewTritious Life LLC`,
  };
}
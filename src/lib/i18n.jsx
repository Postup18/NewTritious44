import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "nt_language";

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      approach: "Approach",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Contact",
      bookSession: "Book a Session",
    },
    hero: {
      tagline: "Registered Dietitian · Personalized Nutrition",
      title: "NewTritious Life",
      subtitle1: "Nourish Your Body,",
      subtitle2: "Transform Your Life",
      body: "Stop guessing what works for your body. Get expert 1-on-1 guidance to build realistic habits, clear the confusion, and achieve lasting results.",
      note: "🌿 100% Virtual Sessions • Licensed & Telehealth Certified • Most Insurances Accepted",
      btnCall: "Unsure? Book a 15-Min Call",
      btnServices: "View Services",
    },
    about: {
      heading1: "Hi, I'm Yael —",
      heading2: "your science-based nutrition partner",
      photoAlt: "Yael — Registered Dietitian",
      bio: [
        "As a Registered Dietitian with 20 years of experience, I've worked across many settings—from clinical hospital care to one-on-one coaching for weight management, wellness, and intuitive eating.",
        "My passion became deeply personal in 2017 when I developed painful, recurrent kidney stones. Honestly, it was frustrating and humbling. Even as a nutrition expert, I felt completely stuck and wondered why this was happening when I thought I was doing everything right.",
        "It was a huge wake-up call. I realized generic \"healthy eating\" wasn't enough—my body needed a custom approach. By digging into the science and rethinking my daily routine, I stopped the cycle and regained control of my health.",
        "That journey proved to me how powerful personalized care really is. Today, whether you're managing a health condition or building sustainable habits, I bring both clinical expertise and true empathy to help you thrive.",
      ],
      credentials: [
        "Master's Degree in Dietetics & Nutrition",
        "20 Years of Experience",
        "500+ Lives Transformed",
      ],
    },
    services: {
      eyebrow: "What I Offer",
      title1: "Services Tailored",
      title2: "to You",
      subtitle: "Every journey begins with a comprehensive consultation. From there, I craft a plan that fits seamlessly into your life.",
      btnCall: "Unsure? Book a 15-Min Call",
      seeMore: "see more",
      seeLess: "see less",
      viewPricing: "View Pricing & Book",
      cards: [
        {
          title: "Custom Nutrition & Meal Planning",
          preview: "Tailored food strategies designed around your real life, preferences, and routine—no rigid templates or restrictive rules.",
          whoItsFor: "Busy adults tired of meal prep burnout and confusing nutrition advice.",
          whatsIncluded: ["Flexible weekly frameworks, practical grocery lists, and easy recipes matched to your cooking skill level."],
          theGoal: "Build an effortless, sustainable eating routine that fits your lifestyle.",
        },
        {
          title: "Nutrition for Health Conditions",
          preview: "Evidence-based medical nutrition therapy to help manage diabetes, insulin resistance, or IBS and improve lab markers without extreme restrictions.",
          whoItsFor: "Individuals managing chronic health conditions who want to use food as medicine.",
          whatsIncluded: ["Review of medical history, disease-specific dietary protocols, and physician collaboration as needed."],
          theGoal: "Lower clinical risks and feel confident in your food choices.",
        },
        {
          title: "Sustainable Weight & Metabolism",
          preview: "A science-backed, non-diet approach to optimize your metabolism, balance hunger hormones, and ditch yo-yo dieting for good.",
          whoItsFor: "Anyone caught in yo-yo dieting looking for long-term weight stability.",
          whatsIncluded: ["Metabolic factor assessments, satisfying meal guidance without strict calorie counting, and behavioral strategies."],
          theGoal: "Achieve sustainable weight management while fostering a peaceful relationship with food.",
        },
        {
          title: "Gut Health & Prevention",
          preview: "Proactive care to heal digestion, eliminate bloating, balance your microbiome, and elevate your daily energy levels.",
          whoItsFor: "Adults dealing with digestive distress, bloating, or seeking longevity care.",
          whatsIncluded: ["Targeted digestion support, microbiome balancing, and optional food elimination/reintroduction protocols."],
          theGoal: "Eliminate discomfort, boost vitality, and protect your long-term health.",
        },
        {
          title: "Functional Lab Testing",
          preview: "Deep-dive diagnostic testing ordered directly through Fullscript and expertly interpreted to uncover hidden root causes.",
          whoItsFor: "Anyone experiencing lingering symptoms despite normal annual blood work.",
          whatsIncluded: ["Ordering comprehensive functional panels through Fullscript and receiving in-depth, plain-English interpretation."],
          theGoal: "Stop guessing and address the true root cause using objective biological data.",
        },
        {
          title: "Targeted Supplementation",
          preview: "Cut through supplement clutter with a personalized safety audit and professional-grade recommendations ordered via Fullscript.",
          whoItsFor: "Individuals overwhelmed by supplement trends and social media advice.",
          whatsIncluded: ["A full safety check for interactions, a minimal custom protocol, and ordering professional-grade brands directly through Fullscript."],
          theGoal: "Save money, eliminate clutter, and take only what your body actually requires.",
        },
      ],
      labels: { whoItsFor: "Who It's For", whatsIncluded: "What's Included", theGoal: "The Goal" },
    },
    approach: {
      title1: "A Process Built",
      title2: "Around You",
      body: "I don't believe in one-size-fits-all. My method is rooted in listening, understanding, and crafting solutions that feel natural — not forced.",
      steps: [
        { num: "01", title: "Discovery Call", desc: "We start with a free 15-minute call to understand your goals and see if we're the right fit." },
        { num: "02", title: "In-Depth Assessment", desc: "A comprehensive evaluation of your health history, lifestyle, and dietary habits." },
        { num: "03", title: "Your Custom Plan", desc: "Receive a personalized nutrition roadmap with practical, delicious meal ideas." },
        { num: "04", title: "Ongoing Support", desc: "Regular follow-ups to track progress, adapt your plan, and celebrate wins." },
      ],
      stat: "98%",
      statLabel: "of clients reach their goals",
      name: "Yael Laniado, RD",
      btnCall: "Unsure? Book a 15-Min Call",
      tagline: "I help adults cut through the noise of nutrition confusion with a realistic, root-cause approach—no guilt, no guesswork.",
      pillars: [
        { title: "Root-Cause Investigation", desc: "We look at the full picture—using functional and conventional labs, nutrient assessments, and lifestyle reviews to address why you feel this way, not just mask symptoms." },
        { title: "No-Guilt Philosophy", desc: "Tired of strict food rules and restriction? We focus on nourishing your body. Progress over perfection, combining evidence-based science with self-compassion." },
        { title: "Practical Tools for Life", desc: "You get much more than a meal plan. Walk away with clear insights, actionable strategies, and the confidence to take control of your health." },
      ],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title1: "What My Clients",
      title2: "Say",
      items: [
        { name: "Rachel M.", role: "Weight Management Client", text: "Yael completely changed how I think about food. For the first time, I feel in control — not restricted. I've lost 15 kg and actually enjoy eating more than ever.", stars: 5 },
        { name: "David K.", role: "Diabetes Management", text: "My blood sugar levels have never been this stable. Yael's approach is so practical and easy to follow. I wish I had found her years ago.", stars: 5 },
        { name: "Lina T.", role: "Wellness Client", text: "I came in feeling exhausted all the time. Within weeks of following Yael's plan, my energy skyrocketed. She truly listens and cares about your progress.", stars: 5 },
      ],
    },
    faq: {
      eyebrow: "Good to Know",
      title1: "Frequently Asked",
      title2: "Questions",
      subtitle: "Everything you need to know before getting started. Can't find your answer? Reach out and I'm happy to help.",
      items: [
        { question: "Do you accept insurance?", answer: "Yes. I am in-network with most major insurance plans. For plans I'm not in-network with, I provide detailed superbills you can submit to your insurer for potential out-of-network reimbursement. To make this seamless, your insurance details and a photo of your card are collected securely right at booking so I can verify your coverage in advance." },
        { question: "How do virtual sessions work?", answer: "All sessions are 100% virtual, conducted through a secure video platform from the comfort of your home or office. Sessions are 50 minutes, and everything you need—your plan, resources, and follow-ups—is delivered digitally. I am officially licensed in Florida, Texas, Kentucky, Illinois, and Georgia. Depending on your location and state regulations, I may also be able to work with clients in other states—feel free to reach out to check eligibility!" },
        { question: "Do I need a referral to book a session?", answer: "No referral is needed to get started. You can book an initial consultation directly, or schedule a free 15-minute discovery call if you're unsure which path is right for you. If your physician recommends specific lab work, I'm happy to collaborate with your care team." },
        { question: "What happens after I book?", answer: "Once you select your time, your session is reserved. You will receive a welcome email with your payment instructions (via Venmo or Zelle) and a link to complete your quick intake form. Once your payment is verified, your official confirmation is sent, and your secure Google Meet video link will arrive in your 24-hour reminder email." },
        { question: "How do I pay for my session?", answer: "For self-pay clients, I accept secure and fee-free transfers via Venmo (@NewTritious-Life) and Zelle (ylaniado@hotmail.com). Payment details and instructions are provided immediately upon booking. If you are using insurance, your coverage details will be verified according to your plan." },
        { question: "What is your cancellation, reschedule, and refund policy?", answer: "• More than 24 Hours (Free): You can easily reschedule or cancel your appointment free of charge up to 24 hours before your scheduled session using the link provided in your email.\n• Less than 24 Hours & No-Shows (Penalty): Because your time slot is reserved exclusively for you, cancellations made less than 24 hours in advance, or missed appointments without notice, are subject to a $75 late cancellation fee.\n• Refunds: Session fees are non-refundable once the appointment has taken place. If you prepay via Venmo or Zelle and cancel with more than 24 hours' notice, a full refund will be promptly issued." },
        { question: "Do you recommend supplements or labs?", answer: "Yes! I partner with Fullscript to provide you with direct, professional-grade supplement dispensing shipped right to your door. If needed, I can also order and coordinate specialized lab testing to tailor your nutrition plan even further." },
        { question: "How many sessions will I need?", answer: "It depends on your goals. Some clients need a single targeted consultation, while others benefit from ongoing monthly support. We'll map out a plan together—there's never pressure to commit to a long package upfront." },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title1: "Ready to Start",
      title2: "Your Journey?",
      body: "Have a question or want to learn more? Send me a message and I'll get back to you within 24 hours.",
      info: [
        { label: "Phone", value: "786-519-1550" },
        { label: "Email", value: "Newtritious.life@gmail.com" },
        { label: "Location", value: "100% Virtual Sessions (Primary clinical licenses in FL, TX, KY, IL & GA). Not in one of these states? Send a message to see if we can support your location!" },
        { label: "Insurance", value: "In-network with most major insurances (Superbills provided for out-of-network)" },
        { label: "Hours", value: "Mon–Fri: 9am – 6pm" },
      ],
      form: {
        name: "Full Name",
        namePh: "Your name",
        email: "Email",
        emailPh: "your@email.com",
        phone: "Phone (optional)",
        phonePh: "+1 (555) 000-0000",
        message: "Message",
        messagePh: "Tell me about your goals...",
        submit: "Send Message",
      },
    },
    footer: {
      copyright: "NewTritious. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms",
      medical: "Medical Disclaimer",
      refund: "Refund Policy",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Acerca de",
      services: "Servicios",
      approach: "Enfoque",
      testimonials: "Testimonios",
      faq: "Preguntas",
      contact: "Contacto",
      bookSession: "Reservar Cita",
    },
    hero: {
      tagline: "Dietista Registrada · Nutrición Personalizada",
      title: "NewTritious Life",
      subtitle1: "Nutre tu cuerpo,",
      subtitle2: "Transforma tu vida",
      body: "Deja de adivinar qué funciona para tu cuerpo. Obtén guía experta 1 a 1 para crear hábitos realistas, aclarar la confusión y lograr resultados duraderos.",
      note: "🌿 100% Sesiones Virtuales • Con Licencia y Certificada en Telehealth • Aceptamos la Mayoría de Seguros",
      btnCall: "¿Inseguro? Reserva una Llamada de 15 Min",
      btnServices: "Ver Servicios",
    },
    about: {
      heading1: "Hola, soy Yael —",
      heading2: "tu compañera de nutrición basada en la ciencia",
      photoAlt: "Yael — Dietista Registrada",
      bio: [
        "Como Dietista Registrada con 20 años de experiencia, he trabajado en diversos entornos—desde la atención clínica hospitalaria hasta el asesoramiento individual para el control de peso, el bienestar y la alimentación intuitiva.",
        "Mi pasión se volvió profundamente personal en 2017 cuando desarrollé cálculos renales dolorosos y recurrentes. Honestamente, fue frustrante y humillante. Incluso como experta en nutrición, me sentí completamente atrapada y me preguntaba por qué sucedía esto cuando creía que lo estaba haciendo todo bien.",
        "Fue una gran llamada de atención. Me di cuenta de que la \"alimentación saludable\" genérica no era suficiente—mi cuerpo necesitaba un enfoque personalizado. Al profundizar en la ciencia y repensar mi rutina diaria, detuve el ciclo y recuperé el control de mi salud.",
        "Ese viaje me demostró lo poderoso que es realmente el cuidado personalizado. Hoy, ya sea que estés manejando una condición de salud o construyendo hábitos sostenibles, aporto tanto la experiencia clínica como una verdadera empatía para ayudarte a prosperar.",
      ],
      credentials: [
        "Maestría en Dietética y Nutrición",
        "20 Años de Experiencia",
        "500+ Vidas Transformadas",
      ],
    },
    services: {
      eyebrow: "Lo Que Ofrezco",
      title1: "Servicios A Tu",
      title2: "Medida",
      subtitle: "Cada viaje comienza con una consulta integral. A partir de ahí, creo un plan que se integra perfectamente en tu vida.",
      btnCall: "¿Inseguro? Reserva una Llamada de 15 Min",
      seeMore: "ver más",
      seeLess: "ver menos",
      viewPricing: "Ver Precios y Reservar",
      cards: [
        {
          title: "Nutrición y Plan de Comidas Personalizado",
          preview: "Estrategias alimenticias a tu medida, diseñadas para tu vida real, preferencias y rutina—sin plantillas rígidas ni reglas restrictivas.",
          whoItsFor: "Adultos ocupados cansados del agotamiento de preparar comidas y de consejos confusos sobre nutrición.",
          whatsIncluded: ["Marcos semanales flexibles, listas de compras prácticas y recetas fáciles adaptadas a tu nivel de cocina."],
          theGoal: "Construir una rutina alimenticia sin esfuerzo y sostenible que se ajuste a tu estilo de vida.",
        },
        {
          title: "Nutrición para Condiciones de Salud",
          preview: "Terapia de nutrición médica basada en evidencia para ayudar a controlar la diabetes, la resistencia a la insulina o el SII y mejorar los marcadores de laboratorio sin restricciones extremas.",
          whoItsFor: "Personas que manejan condiciones de salud crónicas y quieren usar la alimentación como medicina.",
          whatsIncluded: ["Revisión del historial médico, protocolos dietéticos específicos para la enfermedad y colaboración con el médico según sea necesario."],
          theGoal: "Reducir los riesgos clínicos y sentirte seguro con tus elecciones alimenticias.",
        },
        {
          title: "Peso y Metabolismo Sostenible",
          preview: "Un enfoque científico y sin dieta para optimizar tu metabolismo, equilibrar las hormonas del hambre y dejar las dietas yo-yo para siempre.",
          whoItsFor: "Cualquiera atrapado en las dietas yo-yo que busque estabilidad de peso a largo plazo.",
          whatsIncluded: ["Evaluaciones de factores metabólicos, guía de comidas satisfactorias sin conteo estricto de calorías y estrategias conductuales."],
          theGoal: "Lograr un control de peso sostenible mientras fomentas una relación pacífica con la comida.",
        },
        {
          title: "Salud Intestinal y Prevención",
          preview: "Cuidado proactivo para sanar la digestión, eliminar la hinchazón, equilibrar tu microbioma y elevar tus niveles de energía diarios.",
          whoItsFor: "Adultos que sufren de malestar digestivo, hinchazón o que buscan cuidado de longevidad.",
          whatsIncluded: ["Aporte digestivo dirigido, equilibrio del microbioma y protocolos opcionales de eliminación/reintroducción de alimentos."],
          theGoal: "Eliminar la incomodidad, aumentar la vitalidad y proteger tu salud a largo plazo.",
        },
        {
          title: "Análisis de Laboratorio Funcional",
          preview: "Pruebas de diagnóstico profundas ordenadas directamente a través de Fullscript e interpretadas por expertos para descubrir causas raíz ocultas.",
          whoItsFor: "Cualquiera que experimente síntomas persistentes a pesar de los análisis de sangre anuales normales.",
          whatsIncluded: ["Ordenación de paneles funcionales integrales a través de Fullscript y recepción de una interpretación profunda en lenguaje sencillo."],
          theGoal: "Dejar de adivinar y abordar la verdadera causa raíz utilizando datos biológicos objetivos.",
        },
        {
          title: "Suplementación Dirigida",
          preview: "Corta el exceso de suplementos con una auditoría de seguridad personalizada y recomendaciones de grado profesional ordenadas vía Fullscript.",
          whoItsFor: "Personas abrumadas por las tendencias de suplementos y los consejos de las redes sociales.",
          whatsIncluded: ["Una revisión completa de seguridad para interacciones, un protocolo personalizado mínimo y ordenación de marcas de grado profesional directamente a través de Fullscript."],
          theGoal: "Ahorrar dinero, eliminar el exceso y tomar solo lo que tu cuerpo realmente necesita.",
        },
      ],
      labels: { whoItsFor: "Para Quién Es", whatsIncluded: "Qué Incluye", theGoal: "El Objetivo" },
    },
    approach: {
      title1: "Un Proceso Construido",
      title2: "A Tu Alrededor",
      body: "No creo en soluciones únicas para todos. Mi método se basa en escuchar, comprender y crear soluciones que se sientan naturales — no forzadas.",
      steps: [
        { num: "01", title: "Llamada de Descubrimiento", desc: "Comenzamos con una llamada gratuita de 15 minutos para entender tus objetivos y ver si somos el ajuste adecuado." },
        { num: "02", title: "Evaluación Profunda", desc: "Una evaluación integral de tu historial de salud, estilo de vida y hábitos alimenticios." },
        { num: "03", title: "Tu Plan Personalizado", desc: "Recibe un plan de nutrición personalizado con ideas de comidas prácticas y deliciosas." },
        { num: "04", title: "Apoyo Continuo", desc: "Seguimientos regulares para rastrear el progreso, adaptar tu plan y celebrar los logros." },
      ],
      stat: "98%",
      statLabel: "de los clientes alcanzan sus objetivos",
      name: "Yael Laniado, RD",
      btnCall: "¿Inseguro? Reserva una Llamada de 15 Min",
      tagline: "Ayudo a los adultos a cortar el ruido de la confusión nutricional con un enfoque realista de causa raíz—sin culpa, sin conjeturas.",
      pillars: [
        { title: "Investigación de Causa Raíz", desc: "Miramos el panorama completo—utilizando laboratorios funcionales y convencionales, evaluaciones de nutrientes y revisiones de estilo de vida para abordar por qué te sientes así, no solo enmascarar los síntomas." },
        { title: "Filosofía Sin Culpas", desc: "¿Cansado de reglas estrictas y restricción? Nos enfocamos en nutrir tu cuerpo. Progreso sobre perfección, combinando ciencia basada en evidencia con autocompasión." },
        { title: "Herramientas Prácticas para la Vida", desc: "Obtienes mucho más que un plan de comidas. Sal con ideas claras, estrategias accionables y la confianza para tomar el control de tu salud." },
      ],
    },
    testimonials: {
      eyebrow: "Testimonios",
      title1: "Lo Que Mis Clientes",
      title2: "Dicen",
      items: [
        { name: "Rachel M.", role: "Cliente de Control de Peso", text: "Yael cambió por completo cómo pienso sobre la comida. Por primera vez, me siento en control — no restringida. He perdido 15 kg y realmente disfruto comer más que nunca.", stars: 5 },
        { name: "David K.", role: "Control de Diabetes", text: "Mis niveles de azúcar en la sangre nunca habían sido tan estables. El enfoque de Yael es tan práctico y fácil de seguir. Ojalá la hubiera encontrado hace años.", stars: 5 },
        { name: "Lina T.", role: "Cliente de Bienestar", text: "Llegué sintiéndome agotada todo el tiempo. A las pocas semanas de seguir el plan de Yael, mi energía se disparó. Ella realmente escucha y se preocupa por tu progreso.", stars: 5 },
      ],
    },
    faq: {
      eyebrow: "Bueno Saber",
      title1: "Preguntas",
      title2: "Frecuentes",
      subtitle: "Todo lo que necesitas saber antes de comenzar. ¿No encuentras tu respuesta? Escríbeme y estaré feliz de ayudarte.",
      items: [
        { question: "¿Aceptas seguro médico?", answer: "Sí. Estoy dentro de la red de la mayoría de los principales planes de seguro. Para los planes en los que no estoy dentro de la red, proporciono superbills detallados que puedes enviar a tu aseguradora para un posible reembolso fuera de la red. Para que esto sea fluido, los detalles de tu seguro y una foto de tu tarjeta se recopilan de forma segura al momento de la reserva para que pueda verificar tu cobertura con anticipación." },
        { question: "¿Cómo funcionan las sesiones virtuales?", answer: "Todas las sesiones son 100% virtuales, realizadas a través de una plataforma de video segura desde la comodidad de tu casa u oficina. Las sesiones duran 50 minutos, y todo lo que necesitas—tu plan, recursos y seguimientos—se entrega digitalmente. Estoy oficialmente licenciada en Florida, Texas, Kentucky, Illinois y Georgia. Dependiendo de tu ubicación y las regulaciones estatales, también puedo trabajar con clientes en otros estados—¡no dudes en contactarme para verificar la elegibilidad!" },
        { question: "¿Necesito una remisión para reservar una cita?", answer: "No se necesita remisión para comenzar. Puedes reservar una consulta inicial directamente, o programar una llamada gratuita de descubrimiento de 15 minutos si no estás seguro de cuál es el camino adecuado para ti. Si tu médico recomienda análisis de laboratorio específicos, estaré feliz de colaborar con tu equipo de atención." },
        { question: "¿Qué pasa después de reservar?", answer: "Una vez que selecciones tu hora, tu sesión queda reservada. Recibirás un correo de bienvenida con las instrucciones de pago (vía Venmo o Zelle) y un enlace para completar tu breve formulario de admisión. Una vez verificado tu pago, se envía tu confirmación oficial, y tu enlace seguro de video de Google Meet llegará en tu correo de recordatorio de 24 horas." },
        { question: "¿Cómo pago mi sesión?", answer: "Para clientes de pago propio, acepto transferencias seguras y sin comisión vía Venmo (@NewTritious-Life) y Zelle (ylaniado@hotmail.com). Los detalles e instrucciones de pago se proporcionan inmediatamente al reservar. Si estás usando seguro, los detalles de tu cobertura se verificarán según tu plan." },
        { question: "¿Cuál es tu política de cancelación, reprogramación y reembolso?", answer: "• Más de 24 Horas (Gratis): Puedes reprogramar o cancelar tu cita fácilmente y sin cargo hasta 24 horas antes de tu sesión programada usando el enlace proporcionado en tu correo.\n• Menos de 24 Horas y No Presentaciones (Penalización): Debido a que tu franja horaria está reservada exclusivamente para ti, las cancelaciones hechas con menos de 24 horas de anticipación, o las citas perdidas sin previo aviso, están sujetas a una tarifa de cancelación tardía de $75.\n• Reembolsos: Las tarifas de las sesiones no son reembolsables una vez que la cita ha tenido lugar. Si prepagas vía Venmo o Zelle y cancelas con más de 24 horas de anticipación, se emitirá prontamente un reembolso completo." },
        { question: "¿Recomiendas suplementos o análisis de laboratorio?", answer: "¡Sí! Trabajo con Fullscript para proporcionarte dispensación directa de suplementos de grado profesional enviados directamente a tu puerta. Si es necesario, también puedo ordenar y coordinar análisis de laboratorio especializados para adaptar aún más tu plan de nutrición." },
        { question: "¿Cuántas sesiones necesitaré?", answer: "Depende de tus objetivos. Algunos clientes necesitan una sola consulta específica, mientras que otros se benefician del apoyo mensual continuo. Trazaremos un plan juntos—nunca hay presión para comprometerse con un paquete largo por adelantado." },
      ],
    },
    contact: {
      eyebrow: "Contáctame",
      title1: "¿Listo para Comenzar",
      title2: "Tu Viaje?",
      body: "¿Tienes una pregunta o quieres saber más? Envíame un mensaje y te responderé dentro de las 24 horas.",
      info: [
        { label: "Teléfono", value: "786-519-1550" },
        { label: "Correo", value: "Newtritious.life@gmail.com" },
        { label: "Ubicación", value: "100% Sesiones Virtuales (Licencias clínicas principales en FL, TX, KY, IL y GA). ¿No estás en uno de estos estados? ¡Envía un mensaje para ver si podemos apoyar tu ubicación!" },
        { label: "Seguro", value: "Dentro de la red con la mayoría de los seguros principales (Superbills proporcionados para fuera de la red)" },
        { label: "Horario", value: "Lun–Vie: 9am – 6pm" },
      ],
      form: {
        name: "Nombre Completo",
        namePh: "Tu nombre",
        email: "Correo",
        emailPh: "tu@correo.com",
        phone: "Teléfono (opcional)",
        phonePh: "+1 (555) 000-0000",
        message: "Mensaje",
        messagePh: "Cuéntame sobre tus objetivos...",
        submit: "Enviar Mensaje",
      },
    },
    footer: {
      copyright: "NewTritious. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos",
      medical: "Aviso Médico",
      refund: "Política de Reembolso",
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "en", setLang: () => {}, t: translations.en };
  return ctx;
}
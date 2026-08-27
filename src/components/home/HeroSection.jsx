import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/aaa857c8d_generated_65dd71b6.png"
          alt="Healthy Mediterranean food spread on a wooden table"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-white/80 mb-6"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight"
        >
          {t.hero.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mt-2"
        >
          {t.hero.subtitle1}
          <br />
          <span className="italic font-normal">{t.hero.subtitle2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-base sm:text-lg text-white/85 mt-6 max-w-xl mx-auto leading-relaxed"
        >
          {t.hero.body}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-sm sm:text-base text-white/85 mt-4 max-w-xl mx-auto leading-relaxed"
        >
          {t.hero.note}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/book-session")}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-medium text-sm hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            {t.hero.btnCall}
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="border border-white/40 text-white px-8 py-3.5 rounded-full font-body font-medium text-sm hover:bg-white/10 transition-all duration-300"
          >
            {t.hero.btnServices}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
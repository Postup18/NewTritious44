import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const credentialIcons = [GraduationCap, Award, Heart];
const credentialBgs = ["#A6B4A6", "#E6D6CE", "#C2C8B5"];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
      {/* Watercolor accents */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#D5E0D5", opacity: 0.3, filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "#D5E0D5", opacity: 0.25, filter: "blur(80px)" }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl mx-auto" style={{ maxWidth: "50%" }}>
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/5533ebcb5_YaelPhoto081926.jpg"
                alt={t.about.photoAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10" style={{ backgroundColor: "#A6B4A6", opacity: 0.4 }} />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 rounded-2xl -z-10" style={{ borderColor: "#A6B4A6", opacity: 0.3 }} />
          </motion.div>

          {/* Text + Badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-snug" style={{ color: "#2D2D2D" }}>
              {t.about.heading1} <br />
              <span className="italic font-normal">{t.about.heading2}</span>
            </h2>

            {t.about.bio.map((para, i) => (
              <p
                key={i}
                className="font-body mt-4 leading-relaxed"
                style={{ color: "#4A4A4A" }}
              >
                {para}
              </p>
            ))}

            {/* Horizontal credential badges */}
            <div className="mt-10 flex flex-row gap-4 justify-start">
              {t.about.credentials.map((text, i) => {
                const Icon = credentialIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="flex-1 flex flex-col items-center text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: credentialBgs[i] }}
                    >
                      <Icon className="w-7 h-7" style={{ color: "#ffffff" }} />
                    </div>
                    <span className="font-body text-xs font-medium leading-tight" style={{ color: "#4A4A4A" }}>
                      {text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
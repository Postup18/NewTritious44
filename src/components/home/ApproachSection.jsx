import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Compass } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const pillarIcons = [Search, Heart, Compass];

export default function ApproachSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const ap = t.approach;

  return (
    <section id="approach" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-snug">
              {ap.title1} <br />
              <span className="italic font-normal">{ap.title2}</span>
            </h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">
              {ap.body}
            </p>

            <div className="mt-10 space-y-6">
              {ap.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-body text-xs font-semibold">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative md:mt-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/1cea11f69_generated_f7e2299e.png"
                alt="Person holding a healthy colorful meal bowl"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-primary/90 text-primary-foreground rounded-xl px-5 py-3 shadow-lg">
                <p className="font-heading text-2xl font-semibold leading-tight">{ap.stat}</p>
                <p className="font-body text-sm leading-tight">{ap.statLabel}</p>
              </div>
            </div>
            <p className="font-heading text-lg font-semibold text-foreground text-center mt-6">
              {ap.name}
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => navigate("/free-call")}
                className="px-8 py-3.5 rounded-full font-body font-medium text-sm text-white transition-all duration-300 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#0D3B3E" }}
              >
                {ap.btnCall}
              </button>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed text-center mt-5 max-w-xs mx-auto">
              {ap.tagline}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16">
          {ap.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
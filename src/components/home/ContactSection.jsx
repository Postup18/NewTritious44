import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const infoIcons = [Phone, Mail, MapPin, ShieldCheck, Clock];

export default function ContactSection() {
  const { t } = useLanguage();
  const ct = t.contact;
  const f = ct.form;

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
              {ct.eyebrow}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-snug">
              {ct.title1} <br />
              <span className="italic font-normal">{ct.title2}</span>
            </h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">
              {ct.body}
            </p>

            <div className="mt-10 space-y-5">
              {ct.info.map((item, i) => {
                const Icon = infoIcons[i];
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="font-body text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 space-y-5"
            >
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  {f.name}
                </label>
                <input
                  type="text"
                  placeholder={f.namePh}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  {f.email}
                </label>
                <input
                  type="email"
                  placeholder={f.emailPh}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  {f.phone}
                </label>
                <input
                  type="tel"
                  placeholder={f.phonePh}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  {f.message}
                </label>
                <textarea
                  rows={4}
                  placeholder={f.messagePh}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                {f.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const ts = t.testimonials;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            {ts.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            {ts.title1} <span className="italic font-normal">{ts.title2}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {ts.items.map((tm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-7 shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-500 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                "{tm.text}"
              </p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: tm.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-heading text-sm font-semibold text-foreground">{tm.name}</p>
                <p className="font-body text-xs text-muted-foreground">{tm.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
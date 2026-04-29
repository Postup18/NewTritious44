import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rachel M.",
    role: "Weight Management Client",
    text: "Sarah completely changed how I think about food. For the first time, I feel in control — not restricted. I've lost 15 kg and actually enjoy eating more than ever.",
    stars: 5,
  },
  {
    name: "David K.",
    role: "Diabetes Management",
    text: "My blood sugar levels have never been this stable. Sarah's approach is so practical and easy to follow. I wish I had found her years ago.",
    stars: 5,
  },
  {
    name: "Lina T.",
    role: "Wellness Client",
    text: "I came in feeling exhausted all the time. Within weeks of following Sarah's plan, my energy skyrocketed. She truly listens and cares about your progress.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
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
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            What My Clients <span className="italic font-normal">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
                "{t.text}"
              </p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
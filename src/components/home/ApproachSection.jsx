import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We start with a free 15-minute call to understand your goals and see if we're the right fit.",
  },
  {
    num: "02",
    title: "In-Depth Assessment",
    desc: "A comprehensive evaluation of your health history, lifestyle, and dietary habits.",
  },
  {
    num: "03",
    title: "Your Custom Plan",
    desc: "Receive a personalized nutrition roadmap with practical, delicious meal ideas.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "Regular follow-ups to track progress, adapt your plan, and celebrate wins.",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
              My Approach
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-snug">
              A Process Built <br />
              <span className="italic font-normal">Around You</span>
            </h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">
              I don't believe in one-size-fits-all. My method is rooted in listening,
              understanding, and crafting solutions that feel natural — not forced.
            </p>

            <div className="mt-10 space-y-6">
              {steps.map((step, i) => (
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
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/1cea11f69_generated_f7e2299e.png"
                alt="Person holding a healthy colorful meal bowl"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-5 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">98% of clients</p>
                  <p className="font-body text-xs text-muted-foreground">reach their goals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
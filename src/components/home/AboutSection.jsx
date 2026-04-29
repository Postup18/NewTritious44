import React from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Heart } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "M.Sc. in Clinical Nutrition" },
  { icon: Award, text: "12+ Years of Experience" },
  { icon: Heart, text: "500+ Clients Helped" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/c868cf545_generated_9069d9ba.png"
                alt="Professional dietitian portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
              About Me
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-snug">
              Hi, I'm Sarah — <br />
              <span className="italic font-normal text-primary">your nutrition partner</span>
            </h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">
              As a registered clinical dietitian, I believe that nutrition should be simple,
              enjoyable, and sustainable. My approach combines the latest scientific evidence with
              a deep understanding of each client's lifestyle, preferences, and goals.
            </p>
            <p className="font-body text-muted-foreground mt-4 leading-relaxed">
              I specialize in working with adults who want to improve their relationship with food,
              manage chronic conditions, or simply feel their best. Every plan I create is as unique
              as the person I'm working with.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
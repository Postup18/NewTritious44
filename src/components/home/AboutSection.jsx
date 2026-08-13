import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Heart } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Master's Degree in Dietetics & Nutrition", bg: "#A6B4A6", iconColor: "#ffffff" },
  { icon: Award, text: "20 Years of Experience", bg: "#E6D6CE", iconColor: "#ffffff" },
  { icon: Heart, text: "500+ Lives Transformed", bg: "#C2C8B5", iconColor: "#ffffff" },
];

const bioParagraphs = [
  `As a Registered Dietitian with 20 years of experience, I've worked across many settings—from clinical hospital care to one-on-one coaching for weight management, wellness, and intuitive eating.`,
  `My passion became deeply personal in 2017 when I developed painful, recurrent kidney stones. Honestly, it was frustrating and humbling. Even as a nutrition expert, I felt completely stuck and wondered why this was happening when I thought I was doing everything right.`,
  `It was a huge wake-up call. I realized generic "healthy eating" wasn't enough—my body needed a custom approach. By digging into the science and rethinking my daily routine, I stopped the cycle and regained control of my health.`,
  `That journey proved to me how powerful personalized care really is. Today, whether you're managing a health condition or building sustainable habits, I bring both clinical expertise and true empathy to help you thrive.`,
];

export default function AboutSection() {
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
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/e8b45a4a4_YaelsPhoto.jpg"
                alt="Yael — Registered Dietitian"
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
              Hi, I'm Yael — <br />
              <span className="italic font-normal">your science-based nutrition partner</span>
            </h2>

            {bioParagraphs.map((para, i) => (
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
              {credentials.map((item, i) => (
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
                    style={{ backgroundColor: item.bg }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.iconColor }} />
                  </div>
                  <span className="font-body text-xs font-medium leading-tight" style={{ color: "#4A4A4A" }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
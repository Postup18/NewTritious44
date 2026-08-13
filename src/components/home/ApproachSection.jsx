import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
            <img
              src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/fa15b275c_image.png"
              alt="Yael's nutrition approach"
              className="rounded-2xl w-full mb-6"
            />
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
            className="relative md:mt-[30rem]"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69f267852d1729cd58c3d853/1cea11f69_generated_f7e2299e.png"
                alt="Person holding a healthy colorful meal bowl"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-heading text-lg font-semibold text-foreground text-center mt-6">
              Yael Laniado, RD
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => navigate("/book-session")}
                className="px-8 py-3.5 rounded-full font-body font-medium text-sm text-white transition-all duration-300 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#0D3B3E" }}
              >
                Schedule 15-Min Call
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
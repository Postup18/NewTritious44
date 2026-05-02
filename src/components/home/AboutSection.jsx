import React from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Heart } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "M.Sc. in Clinical Nutrition" },
  { icon: Award, text: "12+ Years of Experience" },
  { icon: Heart, text: "500+ Clients Helped" },
];

const bioParagraphs = [
  `As a registered dietitian, I've had the opportunity to work across many settings in the field—from clinical roles in hospitals and long-term care facilities to outpatient nutrition counseling for weight management, and intuitive eating.`,
  `My passion for nutrition became deeply personal in 2017, when I began experiencing recurrent kidney stones—a painful and often misunderstood condition that can significantly affect quality of life. After multiple episodes, I dove into research and applied my professional knowledge to modify my hydration, dietary patterns, and lifestyle. Through targeted changes in fluid intake, calcium and oxalate balance, sodium reduction, and overall nutrient timing, I was able to reduce my stone risk and regain control of my health. This journey gave me a firsthand understanding of how powerful—and necessary—personalized nutrition can be, especially when dealing with chronic or recurring conditions.`,
  `My approach is both personalized and evidence based. I take a comprehensive look at the full picture—using functional and conventional lab testing, detailed nutrient assessments, supplement and medication reviews, and lifestyle evaluations to uncover root causes rather than just treating symptoms.`,
  `Clients often come to me tired of food rules, restriction, and being told what not to eat. Here, we do things differently. At NewTritious Life, we believe food should nourish your body and your life. We believe that progress isn't measured by perfection, and that real change happens when we combine science with self-compassion.`,
  `When we work together, you'll gain more than just a meal plan. You'll gain tools, insights, and a partnership rooted in education, empathy, and achievable action steps. You'll walk away feeling more confident in your choices and more in control of your health.`,
  `To help you get started and make sure we're a great fit, I offer complimentary 15-minute discovery calls for all new clients.`,
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top two-column: image + intro */}
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
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Intro text + credentials */}
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
              Hi, I'm Yael — <br />
              <span className="italic font-normal text-primary">your nutrition partner</span>
            </h2>
            <p className="font-body text-muted-foreground mt-6 leading-relaxed">
              {bioParagraphs[0]}
            </p>
            <p className="font-body text-muted-foreground mt-4 leading-relaxed">
              {bioParagraphs[1]}
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

        {/* Remaining bio paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 max-w-3xl"
        >
          {bioParagraphs.slice(2, 6).map((para, i) => (
            <p key={i} className="font-body text-muted-foreground mt-4 leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>

        {/* Approach callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 bg-accent rounded-2xl p-8 border border-primary/10 max-w-3xl"
        >
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-3">Approach</p>
          <p className="font-body text-foreground leading-relaxed">
            I help adults cut through the noise of nutrition confusion with a realistic, root-cause approach—no guilt, no guesswork. Whether you're navigating hormonal changes, preventing kidney stones, or just want to feel better in your body, I combine science, empathy, and practical tools to guide you. Let's make food work for your life—not the other way around.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, HeartPulse, Scale, Leaf, FlaskConical, Pill } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Custom Nutrition & Meal Planning",
    preview:
      "Tailored, practical food strategies designed around your real life, preferences, and routine—no rigid templates or restrictive food rules.",
    expanded: {
      whoItsFor:
        "Busy adults tired of meal prep burnout, food boredom, or confusing nutrition advice who want a clear, enjoyable way to eat.",
      whatsIncluded: [
        "Customized meal ideas and flexible weekly frameworks.",
        "Practical grocery lists and dining-out strategies.",
        "Easy recipe inspiration tailored to your taste preferences and cooking skill level.",
      ],
      theGoal:
        "Simplify daily eating and build an effortless, sustainable routine that fits your lifestyle.",
    },
  },
  {
    icon: HeartPulse,
    title: "Nutrition for Health Conditions",
    preview:
      "Personalized nutrition care if you've been diagnosed with diabetes, insulin resistance, high cholesterol, high blood pressure, or IBS—helping you lower clinical risks without feeling restricted.",
    expanded: {
      whoItsFor:
        "Individuals managing single or multiple chronic health conditions who want to improve lab markers using evidence-based nutrition as medicine.",
      whatsIncluded: [
        "Comprehensive review of your medical history and clinical lab work.",
        "Disease-specific dietary protocols tailored to your daily routine.",
        "Targeted guidance to improve blood sugar control, lipid panels, or digestive comfort.",
        "Collaboration with your primary physician or specialists as needed.",
      ],
      theGoal:
        "Manage your health condition effectively, lower clinical risks, and feel confident in your food choices without extreme restrictions.",
    },
  },
  {
    icon: Scale,
    title: "Sustainable Weight & Metabolism",
    preview:
      "Ditch rigid food rules for a science-backed, non-diet approach to weight management and metabolic health—focused on nourishing your body and building habits that last.",
    expanded: {
      whoItsFor:
        "Anyone caught in the cycle of yo-yo dieting who wants to optimize their metabolism, balance hunger hormones, and reach a comfortable, sustainable weight.",
      whatsIncluded: [
        "Assessment of key metabolic factors (blood sugar balance, satiety signals, daily energy).",
        "Guidance on nutrient-dense, satisfying meals without strict calorie counting or restriction.",
        "Behavioral strategies to end guilt-driven eating and build food freedom.",
      ],
      theGoal:
        "Achieve long-term weight stability and daily energy while fostering a compassionate, peaceful relationship with food and your body.",
    },
  },
  {
    icon: Leaf,
    title: "Gut Health & Prevention",
    preview:
      "Proactive care to heal digestion, balance your microbiome, optimize immune function, and elevate your daily energy levels.",
    expanded: {
      whoItsFor:
        "Adults dealing with frequent bloating, sluggish digestion, irregular bowel habits, or those seeking long-term preventive longevity.",
      whatsIncluded: [
        "Targeted digestion support and gut-microbiome balancing strategies.",
        "Strategic food elimination and reintroduction protocols (if necessary).",
        "Integrative guidance on sleep, stress management, and daily movement for optimal gut health.",
      ],
      theGoal:
        "Eliminate digestive distress, boost total-body vitality, and protect your health for the long run.",
    },
  },
  {
    icon: FlaskConical,
    title: "Functional Lab Testing",
    preview:
      "Deep-dive diagnostic testing to uncover hidden nutrient deficiencies, hormonal shifts, and root causes standard labs might miss.",
    expanded: {
      whoItsFor:
        'Anyone who feels "off" or experiences lingering symptoms despite being told their standard annual lab results are completely normal.',
      whatsIncluded: [
        "Ordering and in-depth interpretation of comprehensive functional blood panels.",
        "Clear, patient-friendly translation of complex biomarkers.",
        "A personalized action plan built directly from your unique biological data.",
      ],
      theGoal:
        "Stop guessing and start addressing the true root cause of your health concerns with objective data.",
    },
  },
  {
    icon: Pill,
    title: "Targeted Supplementation",
    preview:
      "Cut through supplement clutter with personalized, high-quality recommendations designed specifically for your body's actual needs.",
    expanded: {
      whoItsFor:
        "Individuals overwhelmed by supplement trends, social media advice, or cabinets full of vitamins who want safe, effective guidance.",
      whatsIncluded: [
        "Full supplement safety audit (checking for quality, nutrient interactions, and proper dosages).",
        "Customized, minimal protocol focusing only on what your body clinically requires.",
        "Access to professional-grade, third-party tested supplements with exclusive dispenser discounts.",
      ],
      theGoal:
        "Eliminate supplement clutter, save money, and ensure you are taking safe, therapeutic-grade products that actually deliver results.",
    },
  },
];

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const ServiceIcon = service.icon;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/20 flex flex-col"
    >
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
        <ServiceIcon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {service.preview}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 space-y-4"
          >
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                Who It's For
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.expanded.whoItsFor}
              </p>
            </div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                What's Included
              </p>
              <ul className="space-y-1.5">
                {service.expanded.whatsIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="font-body text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                The Goal
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.expanded.theGoal}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary underline hover:opacity-80 text-sm mt-4 self-start"
      >
        {expanded ? "see less" : "see more"}
      </button>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 bg-[hsl(var(--secondary))]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            What I Offer
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Services Tailored <span className="italic font-normal">to You</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 leading-relaxed">
            Every journey begins with a comprehensive consultation. From there,
            I craft a plan that fits seamlessly into your life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
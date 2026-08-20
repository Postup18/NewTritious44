import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Utensils, HeartPulse, Scale, Leaf, FlaskConical, Pill } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Custom Nutrition & Meal Planning",
    preview:
      "Tailored food strategies designed around your real life, preferences, and routine—no rigid templates or restrictive rules.",
    expanded: {
      whoItsFor:
        "Busy adults tired of meal prep burnout and confusing nutrition advice.",
      whatsIncluded: [
        "Flexible weekly frameworks, practical grocery lists, and easy recipes matched to your cooking skill level.",
      ],
      theGoal:
        "Build an effortless, sustainable eating routine that fits your lifestyle.",
    },
  },
  {
    icon: HeartPulse,
    title: "Nutrition for Health Conditions",
    preview:
      "Evidence-based medical nutrition therapy to help manage diabetes, insulin resistance, or IBS and improve lab markers without extreme restrictions.",
    expanded: {
      whoItsFor:
        "Individuals managing chronic health conditions who want to use food as medicine.",
      whatsIncluded: [
        "Review of medical history, disease-specific dietary protocols, and physician collaboration as needed.",
      ],
      theGoal:
        "Lower clinical risks and feel confident in your food choices.",
    },
  },
  {
    icon: Scale,
    title: "Sustainable Weight & Metabolism",
    preview:
      "A science-backed, non-diet approach to optimize your metabolism, balance hunger hormones, and ditch yo-yo dieting for good.",
    expanded: {
      whoItsFor:
        "Anyone caught in yo-yo dieting looking for long-term weight stability.",
      whatsIncluded: [
        "Metabolic factor assessments, satisfying meal guidance without strict calorie counting, and behavioral strategies.",
      ],
      theGoal:
        "Achieve sustainable weight management while fostering a peaceful relationship with food.",
    },
  },
  {
    icon: Leaf,
    title: "Gut Health & Prevention",
    preview:
      "Proactive care to heal digestion, eliminate bloating, balance your microbiome, and elevate your daily energy levels.",
    expanded: {
      whoItsFor:
        "Adults dealing with digestive distress, bloating, or seeking longevity care.",
      whatsIncluded: [
        "Targeted digestion support, microbiome balancing, and optional food elimination/reintroduction protocols.",
      ],
      theGoal:
        "Eliminate discomfort, boost vitality, and protect your long-term health.",
    },
  },
  {
    icon: FlaskConical,
    title: "Functional Lab Testing",
    preview:
      "Deep-dive diagnostic testing ordered directly through Fullscript and expertly interpreted to uncover hidden root causes.",
    expanded: {
      whoItsFor:
        "Anyone experiencing lingering symptoms despite normal annual blood work.",
      whatsIncluded: [
        "Ordering comprehensive functional panels through Fullscript and receiving in-depth, plain-English interpretation.",
      ],
      theGoal:
        "Stop guessing and address the true root cause using objective biological data.",
    },
  },
  {
    icon: Pill,
    title: "Targeted Supplementation",
    preview:
      "Cut through supplement clutter with a personalized safety audit and professional-grade recommendations ordered via Fullscript.",
    expanded: {
      whoItsFor:
        "Individuals overwhelmed by supplement trends and social media advice.",
      whatsIncluded: [
        "A full safety check for interactions, a minimal custom protocol, and ordering professional-grade brands directly through Fullscript.",
      ],
      theGoal:
        "Save money, eliminate clutter, and take only what your body actually requires.",
    },
  },
];

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
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

            <button
              onClick={() => navigate("/book-session")}
              className="mt-2 w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-all duration-300"
            >
              View Pricing & Book
            </button>
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
  const navigate = useNavigate();
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

          <div className="mt-8">
            <button
              onClick={() => navigate("/free-call")}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-medium text-sm hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Unsure? Book a 15-Min Call
            </button>
          </div>
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
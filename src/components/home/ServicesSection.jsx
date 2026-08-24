import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Utensils, HeartPulse, Scale, Leaf, FlaskConical, Pill } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const serviceIcons = [Utensils, HeartPulse, Scale, Leaf, FlaskConical, Pill];

function ServiceCard({ service, index, icon, labels, seeMore, seeLess, viewPricing }) {
  const [expanded, setExpanded] = useState(false);
  const ServiceIcon = icon;

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
                {labels.whoItsFor}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.whoItsFor}
              </p>
            </div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                {labels.whatsIncluded}
              </p>
              <ul className="space-y-1.5">
                {service.whatsIncluded.map((item, i) => (
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
                {labels.theGoal}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.theGoal}
              </p>
            </div>

            <Link
              to="/book-session"
              className="mt-2 w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm hover:opacity-90 transition-all duration-300 text-center block"
            >
              {viewPricing}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary underline hover:opacity-80 text-sm mt-4 self-start"
      >
        {expanded ? seeLess : seeMore}
      </button>
    </motion.div>
  );
}

export default function ServicesSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
            {t.services.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            {t.services.title1} <span className="italic font-normal">{t.services.title2}</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 leading-relaxed">
            {t.services.subtitle}
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate("/free-call")}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-medium text-sm hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              {t.services.btnCall}
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.cards.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              icon={serviceIcons[i]}
              labels={t.services.labels}
              seeMore={t.services.seeMore}
              seeLess={t.services.seeLess}
              viewPricing={t.services.viewPricing}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
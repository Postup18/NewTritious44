import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, Activity, Scale, Apple, Pill, FlaskConical } from "lucide-react";

const services = [
{
  icon: Utensils,
  title: "Personalized Meal Plans",
  description:
  "Custom nutrition plans designed around your lifestyle, preferences, and health goals — no cookie-cutter diets."
},
{
  icon: Activity,
  title: "Medical Nutrition Therapy",
  description:
  "Targeted, evidence-based medical nutrition therapy for a wide range of chronic conditions such as diabetes, heart disease, digestive issues, autoimmune disorders, and kidney health. Our approach focuses on managing symptoms, preventing complications, and supporting your overall health.",
  truncateAt: 110
},
{
  icon: Scale,
  title: "Weight Management",
  description:
  "A balanced, sustainable approach to reaching and maintaining your ideal weight without restrictive dieting."
},
{
  icon: Apple,
  title: "Wellness & Prevention",
  description:
  "Proactive nutrition strategies to boost energy, improve gut health, and support long-term wellbeing."
},
{
  icon: Pill,
  title: "Supplements",
  description:
  "Personalized supplement recommendations based on your health goals, lab results, and dietary gaps — no guesswork."
},
{
  icon: FlaskConical,
  title: "Lab Tests",
  description:
  "Comprehensive lab test reviews and functional testing to uncover nutritional deficiencies and root causes."
}];


function ServiceDescription({ description, truncateAt }) {
  const [expanded, setExpanded] = useState(false);
  if (!truncateAt || expanded) {
    return (
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {description}{" "}
        {truncateAt && (
          <button onClick={() => setExpanded(false)} className="text-primary underline hover:opacity-80 text-sm">see less</button>
        )}
      </p>
    );
  }
  return (
    <p className="font-body text-sm text-muted-foreground leading-relaxed">
      {description.slice(0, truncateAt).trimEnd()}{"... "}
      <button onClick={() => setExpanded(true)} className="text-primary underline hover:opacity-80 text-sm">see more</button>
    </p>
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
          className="text-center max-w-2xl mx-auto mb-16">
          
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
          {services.map((service, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group bg-card rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/20">
            
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <ServiceDescription description={service.description} truncateAt={service.truncateAt} />
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}
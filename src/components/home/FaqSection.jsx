import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do you accept insurance?",
    answer:
      "Yes. I am in-network with most major insurance plans. For plans I'm not in-network with, I provide detailed superbills you can submit to your insurer for potential out-of-network reimbursement. Reach out and I'll help verify your specific coverage.",
  },
  {
    question: "How do virtual sessions work?",
    answer:
      "All sessions are 100% virtual, conducted through a secure video platform from the comfort of your home or office. After you book, you'll receive a link by email. Sessions are 50 minutes, and everything you need—your plan, resources, and follow-ups—is delivered digitally. I am licensed to see clients in FL, TX, KY, IL, and GA.",
  },
  {
    question: "Do I need a referral to book a session?",
    answer:
      "No referral is needed to get started. You can book a free 15-minute discovery call directly, and we'll determine together whether a full nutrition consultation is the right next step for you. If your physician recommends specific lab work, I'm happy to collaborate with your care team.",
  },
  {
    question: "What happens after I book?",
    answer:
      "Once your session is confirmed, you'll receive a welcome email with your video link and a short intake form to complete beforehand. This helps me understand your goals, history, and preferences so our first session is productive from minute one.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "It depends on your goals. Some clients need a single targeted consultation, while others benefit from ongoing monthly support. We'll map out a plan together during your discovery call—there's never pressure to commit to a long package upfront.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-heading text-base md:text-lg font-semibold text-foreground">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-primary" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed px-6 pb-6">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Good to Know
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Frequently Asked <span className="italic font-normal">Questions</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 leading-relaxed">
            Everything you need to know before getting started. Can't find your
            answer? Reach out and I'm happy to help.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
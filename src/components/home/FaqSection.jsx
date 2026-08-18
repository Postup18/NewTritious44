import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do you accept insurance?",
    answer:
      "Yes. I am in-network with most major insurance plans. For plans I'm not in-network with, I provide detailed superbills you can submit to your insurer for potential out-of-network reimbursement. To make this seamless, your insurance details and a photo of your card are collected securely right at booking so I can verify your coverage in advance.",
  },
  {
    question: "How do virtual sessions work?",
    answer:
      "All sessions are 100% virtual, conducted through a secure video platform from the comfort of your home or office. Sessions are 50 minutes, and everything you need—your plan, resources, and follow-ups—is delivered digitally. I am officially licensed in Florida, Texas, Kentucky, Illinois, and Georgia. Depending on your location and state regulations, I may also be able to work with clients in other states—feel free to reach out to check eligibility!",
  },
  {
    question: "Do I need a referral to book a session?",
    answer:
      "No referral is needed to get started. You can book an initial consultation directly, or schedule a free 15-minute discovery call if you're unsure which path is right for you. If your physician recommends specific lab work, I'm happy to collaborate with your care team.",
  },
  {
    question: "What happens after I book?",
    answer:
      "Once you select your time, your session is reserved. You will receive a welcome email with your payment instructions (via Venmo or Zelle) and a link to complete your quick intake form. Once your payment is verified, your official confirmation is sent, and your secure Google Meet video link will arrive in your 24-hour reminder email.",
  },
  {
    question: "How do I pay for my session?",
    answer:
      "For self-pay clients, I accept secure and fee-free transfers via Venmo (@NewTritious-Life) and Zelle (ylaniado@hotmail.com). Payment details and instructions are provided immediately upon booking. If you are using insurance, your coverage details will be verified according to your plan.",
  },
  {
    question: "What is your cancellation, reschedule, and refund policy?",
    answer:
      "• More than 24 Hours (Free): You can easily reschedule or cancel your appointment free of charge up to 24 hours before your scheduled session using the link provided in your email.\n• Less than 24 Hours & No-Shows (Penalty): Because your time slot is reserved exclusively for you, cancellations made less than 24 hours in advance, or missed appointments without notice, are subject to a $75 late cancellation fee.\n• Refunds: Session fees are non-refundable once the appointment has taken place. If you prepay via Venmo or Zelle and cancel with more than 24 hours' notice, a full refund will be promptly issued.",
  },
  {
    question: "Do you recommend supplements or labs?",
    answer:
      "Yes! I partner with Fullscript to provide you with direct, professional-grade supplement dispensing shipped right to your door. If needed, I can also order and coordinate specialized lab testing to tailor your nutrition plan even further.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "It depends on your goals. Some clients need a single targeted consultation, while others benefit from ongoing monthly support. We'll map out a plan together—there's never pressure to commit to a long package upfront.",
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
            <p className="font-body text-sm text-muted-foreground leading-relaxed px-6 pb-6 whitespace-pre-line">
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
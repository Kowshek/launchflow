"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How is LaunchFlow different from Jira or Linear?",
    a: "LaunchFlow is AI-native from day one. Instead of manually creating tickets and dragging cards, you describe what you want to build and our AI generates the entire sprint plan, estimates effort, and identifies dependencies automatically.",
  },
  {
    q: "Can I import my existing projects?",
    a: "Yes. We support one-click imports from Jira, Linear, Asana, Trello, and GitHub Projects. Your data migrates in minutes, not days.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We're SOC 2 Type II certified, all data is encrypted at rest and in transit, and we never train AI models on your project data.",
  },
  {
    q: "What happens after the waitlist?",
    a: "Early waitlist members get 3 months free on the Pro plan, plus direct access to our founding team for feedback and feature requests.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. 30-day money-back guarantee, no questions asked.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative w-full px-6 py-40 md:px-12 lg:px-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            FAQ
          </span>
          <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="divide-y divide-white/8"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const questionId = `faq-question-${i}`;
            const answerId = `faq-answer-${i}`;

            return (
              <motion.div key={i} variants={itemVariants}>
                <button
                  id={questionId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className={cn(
                    "group flex w-full items-center justify-between gap-4 py-5 text-left",
                    "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  )}
                >
                  <span
                    className={cn(
                      "text-base font-medium transition-colors duration-200",
                      isOpen
                        ? "text-warm-white"
                        : "text-slate-300 group-hover:text-warm-white"
                    )}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "flex-shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-accent"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      key="answer"
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

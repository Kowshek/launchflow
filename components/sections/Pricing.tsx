"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Perfect for solo builders and small projects.",
    features: [
      "Up to 3 team members",
      "Basic sprint planning",
      "100 AI suggestions/month",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaVariant: "ghost" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    originalPrice: "$49",
    period: "/mo",
    description: "For growing teams that ship fast and need every edge.",
    features: [
      "Up to 20 team members",
      "Advanced AI planning",
      "Unlimited AI suggestions",
      "Real-time collaboration",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Join Waitlist",
    ctaVariant: "primary" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large orgs with serious compliance and scale needs.",
    features: [
      "Unlimited everything",
      "SSO & SAML",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom AI training",
    ],
    cta: "Contact Sales",
    ctaVariant: "ghost" as const,
    popular: false,
  },
];

// ─── Animation ─────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative w-full px-6 py-24 md:px-12 lg:px-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Pricing
          </span>
          <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base text-muted md:text-lg">
            Start free. Scale when you're ready.
          </p>
        </div>

        {/* ── Cards ── */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        {/* ── Fine print ── */}
        <p className="mt-10 text-center text-xs text-slate-600">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ─── Pricing card ───────────────────────────────────────────────────────────

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  const { popular } = plan;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        "hover:-translate-y-1",
        popular
          ? [
              "border-accent/50 bg-navy-800/80",
              "shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_20px_60px_-15px_rgba(59,130,246,0.25)]",
              "hover:shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_28px_70px_-12px_rgba(59,130,246,0.35)]",
              "md:scale-[1.04]",
            ]
          : [
              "border-white/10 bg-navy-800/50",
              "hover:border-white/20 hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5)]",
            ]
      )}
    >
      {/* Accent top bar on popular card */}
      {popular && (
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
      )}

      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-accent backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name + description */}
      <div className="mb-6">
        <h3 className="font-heading text-lg font-semibold text-warm-white">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8 flex items-end gap-2">
        <span
          className={cn(
            "font-heading text-5xl font-bold leading-none",
            popular ? "text-warm-white" : "text-warm-white"
          )}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span className="mb-1 text-base text-muted">{plan.period}</span>
        )}
        {plan.originalPrice && (
          <span className="mb-1 text-sm text-slate-600 line-through">
            {plan.originalPrice}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                popular ? "bg-accent/20" : "bg-white/6"
              )}
            >
              <Check
                size={10}
                strokeWidth={3}
                className={popular ? "text-accent" : "text-slate-400"}
              />
            </span>
            <span className="text-sm leading-snug text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <button
          className={cn(
            "w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
            plan.ctaVariant === "primary"
              ? [
                  "bg-accent text-white",
                  "shadow-[0_0_20px_-4px_rgba(59,130,246,0.6)]",
                  "hover:bg-accent-hover hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.8)]",
                  "active:scale-[0.98]",
                ]
              : [
                  "border border-white/15 bg-transparent text-warm-white",
                  "hover:border-white/30 hover:bg-white/5",
                  "active:scale-[0.98]",
                ]
          )}
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
}

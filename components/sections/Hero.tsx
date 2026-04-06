"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Animation ─────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className={cn(
        "relative flex min-h-[calc(85vh-4rem)] flex-col items-center justify-start",
        "px-6 pt-24 pb-12 text-center md:pt-32"
      )}
      aria-label="Hero"
    >
      {/* ── Background glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Central radial glow */}
        <div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-3xl flex-col items-center gap-6"
      >
        {/* ── Badge ── */}
        <motion.div variants={item}>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5",
              "border border-accent/25 bg-accent/8 text-sm font-medium text-accent",
              "relative overflow-hidden"
            )}
            style={{ animation: "badge-pulse 3s ease-in-out infinite" }}
          >
            {/* Shimmer sweep */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.8s ease-in-out infinite",
              }}
            />
            <span>✨</span>
            <span>Now in Early Access</span>
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1
          variants={item}
          className="font-heading text-5xl font-bold leading-[1.1] tracking-tight text-warm-white md:text-6xl lg:text-7xl"
        >
          Ship Your SaaS{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #818CF8 60%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            10x Faster
          </span>
        </motion.h1>

        {/* ── Subheading ── */}
        <motion.p
          variants={item}
          className="max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          LaunchFlow is the AI-powered project management tool built for SaaS
          teams who actually ship. Plan smarter, move faster, launch with confidence.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#waitlist"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white",
              "shadow-[0_0_24px_-4px_rgba(59,130,246,0.6)]",
              "transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_32px_-4px_rgba(59,130,246,0.8)]",
              "active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            )}
          >
            Join the Waitlist
            <ArrowRight size={15} />
          </a>

          <a
            href="#features"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-warm-white",
              "transition-all duration-200 hover:border-white/30 hover:bg-white/5",
              "active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            )}
          >
            See How It Works
            <ChevronDown size={15} />
          </a>
        </motion.div>

        {/* ── Social proof ── */}
        <motion.p
          variants={item}
          className="flex items-center gap-2 text-sm text-muted"
        >
          <span>🎉</span>
          <span>
            <strong className="font-semibold text-slate-300">2,847 builders</strong>{" "}
            already on the waitlist
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}

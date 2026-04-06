"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Users, BarChart3, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Feature cards data ────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    title: "AI Sprint Planning",
    description:
      "Describe your goals in plain English. LaunchFlow generates sprint plans, assigns tasks, and predicts blockers before they happen.",
  },
  {
    icon: Users,
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    title: "Real-time Collaboration",
    description:
      "See who's working on what, right now. Live cursors, instant updates, and async handoffs that actually work.",
  },
  {
    icon: BarChart3,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    title: "Ship Analytics",
    description:
      "Track velocity, cycle time, and deployment frequency. Know exactly where your team stands — no guessing.",
  },
];

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const bentoVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// ─── Mini dashboard mock ───────────────────────────────────────────────────

function MiniDashboard() {
  const bars = [65, 80, 55, 90, 72, 60, 88];
  const tasks = [
    { label: "Auth system", progress: 100, color: "bg-emerald-500" },
    { label: "Dashboard UI", progress: 72, color: "bg-accent" },
    { label: "API integration", progress: 45, color: "bg-violet-500" },
    { label: "Analytics", progress: 18, color: "bg-orange-400" },
  ];

  return (
    <div className="flex h-full gap-3 p-5 text-xs font-body">
      {/* Sidebar */}
      <div className="flex w-[52px] flex-shrink-0 flex-col gap-3 pt-1">
        {["Sprint", "Board", "Metrics", "Team", "Docs"].map((item, i) => (
          <div
            key={item}
            className={cn(
              "rounded-md px-1.5 py-1.5 text-center leading-none",
              i === 0
                ? "bg-accent/20 text-accent font-medium"
                : "text-slate-500 hover:text-slate-400"
            )}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-3 min-w-0">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-warm-white font-semibold text-[11px]">Sprint 14</div>
            <div className="text-slate-500 text-[10px]">8 days remaining</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px]">Live</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <div className="mb-2 text-[10px] text-slate-500">Velocity (story pts)</div>
          <div className="flex h-14 items-end gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-[2px] transition-all",
                  i === bars.length - 1
                    ? "bg-accent/80"
                    : "bg-accent/25"
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Task progress list */}
        <div className="flex flex-col gap-2">
          {tasks.map((t) => (
            <div key={t.label}>
              <div className="mb-1 flex justify-between text-[10px]">
                <span className="text-slate-400">{t.label}</span>
                <span className="text-slate-500">{t.progress}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/5">
                <div
                  className={cn("h-full rounded-full", t.color)}
                  style={{ width: `${t.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom avatars row */}
        <div className="mt-auto flex items-center gap-1.5">
          {["A", "B", "C", "D"].map((c, i) => (
            <div
              key={c}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-navy text-[8px] font-bold"
              style={{
                background: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"][i],
              }}
            >
              {c}
            </div>
          ))}
          <span className="text-[10px] text-slate-500 ml-1">4 active now</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  iconColor,
  value,
  label,
  delay,
}: {
  icon: React.ElementType;
  iconColor: string;
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={bentoVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-white/10 bg-navy-800/60 p-6",
        "transition-all duration-300",
        "hover:border-accent/30 hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.25)]"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          "bg-white/5 group-hover:bg-white/8 transition-colors"
        )}
      >
        <Icon size={18} className={iconColor} />
      </div>
      <div>
        <div className="text-2xl font-bold text-warm-white font-heading mt-4">{value}</div>
        <div className="text-sm text-muted mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function Features() {
  const cardsRef = useRef(null);
  const bentoRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const bentoInView = useInView(bentoRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative w-full px-6 py-24 md:px-12 lg:px-20">
      {/* Subtle radial glow behind the section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Features
          </span>
          <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl lg:text-5xl">
            Everything you need to ship fast
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg max-w-xl mx-auto">
            One platform that handles planning, coordination, and analytics — so your team stays in flow.
          </p>
        </div>

        {/* ── 3 feature cards ── */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className={cn(
                "group relative flex flex-col gap-4 rounded-xl border border-white/10 bg-navy-800/60 p-7",
                "backdrop-blur-sm transition-all duration-300",
                "hover:border-white/20 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]",
                "hover:-translate-y-0.5"
              )}
            >
              {/* Hover glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)",
                }}
              />

              {/* Icon */}
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  f.iconBg
                )}
              >
                <f.icon size={22} className={f.iconColor} />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-warm-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bento highlight ── */}
        <motion.div
          ref={bentoRef}
          initial="hidden"
          animate={bentoInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5"
        >
          {/* Left: mock UI dashboard (spans 3 cols) */}
          <motion.div
            variants={bentoVariants}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-white/10 bg-navy-800/60 md:col-span-3",
              "backdrop-blur-sm transition-all duration-300",
              "hover:border-white/20 hover:shadow-[0_0_50px_-15px_rgba(59,130,246,0.3)]"
            )}
            style={{ minHeight: "260px" }}
          >
            {/* Header bar */}
            <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-[11px] text-slate-500">launchflow.app / sprint-14</span>
            </div>

            {/* Dashboard content */}
            <div className="h-[calc(100%-40px)]">
              <MiniDashboard />
            </div>

            {/* Glow reflection at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
              style={{
                background:
                  "linear-gradient(to top, rgba(59,130,246,0.05), transparent)",
              }}
            />
          </motion.div>

          {/* Right: two stat cards (spans 2 cols) */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <StatCard
              icon={TrendingUp}
              iconColor="text-emerald-400"
              value="40% faster"
              label="sprint completion vs. industry average"
              delay={0.1}
            />
            <StatCard
              icon={Zap}
              iconColor="text-yellow-400"
              value="12,000+"
              label="tasks automated this month"
              delay={0.2}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

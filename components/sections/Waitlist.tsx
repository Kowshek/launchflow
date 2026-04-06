"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="relative w-full px-6 py-24 md:px-12 lg:px-20"
    >
      {/* Gradient background card */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.09) 0%, transparent 70%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: EASE }}
        className={cn(
          "mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy-800/60 px-8 py-14 text-center",
          "shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)]",
          "backdrop-blur-sm"
        )}
      >
        <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl">
          Ready to ship faster?
        </h2>
        <p className="mt-4 text-base text-muted md:text-lg">
          Join{" "}
          <span className="font-medium text-warm-white">2,847 founders</span>{" "}
          and developers on the waitlist. Early members get 3 months of Pro —
          free.
        </p>

        <div className="mt-10">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-5"
            >
              <p className="text-base font-medium text-emerald-400">
                🎉 You&apos;re on the list! We&apos;ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  required
                  className={cn(
                    "flex-1 rounded-xl border bg-white/5 px-4 py-3 text-sm text-warm-white placeholder:text-slate-600",
                    "outline-none transition-all duration-200",
                    "focus:border-accent/60 focus:bg-white/8 focus:ring-2 focus:ring-accent/20",
                    status === "error"
                      ? "border-red-500/50"
                      : "border-white/10"
                  )}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white",
                    "bg-accent transition-all duration-200",
                    "shadow-[0_0_20px_-4px_rgba(59,130,246,0.5)]",
                    "hover:bg-accent-hover hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.7)]",
                    "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
                    "sm:flex-shrink-0"
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Joining…
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs text-red-400"
                >
                  {message}
                </motion.p>
              )}
            </form>
          )}
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-600">
          <Lock size={11} />
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}

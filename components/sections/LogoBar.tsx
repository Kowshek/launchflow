"use client";

import { useRef, useEffect, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────

const logos = [
  { name: "Vercel",    weight: "font-bold",    size: "text-lg"   },
  { name: "Linear",    weight: "font-semibold", size: "text-base" },
  { name: "Notion",    weight: "font-bold",    size: "text-lg"   },
  { name: "Stripe",    weight: "font-semibold", size: "text-base" },
  { name: "Raycast",   weight: "font-bold",    size: "text-lg"   },
  { name: "Arc",       weight: "font-semibold", size: "text-base" },
  { name: "Figma",     weight: "font-bold",    size: "text-lg"   },
  { name: "GitHub",    weight: "font-semibold", size: "text-base" },
  { name: "Loom",      weight: "font-bold",    size: "text-lg"   },
  { name: "Intercom",  weight: "font-semibold", size: "text-base" },
];

// ─── Why 4 copies? ─────────────────────────────────────────────────────────
//
//  singleSetWidth ≈ 10 logos × ~160px = ~1600px
//  4 copies  →  total track = ~6400px
//
//  Loop boundary = singleSetWidth (~1600px).
//  After any reset, copies 2–4 fill the viewport (covers 4K and wide screens).
//  Rule: visible content at pos=N equals content at pos=0 because
//        set2 == set3 == set4 == set1  →  no jump, ever.

const NUM_COPIES = 4;
const track = Array.from({ length: NUM_COPIES }, () => logos).flat();

// ─── Tuning ────────────────────────────────────────────────────────────────

const NORMAL_SPEED = 0.5;   // px / frame at 60 fps  (≈ 30 px/s)
const HOVER_SPEED  = 0.06;  // near-still on hover
const EASE         = 0.05;  // fraction of speed-gap closed per frame

// ─── Component ─────────────────────────────────────────────────────────────

export default function LogoBar({ speed = NORMAL_SPEED }: { speed?: number }) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const posRef      = useRef(0);       // accumulated translation (px)
  const curSpeed    = useRef(speed);   // speed actually applied this frame
  const targetSpeed = useRef(speed);   // speed we are easing toward
  const setWidth    = useRef(0);       // pixel width of ONE logo set (loop boundary)
  const rafId       = useRef<number | null>(null);

  // ── RAF loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // ResizeObserver keeps setWidth accurate across font-swaps and window resizes.
    // On first call it fires synchronously right after the first layout.
    const ro = new ResizeObserver(() => {
      setWidth.current = el.scrollWidth / NUM_COPIES;
    });
    ro.observe(el);

    // Belt-and-suspenders: measure immediately too
    setWidth.current = el.scrollWidth / NUM_COPIES;

    let alive = true;

    function tick() {
      if (!alive) return;

      // Ease curSpeed toward targetSpeed
      curSpeed.current += (targetSpeed.current - curSpeed.current) * EASE;

      posRef.current += curSpeed.current;

      // Modulo reset — handles any overshoot cleanly
      if (setWidth.current > 0) {
        posRef.current = posRef.current % setWidth.current;
      }

      el!.style.transform = `translateX(-${posRef.current}px)`;
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      alive = false;
      ro.disconnect();
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Sync speed refs if prop changes at runtime
  useEffect(() => {
    curSpeed.current    = speed;
    targetSpeed.current = speed;
  }, [speed]);

  const onEnter = useCallback(() => { targetSpeed.current = HOVER_SPEED; }, []);
  const onLeave = useCallback(() => { targetSpeed.current = speed; }, [speed]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(59,130,246,0.25) 30%, rgba(59,130,246,0.25) 70%, transparent)",
        }}
      />

      <div className="pt-8 pb-10" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <p className="mb-8 select-none text-center text-xs uppercase tracking-widest text-muted">
          Trusted by teams at
        </p>

        <div className="relative">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{ background: "linear-gradient(to right, #0A0F1C, transparent)" }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style={{ background: "linear-gradient(to left, #0A0F1C, transparent)" }}
          />

          {/* Track — translated by the RAF loop */}
          <div
            ref={trackRef}
            aria-hidden="true"
            className="flex"
            style={{ willChange: "transform" }}
          >
            {track.map((logo, i) => (
              <span
                key={i}
                className={[
                  "mx-10 flex-shrink-0 select-none tracking-tight",
                  "text-slate-500 transition-colors duration-300 hover:text-slate-300",
                  logo.weight,
                  logo.size,
                ].join(" ")}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }}
      />
    </div>
  );
}

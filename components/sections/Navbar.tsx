"use client";

import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "FAQ",      href: "#faq"      },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Blur bg once user scrolls past 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/8 bg-navy/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12 lg:px-20"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <a
            href="#"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-md"
            aria-label="LaunchFlow home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15">
              <Zap size={15} className="text-accent" fill="currentColor" />
            </span>
            <span className="font-heading text-base font-bold text-warm-white tracking-tight">
              LaunchFlow
            </span>
          </a>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-muted transition-colors duration-150",
                    "hover:text-warm-white",
                    "focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent/60"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <a
              href="#waitlist"
              className={cn(
                "inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white",
                "shadow-[0_0_16px_-4px_rgba(59,130,246,0.5)]",
                "transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_22px_-4px_rgba(59,130,246,0.7)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                "active:scale-[0.97]"
              )}
            >
              Join Waitlist
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg md:hidden",
              "text-muted transition-colors hover:text-warm-white hover:bg-white/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            )}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            "fixed inset-0 top-16 z-40 flex flex-col md:hidden",
            "bg-navy/95 backdrop-blur-xl"
          )}
        >
          <ul
            className="flex flex-col gap-1 px-6 pt-6"
            role="list"
            onClick={closeMenu}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "flex w-full items-center rounded-xl px-4 py-3.5 text-base font-medium",
                    "text-muted transition-colors hover:bg-white/5 hover:text-warm-white"
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="px-6 pt-4">
            <a
              href="#waitlist"
              onClick={closeMenu}
              className={cn(
                "flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white",
                "shadow-[0_0_20px_-4px_rgba(59,130,246,0.5)]",
                "hover:bg-accent-hover"
              )}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </>
  );
}

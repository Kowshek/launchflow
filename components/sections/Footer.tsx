const links = [
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/8 px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-400">
          © 2026 LaunchFlow. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={[
                "text-sm text-slate-400 transition-colors duration-150",
                "hover:text-warm-white",
                "focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
              ].join(" ")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

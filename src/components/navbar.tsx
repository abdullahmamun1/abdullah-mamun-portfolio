"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#education", label: "education" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3 md:px-10">
        <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-2.5 w-2.5 border border-[var(--muted)]" />
          <span className="h-2.5 w-2.5 border border-[var(--muted)]" />
          <span className="h-2.5 w-2.5" style={{ background: "var(--accent)" }} />
        </div>

        <motion.a
          href="#top"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-sm font-medium tracking-tight text-[var(--text)]"
        >
          {profile.initials.toLowerCase()}@sust
          <span className="text-[var(--muted)]">:~$</span>
          <span className="cursor-blink" aria-hidden="true" />
        </motion.a>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-sm transition-colors ${
                active === link.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--accent)]"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 border"
                  style={{ borderColor: "var(--accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)]">
                [{i + 1}]
              </span>
              <span className="relative z-10">{link.label}</span>
            </motion.a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--text)] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-1 py-2 font-mono text-sm transition-colors ${
                    active === link.href ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span className="text-[10px]">[{i + 1}]</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

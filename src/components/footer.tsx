"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="section-border mx-auto max-w-6xl px-6 py-8 md:px-10">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind.
        </p>
        <p className="font-mono text-xs text-[var(--muted)]">
          <motion.a
            href="#top"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="inline-block transition-colors hover:text-[var(--accent)]"
          >
            cd ~ ↑
          </motion.a>
        </p>
      </div>
    </footer>
  );
}

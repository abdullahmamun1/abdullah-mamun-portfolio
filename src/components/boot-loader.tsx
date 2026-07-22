"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LINES = [
  "> boot sequence initiated",
  "[ok] loading kernel modules",
  "[ok] mounting /home/abdullah",
  "[ok] starting display server",
  "[ok] connecting to sust.edu.bd ... done",
  "$ whoami",
  "abdullah_mamun",
];

/**
 * Full-screen terminal boot log shown once per page load. Plays every time
 * the page mounts (first visit and hard reloads alike) — there's no
 * persistence gate, since the whole point is a "the machine is turning on"
 * moment, not a one-time tutorial. Any keypress/click skips straight to the
 * exit.
 *
 * Renders null until `mounted` flips true (matching SSR, which never knows
 * the real reduced-motion preference) so the reduced/full-motion branch only
 * ever diverges after hydration — never in a way React has to reconcile.
 */
export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && reduce) {
      onComplete();
    }
    // onComplete is stable from the caller's perspective for the lifetime of this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, reduce]);

  useEffect(() => {
    if (!mounted || reduce) return;
    if (lineCount >= LINES.length) {
      const t = setTimeout(() => setVisible(false), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineCount((n) => n + 1), lineCount === 0 ? 220 : 140);
    return () => clearTimeout(t);
  }, [lineCount, mounted, reduce]);

  useEffect(() => {
    if (!mounted || reduce) return;
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [mounted, reduce]);

  if (!mounted || reduce) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.84, 0] }}
          style={{ transformOrigin: "center", background: "var(--bg)" }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
        >
          <div className="w-full max-w-md">
            <div className="mb-6 h-[2px] w-full bg-[var(--surface-2)]">
              <motion.div
                className="h-full"
                style={{ background: "var(--accent)" }}
                animate={{ width: `${(lineCount / LINES.length) * 100}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            <div className="font-mono text-sm text-[var(--muted)]">
              {LINES.slice(0, lineCount).map((line, i) => (
                <p
                  key={i}
                  className={i === LINES.length - 1 ? "text-[var(--accent)]" : undefined}
                >
                  {line}
                </p>
              ))}
              {lineCount > 0 && <span className="cursor-blink" aria-hidden="true" />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

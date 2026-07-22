"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left"
      style={{
        scaleX,
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--glow-accent)",
      }}
    />
  );
}

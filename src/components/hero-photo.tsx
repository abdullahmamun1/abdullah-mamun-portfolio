"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { TerminalFrame } from "./terminal-frame";

export function HeroPhoto() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20, mass: 0.6 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(py * -14);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md xl:max-w-lg"
      animate={{ y: reduce ? 0 : [0, -10, 0] }}
      transition={{ duration: reduce ? 0 : 6, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
    >
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
      >
        <TerminalFrame label="me.png — 100%" glow ticks>
          <div className="relative aspect-[4/5] w-full">
            {profile.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 90vw"
                className="object-cover grayscale-[15%]"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: "var(--surface-2)" }}
              >
                <span className="font-display text-7xl text-[var(--accent)]">
                  {profile.initials}
                </span>
              </div>
            )}
          </div>
        </TerminalFrame>
      </motion.div>

      <div
        className="card absolute -bottom-6 -left-6 hidden items-center gap-2 px-4 py-3 backdrop-blur-md sm:flex"
        style={{ background: "color-mix(in srgb, var(--surface) 90%, transparent)" }}
      >
        <span
          className="h-2 w-2 shrink-0 animate-pulse"
          style={{ background: "var(--accent-2)", boxShadow: "0 0 8px var(--accent-2)" }}
          aria-hidden="true"
        />
        <p className="font-mono text-xs text-[var(--text)]">open to remote roles</p>
      </div>
    </motion.div>
  );
}

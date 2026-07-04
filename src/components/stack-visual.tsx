"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type MouseEvent } from "react";

const layers = [
  { label: "UI", sub: "React · Next.js", glow: "var(--cyan)" },
  { label: "API", sub: "Node · Express", glow: "var(--indigo)" },
  { label: "DATA", sub: "Postgres · Mongo", glow: "var(--magenta)" },
];

// Position/scale/opacity per distance from the active (front) card.
// distance 0 = front and fully readable, higher = further back in the fan.
const depths = [
  { tx: 0, ty: 0, tz: 90, scale: 1, opacity: 1 },
  { tx: 60, ty: -52, tz: 10, scale: 0.93, opacity: 0.65 },
  { tx: 120, ty: -104, tz: -60, scale: 0.86, opacity: 0.4 },
];

export function StackVisual() {
  const [active, setActive] = useState(2); // DATA in front by default

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 120, damping: 16 });
  const springY = useSpring(rotY, { stiffness: 120, damping: 16 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 10);
    rotX.set(-py * 10);
  }

  function handleMouseLeave() {
    rotX.set(0);
    rotY.set(0);
  }

  return (
    <div className="mx-auto w-full max-w-md select-none xl:max-w-lg">
      <div
        className="relative h-[400px] w-full [perspective:1200px] sm:h-[440px] xl:h-[480px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{ rotateX: springX, rotateY: springY }}
        >
          {layers.map((layer, i) => {
            const distance = (i - active + layers.length) % layers.length;
            const d = depths[distance];
            return (
              <motion.button
                key={layer.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={distance === 0}
                aria-label={`Bring ${layer.label} layer to front`}
                className="absolute left-1/2 top-1/2 flex h-36 w-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left backdrop-blur-sm sm:h-40 sm:w-72 xl:h-44 xl:w-80"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--surface) 92%, transparent), color-mix(in srgb, var(--surface-2) 78%, transparent))",
                  boxShadow:
                    distance === 0
                      ? `0 20px 60px -16px color-mix(in srgb, ${layer.glow} 55%, transparent)`
                      : `0 10px 30px -18px color-mix(in srgb, ${layer.glow} 35%, transparent)`,
                  zIndex: 30 - distance * 10,
                  x: d.tx,
                  z: d.tz,
                }}
                animate={{ y: d.ty, scale: d.scale, opacity: d.opacity }}
                initial={false}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={distance !== 0 ? { opacity: Math.min(d.opacity + 0.2, 1) } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-[var(--muted)]">
                    0{i + 1}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: layer.glow }}
                  />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-[var(--text)]">
                    {layer.label}
                  </p>
                  <p className="font-mono text-xs text-[var(--muted)]">{layer.sub}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-[var(--muted)]">
        tap a layer to bring it forward
      </p>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/profile";
import { skillIcons } from "./skill-icon";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 22 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(py * -8);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="card glow-ring group flex h-full flex-col overflow-hidden"
      >
        <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-[var(--border)]">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--surface-2)" }}
            >
              <span className="font-mono text-xs text-[var(--muted)]">
                0{index + 1} / image placeholder
              </span>
            </div>
          )}
          <span className="absolute left-3 top-3 border border-[var(--border)] bg-[var(--surface)]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--accent)] backdrop-blur-sm">
            {project.kind}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-display text-xl text-[var(--text)]">
            {project.name}
          </p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => {
              const entry = skillIcons[tech];
              const Icon = entry?.Icon;
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1 border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]"
                >
                  {Icon && <Icon size={11} style={{ color: entry?.color }} />}
                  {tech}
                </span>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-1 font-mono text-sm text-[var(--accent)] transition-transform group-hover:translate-x-1">
            view details
            <ArrowUpRight size={15} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

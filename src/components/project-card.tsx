import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/profile";
import { skillIcons } from "./skill-icon";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card glow-ring group flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1"
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
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--indigo) 22%, transparent), color-mix(in srgb, var(--cyan) 18%, transparent))",
            }}
          >
            <span className="font-mono text-xs text-[var(--muted)]">
              0{index + 1} / image placeholder
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--cyan)] backdrop-blur-sm">
          {project.kind}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-lg font-medium text-[var(--text)]">
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
                className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]"
              >
                {Icon && <Icon size={11} style={{ color: entry?.color }} />}
                {tech}
              </span>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-1 font-mono text-sm text-[var(--indigo)] transition-transform group-hover:translate-x-1">
          View details
          <ArrowUpRight size={15} />
        </div>
      </div>
    </Link>
  );
}

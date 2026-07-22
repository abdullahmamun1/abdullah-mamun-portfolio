import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, FileText, TriangleAlert, Rocket } from "lucide-react";
import { projects } from "@/data/profile";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { skillIcons } from "@/components/skill-icon";
import { TerminalFrame } from "@/components/terminal-frame";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} — Project details`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

const infoBlocks = (project: (typeof projects)[number]) => [
  {
    key: "description",
    icon: FileText,
    prefix: "//",
    label: "description",
    content: project.description,
  },
  {
    key: "challenges",
    icon: TriangleAlert,
    prefix: "!",
    label: "challenges",
    content: project.challenges,
  },
  {
    key: "improvements",
    icon: Rocket,
    prefix: "->",
    label: "next up",
    content: project.improvements,
  },
];

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-14 md:px-10 md:pt-20">
          <Reveal>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 font-mono text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              back to projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8">
              <TerminalFrame
                label={project.imageUrl ? project.imageUrl.split("/").pop() ?? project.slug : `${project.slug}.png`}
                glow
              >
                <div className="relative h-64 sm:h-80 lg:h-96">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 900px, 90vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <span className="font-mono text-xs text-[var(--muted)]">
                        0{index + 1} / project image placeholder
                      </span>
                    </div>
                  )}
                </div>
              </TerminalFrame>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="eyebrow">
                <span className="bracket">[ 0{index + 1} ]</span> project
              </p>
              <span className="border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--accent)]">
                {project.kind}
              </span>
            </div>
            <h1 className="mt-2 font-display text-glow text-4xl tracking-tight text-[var(--text)] sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-6">
              <p className="font-mono text-xs text-[var(--muted)]">$ stack --list</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => {
                  const entry = skillIcons[tech];
                  const Icon = entry?.Icon;
                  const color = entry?.color ?? "currentColor";
                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--text)]"
                    >
                      {Icon && (
                        <span style={{ color }} className="flex items-center justify-center">
                          <Icon size={14} />
                        </span>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={project.liveUrl || "#"}
                target={project.liveUrl ? "_blank" : undefined}
                rel="noreferrer"
                aria-disabled={!project.liveUrl}
                className="flex items-center gap-2 border px-5 py-2.5 font-mono text-sm font-medium transition-all hover:-translate-y-1 hover:bg-[var(--accent-soft)] active:scale-95"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  opacity: project.liveUrl ? 1 : 0.55,
                }}
              >
                <ExternalLink size={15} />
                {project.liveUrl ? "live project" : "live link coming soon"}
              </a>
              <a
                href={project.githubUrl || "#"}
                target={project.githubUrl ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-2 border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
                style={{ opacity: project.githubUrl ? 1 : 0.55 }}
              >
                <Github size={15} />
                {project.githubUrl ? "client repo (github)" : "repo coming soon"}
              </a>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {infoBlocks(project).map((block, i) => (
              <Reveal key={block.key} delay={0.05 * i}>
                <div className="card glow-ring h-full p-6 transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center border"
                      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
                    >
                      <block.icon size={15} style={{ color: "var(--accent)" }} />
                    </span>
                    <p className="eyebrow">
                      <span className="bracket">{block.prefix}</span> {block.label}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {block.content}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, FileText, TriangleAlert, Rocket } from "lucide-react";
import { projects } from "@/data/profile";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { skillIcons } from "@/components/skill-icon";
import { CHIP_CLIP } from "@/lib/shapes";

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
  return { title: project ? `${project.name} — Project details` : "Project not found" };
}

const infoBlocks = (project: (typeof projects)[number]) => [
  {
    key: "description",
    icon: FileText,
    prefix: "//",
    label: "description",
    accent: "var(--cyan)",
    content: project.description,
  },
  {
    key: "challenges",
    icon: TriangleAlert,
    prefix: "!",
    label: "challenges",
    accent: "var(--indigo)",
    content: project.challenges,
  },
  {
    key: "improvements",
    icon: Rocket,
    prefix: "→",
    label: "next up",
    accent: "var(--magenta)",
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
              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--muted)] transition-colors hover:text-[var(--cyan)]"
            >
              <ArrowLeft size={15} />
              back to projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative mt-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 opacity-40 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--indigo), var(--cyan) 55%, var(--magenta))",
                  clipPath: CHIP_CLIP,
                }}
              />
              <div
                className="relative flex h-64 items-center justify-center overflow-hidden sm:h-80 lg:h-96"
                style={{
                  clipPath: CHIP_CLIP,
                  border: "1px solid var(--border)",
                  background: project.imageUrl
                    ? undefined
                    : "linear-gradient(135deg, color-mix(in srgb, var(--indigo) 22%, transparent), color-mix(in srgb, var(--cyan) 18%, transparent))",
                }}
              >
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
                  <span className="font-mono text-xs text-[var(--muted)]">
                    0{index + 1} / project image placeholder
                  </span>
                )}
              </div>
              <span
                className="absolute left-[3%] top-[6%] h-2.5 w-2.5 rounded-full"
                style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }}
                aria-hidden="true"
              />
              <span
                className="absolute bottom-[6%] right-[3%] h-2.5 w-2.5 rounded-full"
                style={{ background: "var(--magenta)", boxShadow: "0 0 12px var(--magenta)" }}
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="eyebrow" data-prefix={`0${index + 1}`}>
                project
              </p>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--cyan)]">
                {project.kind}
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-6">
              <p className="font-mono text-xs text-[var(--muted)]">$ stack --list</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {project.stack.map((tech) => {
                  const entry = skillIcons[tech];
                  const Icon = entry?.Icon;
                  const color = entry?.color ?? "currentColor";
                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--text)]"
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
                className="glow-ring flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, var(--indigo), var(--cyan))",
                  opacity: project.liveUrl ? 1 : 0.55,
                }}
              >
                <ExternalLink size={15} />
                {project.liveUrl ? "Live project" : "Live link coming soon"}
              </a>
              <a
                href={project.githubUrl || "#"}
                target={project.githubUrl ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                style={{ opacity: project.githubUrl ? 1 : 0.55 }}
              >
                <Github size={15} />
                {project.githubUrl ? "Client repo (GitHub)" : "Repo coming soon"}
              </a>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {infoBlocks(project).map((block, i) => (
              <Reveal key={block.key} delay={0.05 * i}>
                <div className="card glow-ring h-full p-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ background: `color-mix(in srgb, ${block.accent} 18%, transparent)` }}
                    >
                      <block.icon size={15} style={{ color: block.accent }} />
                    </span>
                    <p className="eyebrow" data-prefix={block.prefix}>
                      {block.label}
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

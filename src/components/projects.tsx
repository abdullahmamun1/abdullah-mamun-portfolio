import { projects } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section
      id="projects"
      className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <SectionHeading
          prefix=">"
          eyebrow="projects/"
          title="Selected work"
          description="Placeholders below — swap in your real projects, images, and links in src/data/profile.ts."
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

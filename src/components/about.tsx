import { about } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHeading prefix="01" eyebrow="about-me" title="A bit about who I am" />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <Reveal delay={0.05} className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card glow-ring flex flex-col gap-6 p-6 transition-shadow">
            {about.highlights.map((h) => (
              <div key={h.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                  {h.label}
                </p>
                <p className="mt-1 font-display text-xl text-[var(--text)]">
                  {h.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

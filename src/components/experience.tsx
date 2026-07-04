import { experience } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <SectionHeading prefix="~/" eyebrow="experience" title="Where I've worked" />
      </Reveal>

      {experience.length === 0 ? (
        <Reveal delay={0.05}>
          <div className="card p-8">
            <p className="font-mono text-sm text-[var(--cyan)]">no formal roles yet</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              No professional job experience yet — but 4 years of hands-on,
              self-directed coding and development across personal and academic
              projects. This section will fill in as internships and roles come in.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-6">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.org} delay={i * 0.06}>
              <div className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-medium text-[var(--text)]">
                    {item.role} · {item.org}
                  </p>
                  <p className="font-mono text-sm text-[var(--muted)]">{item.period}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

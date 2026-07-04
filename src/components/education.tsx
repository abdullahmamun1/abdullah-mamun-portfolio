import { education } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section
      id="education"
      className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <SectionHeading prefix="~/" eyebrow="education" title="Academic background" />
      </Reveal>

      <div className="space-y-0">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={i * 0.06}>
            <div className="flex flex-col gap-2 border-l-2 border-[var(--border)] py-6 pl-6 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="font-display text-lg font-medium text-[var(--text)]">
                  {item.degree}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.school}</p>
                <p className="mt-1 font-mono text-xs text-[var(--cyan)]">{item.detail}</p>
              </div>
              <p className="font-mono text-sm text-[var(--muted)] sm:text-right">
                {item.period}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

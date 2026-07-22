export function SectionHeading({
  prefix,
  eyebrow,
  title,
  description,
}: {
  prefix: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="eyebrow">
        <span className="bracket">[ {prefix} ]</span> {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-glow text-4xl tracking-tight text-[var(--text)] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}
    </div>
  );
}

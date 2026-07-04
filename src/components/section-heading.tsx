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
      <p className="eyebrow" data-prefix={prefix}>
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
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

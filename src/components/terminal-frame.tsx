import type { ReactNode } from "react";

/**
 * Window-chrome frame: title bar with status dots + label, scanline sweep
 * over the content area. Used anywhere a photo/screenshot needs to read as
 * "displayed on a terminal" rather than a plain rounded image card.
 */
export function TerminalFrame({
  label,
  children,
  glow = false,
  ticks = false,
  className,
}: {
  label: string;
  children: ReactNode;
  glow?: boolean;
  ticks?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 opacity-40 blur-2xl"
          style={{ background: "var(--accent)" }}
        />
      )}

      <div
        className="relative border"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          boxShadow: "0 30px 80px -30px var(--glow-accent)",
        }}
      >
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-3 py-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 border border-[var(--muted)]" />
            <span className="h-2 w-2 border border-[var(--muted)]" />
            <span className="h-2 w-2" style={{ background: "var(--accent)" }} />
          </div>
          <p className="flex-1 truncate text-center font-mono text-[11px] text-[var(--muted)]">
            {label}
          </p>
          <div className="w-[42px]" aria-hidden="true" />
        </div>

        <div className="relative overflow-hidden">
          {children}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)",
            }}
          />
        </div>
      </div>

      {ticks && (
        <>
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2"
            style={{ borderColor: "var(--accent)" }}
          />
        </>
      )}
    </div>
  );
}

import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="section-border mx-auto max-w-6xl px-6 py-8 md:px-10">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind.
        </p>
        <p className="font-mono text-xs text-[var(--muted)]">
          <a href="#top" className="transition-colors hover:text-[var(--cyan)]">
            back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}

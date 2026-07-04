import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <p className="font-mono text-sm text-[var(--cyan)]">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--text)]">
          Project not found
        </h1>
        <p className="mt-3 max-w-sm text-[var(--muted)]">
          This project doesn&apos;t exist yet, or the link has moved.
        </p>
        <Link
          href="/#projects"
          className="mt-8 rounded-full border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
        >
          back to projects
        </Link>
      </main>
      <Footer />
    </>
  );
}

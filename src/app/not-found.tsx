import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <p className="font-mono text-sm text-[var(--accent)]">$ cat 404.log</p>
        <h1 className="mt-3 font-display text-glow text-6xl text-[var(--text)]">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm text-[var(--muted)]">
          This page doesn&apos;t exist, or the link has moved.
        </p>
        <Link
          href="/"
          className="mt-8 border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}

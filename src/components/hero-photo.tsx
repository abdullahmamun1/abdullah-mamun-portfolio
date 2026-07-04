import Image from "next/image";
import { profile } from "@/data/profile";
import { CHIP_CLIP } from "@/lib/shapes";

export function HeroPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-md xl:max-w-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 opacity-60 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, var(--indigo), var(--cyan) 55%, var(--magenta))",
          clipPath: CHIP_CLIP,
        }}
      />

      <div
        className="relative aspect-[4/5] w-full"
        style={{
          clipPath: CHIP_CLIP,
          border: "1px solid var(--border)",
          boxShadow: "0 30px 80px -30px var(--glow-indigo)",
        }}
      >
        {profile.photoUrl ? (
          <Image
            src={profile.photoUrl}
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--indigo), var(--cyan) 60%, var(--magenta))",
            }}
          >
            <span className="font-display text-6xl font-semibold text-white/90">
              {profile.initials}
            </span>
          </div>
        )}
      </div>

      {/* small "solder pad" accents at the cut corners, echoing the site's mono/circuit motif */}
      <span
        className="absolute left-[6%] top-[6%] h-2.5 w-2.5 rounded-full"
        style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-[6%] right-[6%] h-2.5 w-2.5 rounded-full"
        style={{ background: "var(--magenta)", boxShadow: "0 0 12px var(--magenta)" }}
        aria-hidden="true"
      />

      <div
        className="card absolute -bottom-6 -left-6 hidden p-4 backdrop-blur-md sm:block"
        style={{ background: "color-mix(in srgb, var(--surface) 85%, transparent)" }}
      >
        <p className="font-mono text-xs text-[var(--cyan)]">$ status</p>
        <p className="mt-1 font-display text-sm font-medium text-[var(--text)]">
          Open to remote roles
        </p>
      </div>
    </div>
  );
}

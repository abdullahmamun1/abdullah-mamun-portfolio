import Image from "next/image";
import { profile } from "@/data/profile";

export function Avatar({ size = 96 }: { size?: number }) {
  if (profile.photoUrl) {
    return (
      <Image
        src={profile.photoUrl}
        alt={profile.name}
        width={size}
        height={size}
        className="rounded-full border border-[var(--border)] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full border border-[var(--border)] font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background:
          "linear-gradient(135deg, var(--indigo), var(--cyan) 60%, var(--magenta))",
      }}
      aria-label={profile.name}
      role="img"
    >
      {profile.initials}
    </div>
  );
}

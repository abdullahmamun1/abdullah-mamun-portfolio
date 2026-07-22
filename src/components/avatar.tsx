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
        className="border object-cover"
        style={{ width: size, height: size, borderColor: "var(--border)" }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center border font-display text-[var(--accent)]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        borderColor: "var(--border)",
        background: "var(--surface-2)",
      }}
      aria-label={profile.name}
      role="img"
    >
      {profile.initials}
    </div>
  );
}

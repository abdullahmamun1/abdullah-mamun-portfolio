"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Facebook, Twitter } from "lucide-react";
import { profile } from "@/data/profile";
import { Avatar } from "./avatar";
import { HeroPhoto } from "./hero-photo";

const socialLinks = [
  { href: profile.social.github, label: "GitHub", Icon: Github },
  { href: profile.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.social.facebook, label: "Facebook", Icon: Facebook },
  { href: profile.social.twitter, label: "X / Twitter", Icon: Twitter },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative grid w-full min-h-[calc(100dvh-4.5rem)] content-center gap-14 overflow-hidden px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-20 lg:px-16 xl:px-24 2xl:px-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--indigo)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--cyan)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="mb-6 flex items-center gap-4">
          <Avatar size={64} />
          <div>
            <p className="eyebrow" data-prefix="$">
              whoami
            </p>
            <p className="font-mono text-sm text-[var(--muted)]">{profile.location}</p>
          </div>
        </div>

        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-mono text-lg text-[var(--indigo)] sm:text-xl">
          {profile.designation}
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={profile.resumeUrl || "#contact"}
            download={Boolean(profile.resumeUrl)}
            className="glow-ring flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--indigo), var(--cyan))",
            }}
          >
            <Download size={16} />
            {profile.resumeUrl ? "Download resume" : "Resume coming soon"}
          </a>

          <a
            href="#projects"
            className="rounded-full border border-[var(--border)] px-6 py-3 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            View projects
          </a>
        </div>

        <div className="mt-9 flex items-center gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative z-10"
      >
        <HeroPhoto />
      </motion.div>
    </section>
  );
}

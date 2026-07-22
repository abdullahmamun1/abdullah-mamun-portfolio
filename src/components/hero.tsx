"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";
import { Download, Github, Linkedin, Facebook, Twitter } from "lucide-react";
import { profile } from "@/data/profile";
import { Avatar } from "./avatar";
import { HeroPhoto } from "./hero-photo";
import { BootLoader } from "./boot-loader";

const socialLinks = [
  { href: profile.social.github, label: "GitHub", Icon: Github },
  { href: profile.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.social.facebook, label: "Facebook", Icon: Facebook },
  { href: profile.social.twitter, label: "X / Twitter", Icon: Twitter },
];

const typedStyle = {
  "--tw-chars": profile.designation.length,
  "--tw-full": `${profile.designation.length}ch`,
} as CSSProperties;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 140, damping: 18 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blobY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative grid w-full min-h-[calc(100dvh-3.5rem)] content-center gap-14 overflow-hidden px-6 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-20 lg:px-16 xl:px-24 2xl:px-32"
    >
      <BootLoader onComplete={() => setReady(true)} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full opacity-[0.12] blur-[100px]"
        style={{ background: "var(--accent)", y: blobY }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        style={{ opacity: reduce ? 1 : fade }}
        className="relative z-10"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-4">
          <Avatar size={56} />
          <div>
            <p className="eyebrow">
              <span className="bracket">[ 00 ]</span> whoami
            </p>
            <p className="mt-0.5 font-mono text-sm text-[var(--muted)]">{profile.location}</p>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-glow text-6xl leading-[0.95] tracking-tight text-[var(--text)] sm:text-7xl lg:text-8xl"
        >
          {profile.name}
          <span className="cursor-blink" aria-hidden="true" />
        </motion.h1>

        <motion.p variants={item} className="mt-3 font-mono text-lg text-[var(--accent)] sm:text-xl">
          {ready && (
            <span className="typewriter" style={typedStyle}>
              {profile.designation}
            </span>
          )}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <motion.a
            href={profile.resumeUrl || "#contact"}
            download={Boolean(profile.resumeUrl)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 border px-6 py-3 font-mono text-sm font-medium transition-colors hover:bg-[var(--accent-soft)]"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            <Download size={16} />
            {profile.resumeUrl ? "./download-resume" : "resume --pending"}
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="border border-[var(--border)] px-6 py-3 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            cd ./projects
          </motion.a>
        </motion.div>

        <motion.div variants={item} className="mt-9 flex items-center gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -3, rotate: -6 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: reduce ? 0 : 0.15 }}
        style={{ y: photoY }}
        className="relative z-10"
      >
        <HeroPhoto />
      </motion.div>
    </section>
  );
}

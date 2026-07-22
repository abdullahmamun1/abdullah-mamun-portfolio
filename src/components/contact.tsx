"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

// Keep a leading "+" (valid in tel: links) but strip everything else non-digit,
// so reformatting the source number (dashes, parens, spaces) can't break these links.
const toDigits = (value: string) => value.replace(/(?!^\+)[^\d]/g, "");

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${toDigits(profile.phone)}`,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: profile.whatsapp,
    href: `https://wa.me/${toDigits(profile.whatsapp).replace(/^\+/, "")}`,
    Icon: MessageCircle,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <SectionHeading
          prefix="06"
          eyebrow="contact.send()"
          title="Let's build something together"
          description="Open to remote opportunities, collaborations, and interesting problems. Reach out through whichever channel works best for you."
        />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {channels.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 0.06}>
            <motion.a
              href={ch.href}
              target={ch.label === "WhatsApp" ? "_blank" : undefined}
              rel={ch.label === "WhatsApp" ? "noreferrer" : undefined}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card glow-ring group flex h-full flex-col gap-4 p-6"
            >
              <motion.span
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex h-10 w-10 items-center justify-center border"
                style={{ borderColor: "var(--accent)" }}
              >
                <ch.Icon size={17} style={{ color: "var(--accent)" }} />
              </motion.span>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  {ch.label}
                </p>
                <p className="mt-1 break-all font-display text-lg text-[var(--text)]">
                  {ch.value}
                </p>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 flex flex-wrap gap-4">
          <motion.a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Github size={16} /> GitHub
          </motion.a>
          <motion.a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Linkedin size={16} /> LinkedIn
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}

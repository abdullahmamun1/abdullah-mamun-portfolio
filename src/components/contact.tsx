import { Mail, Phone, MessageCircle, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

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
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: profile.whatsapp,
    href: `https://wa.me/${profile.whatsapp.replace(/[^\d]/g, "")}`,
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
          prefix="POST"
          eyebrow="contact.send()"
          title="Let's build something together"
          description="Open to remote opportunities, collaborations, and interesting problems. Reach out through whichever channel works best for you."
        />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {channels.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 0.06}>
            <a
              href={ch.href}
              target={ch.label === "WhatsApp" ? "_blank" : undefined}
              rel={ch.label === "WhatsApp" ? "noreferrer" : undefined}
              className="card glow-ring flex h-full flex-col gap-4 p-6 transition-transform hover:-translate-y-1"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--indigo), var(--cyan))",
                }}
              >
                <ch.Icon size={17} className="text-white" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  {ch.label}
                </p>
                <p className="mt-1 break-all font-display text-base font-medium text-[var(--text)]">
                  {ch.value}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text)] transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}

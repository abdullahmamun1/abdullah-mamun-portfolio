"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/profile";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { skillIcons } from "./skill-icon";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <section id="skills" className="section-border mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionHeading
          prefix="02"
          eyebrow="skills --list"
          title="Tools I build with"
          description="Grouped by where they sit in the stack — from languages to the databases underneath."
        />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="card glow-ring h-full p-6"
            >
              <p className="font-mono text-xs text-[var(--muted)]">$ {cat.prompt}</p>
              <p className="mt-1 font-display text-xl text-[var(--text)]">
                {cat.name}
              </p>

              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {cat.skills.map((skill) => {
                  const entry = skillIcons[skill];
                  const Icon = entry?.Icon;
                  const color = entry?.color ?? "currentColor";

                  return (
                    <motion.span
                      key={skill}
                      variants={chipVariants}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      className="flex cursor-default items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--text)] transition-colors hover:border-current"
                      style={{ color: entry ? color : undefined }}
                    >
                      {Icon && (
                        <span className="flex items-center justify-center">
                          <Icon size={14} />
                        </span>
                      )}
                      <span className="text-[var(--text)]">{skill}</span>
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

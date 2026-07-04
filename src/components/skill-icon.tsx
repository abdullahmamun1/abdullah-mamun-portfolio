import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiStripe,
  SiFirebase,
  SiJsonwebtokens,
} from "react-icons/si";

type IconEntry = {
  Icon: IconType;
  color?: string;
};

export const skillIcons: Record<string, IconEntry> = {
  C: { Icon: SiC, color: "#A8B9CC" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  Java: { Icon: SiOpenjdk, color: "#ED8B00" },
  Python: { Icon: SiPython, color: "#3776AB" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#663399" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  Bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "Express.js": { Icon: SiExpress },
  Prisma: { Icon: SiPrisma },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  Stripe: { Icon: SiStripe, color: "#635BFF" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  JWT: { Icon: SiJsonwebtokens },
};

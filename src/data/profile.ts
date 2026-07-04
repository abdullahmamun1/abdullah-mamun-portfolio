// ─────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit the values below — the rest of the site reads from here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdullah Mamun",
  initials: "AM",
  designation: "Full Stack Developer",
  location: "Sylhet, Bangladesh",
  tagline: "Building scalable, efficient, and user-focused web applications.",
  email: "hello.abdullahmamun1@gmail.com",
  phone: "+8801323874084",
  whatsapp: "+8801323874084",
  resumeUrl: "",
  social: {
    github: "https://github.com/abdullahmamun1",
    linkedin: "https://bd.linkedin.com/in/abdullahmaamun",
    facebook: "https://www.facebook.com/share/18DZn2sEu1/?mibextid=wwXIfr",
    twitter: "https://x.com/abdmaamun1",
  },

  photoUrl: "/me.png",
};

export const about = {
  paragraphs: [
    "Hi, I'm Abdullah Mamun, a Computer Science and Engineering student at Shahjalal University of Science & Technology (SUST), Sylhet, currently in my 3rd year (2nd semester). I am a passionate Full Stack Developer with a strong interest in building scalable, efficient, and user-focused web applications.",
    "My technical skill set includes C, C++, Java, Python, JavaScript, React, Next.js, Node.js, Express.js, and modern frontend technologies like HTML, CSS, Tailwind CSS, and Bootstrap. I also have hands-on experience working with databases and development tools such as PostgreSQL, MySQL, MongoDB, Prisma, and Docker.",
    "I am particularly passionate about web development and backend engineering, where I enjoy designing clean architectures and solving complex technical problems. As a curious and detail-oriented problem solver, I enjoy diving deep into challenges and refining solutions until they are optimized and reliable.",
    "My goal is to grow into a professional Full Stack Developer or Software Engineer, contributing to impactful products and meaningful technologies. Beyond coding, I enjoy reading books, traveling, and gaming. I am always eager to learn, collaborate, and take on new challenges, and I am currently open to remote job opportunities.",
  ],
  highlights: [
    { label: "Focus", value: "Web & Backend Engineering" },
    { label: "Experience", value: "4 years coding" },
    { label: "Status", value: "Open to remote roles" },
  ],
};

export type SkillCategory = {
  name: string;
  prompt: string; // terminal-style label, e.g. "frontend --list"
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    prompt: "languages --list",
    skills: ["C", "C++", "Java", "Python", "JavaScript"],
  },
  {
    name: "Frontend",
    prompt: "frontend --list",
    skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    name: "Backend",
    prompt: "backend --list",
    skills: ["Node.js", "Express.js", "Prisma"],
  },
  {
    name: "Databases & Tools",
    prompt: "tools --list",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Docker"],
  },
];

export const education = [
  {
    school: "Shahjalal University of Science & Technology (SUST), Sylhet",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "3rd Year, 2nd Semester — Ongoing",
    detail: "Undergraduate coursework in CSE.",
  },
  {
    school: "Higher Secondary Certificate (HSC)",
    degree: "HSC",
    period: "Completed",
    detail: "GPA 5.00",
  },
  {
    school: "Secondary School Certificate (SSC)",
    degree: "SSC",
    period: "Completed",
    detail: "GPA 5.00",
  },
];

export const experience: {
  role: string;
  org: string;
  period: string;
  detail: string;
}[] = [
  // No formal job experience yet — 4 years of independent coding & development.
  // Add entries here once available, e.g.:
  // { role: "Frontend Intern", org: "Company", period: "2026", detail: "..." },
];

export type Project = {
  slug: string;
  name: string;
  kind: "Backend API" | "Demo Project";
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string;
  improvements: string;
  imageUrl: string;
};

export const projects: Project[] = [
  {
    slug: "devpulse",
    name: "DevPulse — Issue Tracker API",
    kind: "Backend API",
    summary:
      "A role-based REST API for software teams to report bugs, suggest features, and manage resolution workflows.",
    description:
      "DevPulse is an internal tech-issue and feature tracker built for engineering teams. It's a TypeScript + Express REST API backed by PostgreSQL (hosted on Neon), talking to the database with raw SQL tagged-template queries instead of an ORM. Contributors can create, view, and update their own issues, while maintainers get full control — updating any issue, changing status, or deleting reports. Every issue moves through an open → in_progress → resolved workflow, and the API supports filtering by status and type plus sorting by creation date. Auth is handled with JWT and bcrypt-hashed passwords, and every request is logged to file for traceability.",
    stack: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "JWT",
      "Docker",
    ],
    liveUrl: "https://devpulse-express-server.vercel.app/",
    githubUrl: "https://github.com/abdullahmamun1/devpulse-express-server",
    challenges:
      "Skipping an ORM in favor of raw SQL meant hand-writing every query and keeping the schema, types, and migrations in sync manually. The trickier part was enforcing role-based rules — contributors editing only their own issues, maintainers editing anything — correctly at the service layer, since the database itself has no concept of ownership rules beyond a foreign key.",
    improvements:
      "Add pagination and full-text search across issues, email notifications when an issue's status changes, and a lightweight maintainer dashboard for bulk-triaging open reports.",
    imageUrl: "/projects/devpulse-cover.png",
  },
  {
    slug: "prisma-press",
    name: "Prisma Press — Blogging Platform API",
    kind: "Backend API",
    summary:
      "A full-featured blogging platform API with posts, comments, admin moderation, and Stripe-powered subscriptions.",
    description:
      "Prisma Press is a RESTful blogging platform built with Express 5, TypeScript, and Prisma ORM over PostgreSQL. Users register, get a profile automatically, and can create, edit, and publish posts with tags, thumbnails, and view counts (tracked via transaction on each read). Comments support admin moderation with approve/reject states. Auth uses JWT access and refresh tokens delivered as httpOnly cookies, with the refresh token rotating a fresh access token so the client never has to handle raw tokens. It also includes a working Stripe integration — checkout sessions, webhook-verified payment events, and a subscription status endpoint tied to each user's account.",
    stack: [
      "TypeScript",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "JWT",
    ],
    liveUrl: "https://project-prisma-press.vercel.app/",
    githubUrl: "https://github.com/abdullahmamun1/project-prisma-press",
    challenges:
      "Keeping local subscription state in sync with Stripe's webhook events was the hardest part — the database has to reflect whatever Stripe says happened (payment succeeded, subscription renewed or cancelled) without a race condition if a user checks their status right after paying. Designing the refresh-token rotation so expired access tokens renew silently via httpOnly cookies, without ever exposing a token to client-side JavaScript, took a few iterations to get right.",
    improvements:
      "Add full-text search and tag-based filtering across posts, a public analytics endpoint so authors can track their own post performance, and rate limiting on the comment endpoints.",
    imageUrl: "/projects/prisma-press-cover.png",
  },
  {
    slug: "smart-medicare",
    name: "Smart MediCare — Healthcare Website (Demo Project)",
    kind: "Demo Project",
    summary:
      "A responsive healthcare service platform with Firebase authentication, expert doctor listings, and service pages.",
    description:
      "Smart MediCare is a healthcare service website built with React and styled with Tailwind CSS and Bootstrap. Visitors can browse services and expert doctors (driven by JSON data), and Firebase Authentication protects the pricing, contact, and service-detail pages behind login/registration via React Router private routes. It's an earlier, front-end-only project — kept here as a demo of UI work and client-side auth flows rather than a production backend.",
    stack: ["React", "Firebase", "Bootstrap", "Tailwind CSS"],
    liveUrl: "https://health-care-website-55917.web.app/",
    githubUrl: "https://github.com/abdullahmamun1/Healthcare-website",
    challenges:
      "Wiring Firebase Authentication into React Router's private routes so unauthenticated visitors got redirected to login before reaching protected pages, while keeping all service and expert data driven by static JSON rather than a real backend.",
    improvements:
      "Replace the static JSON data with a real backend API, add appointment booking with live calendar availability, and refresh the UI to match current design standards.",
    imageUrl: "/projects/smart-medicare-cover.png",
  },
];

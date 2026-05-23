import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { CurvedArrow } from "@/components/CurvedArrow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "joshua — junior web developer" },
      {
        name: "description",
        content:
          "Portfolio of Joshua, a junior web developer building clean, modern web experiences.",
      },
      { property: "og:title", content: "joshua — junior web developer" },
      {
        property: "og:description",
        content: "Portfolio of Joshua, a junior web developer.",
      },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

const projects = [
  {
    title: "Sundial",
    tag: "Web App · 2025",
    blurb:
      "A minimalist habit tracker built with React and a custom analytics layer.",
  },
  {
    title: "Field Notes",
    tag: "Marketing Site · 2025",
    blurb:
      "Editorial landing page for an independent writing studio. Type-first design.",
  },
  {
    title: "Northbound",
    tag: "E-commerce · 2024",
    blurb:
      "Headless storefront for a small outdoor brand, focused on speed and clarity.",
  },
];

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 right-0 left-0 z-50 flex justify-end px-6 py-6 sm:px-12 sm:py-8"
    >
      <ul className="flex gap-6 sm:gap-10 font-sans-ui text-sm font-bold tracking-[0.18em] lowercase text-black">
        {navLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="relative inline-block transition-opacity hover:opacity-60 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const arrowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const roleX = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const reveal = {
    hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center px-6 sm:px-12 lg:px-20"
    >
      <div className="w-full max-w-6xl">
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-mono-ui text-sm sm:text-base tracking-[0.35em] text-black"
        >
          hello world!
        </motion.p>

        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display mt-3 text-[18vw] leading-[0.95] text-black sm:text-[15vw] lg:text-[11rem]"
        >
          i am joshua.
        </motion.h1>

        <div className="relative mt-8 sm:mt-4 flex justify-end">
          <div className="relative flex items-end gap-4 sm:gap-6 pr-2 sm:pr-12">
            <motion.div
              style={{ y: arrowY }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="text-black"
            >
              <CurvedArrow className="h-20 w-20 sm:h-28 sm:w-28" />
            </motion.div>
            <motion.p
              style={{ x: roleX }}
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={4}
              className="font-sans-ui pb-2 text-sm sm:text-lg tracking-[0.25em] text-black"
            >
              junior web developer
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono-ui text-[10px] tracking-[0.3em] text-black/60">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-black/40"
          />
        </div>
      </motion.div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 py-28 sm:px-12 sm:py-36 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono-ui text-xs tracking-[0.35em] text-black/60">
          {eyebrow}
        </p>
        <h2 className="font-display mt-4 text-5xl sm:text-7xl text-black">
          {title}
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </motion.section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="01 / work" title="projects.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden bg-black/[0.04] transition-colors duration-500 group-hover:bg-black/[0.08]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-7xl text-black/15 transition-transform duration-700 group-hover:scale-110">
                  0{i + 1}
                </span>
              </div>
            </div>
            <p className="font-mono-ui mt-5 text-[10px] tracking-[0.3em] text-black/60">
              {p.tag}
            </p>
            <h3 className="font-sans-ui mt-2 text-xl font-semibold text-black">
              {p.title}
            </h3>
            <p className="font-sans-ui mt-2 text-sm leading-relaxed text-black/70">
              {p.blurb}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="02 / about" title="about.">
      <div className="grid gap-12 lg:grid-cols-5">
        <p className="font-sans-ui lg:col-span-3 text-xl leading-relaxed text-black/80">
          I'm Joshua — a junior web developer who likes quiet interfaces and
          honest typography. I spend my days writing React, refining details,
          and chasing the small moments where a page feels exactly right.
        </p>
        <ul className="font-sans-ui lg:col-span-2 space-y-3 text-sm text-black/70">
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">
              based in
            </span>
            <span>Lisbon, PT</span>
          </li>
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">
              focus
            </span>
            <span>React · TypeScript</span>
          </li>
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">
              status
            </span>
            <span>Open to work</span>
          </li>
        </ul>
      </div>
    </Section>
  );
}

function Contact() {
  const socials = [
    { label: "email", href: "mailto:hello@joshua.dev" },
    { label: "github", href: "https://github.com" },
    { label: "twitter", href: "https://twitter.com" },
    { label: "linkedin", href: "https://linkedin.com" },
  ];
  return (
    <Section id="contact" eyebrow="03 / say hi" title="contact.">
      <a
        href="mailto:hello@joshua.dev"
        className="font-display block text-5xl sm:text-7xl text-black underline decoration-1 underline-offset-[12px] transition-opacity hover:opacity-60"
      >
        hello@joshua.dev
      </a>
      <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 font-sans-ui text-sm font-bold tracking-[0.2em] lowercase">
        {socials.slice(1).map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="relative inline-block transition-opacity hover:opacity-60 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-mono-ui mt-24 text-[10px] tracking-[0.3em] text-black/40">
        © 2026 joshua — built with care.
      </p>
    </Section>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}

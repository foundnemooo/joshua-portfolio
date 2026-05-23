import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useAnimation,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { CurvedArrow } from "@/components/CurvedArrow";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import nemoPosFavicon from "@/files/nemoPOS/favicon.png?url";
import nemoPos01 from "@/files/nemoPOS/1.png?url";
import nemoPos02 from "@/files/nemoPOS/2.png?url";
import nemoPos03 from "@/files/nemoPOS/3.png?url";
import nemoPos04 from "@/files/nemoPOS/4.png?url";
import notifire01 from "@/files/notifire-phone/1.png?url";
import notifire02 from "@/files/notifire-phone/2.png?url";
import notifire03 from "@/files/notifire-phone/3.png?url";
import notifire04 from "@/files/notifire-phone/4.png?url";
import notifire05 from "@/files/notifire-phone/5.png?url";
import notifire06 from "@/files/notifire-phone/6.png?url";
import notifireLogo from "@/files/notifire-phone/notifire logo.jpg?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "joshua.dev" },
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

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

type Project = {
  title: string;
  tag: string;
  blurb: string;
  thumbnail?: string;
  screenshots: string[];
  screenshotLayout?: "desktop" | "phone";
};

const projects: Project[] = [ 
  {
    title: "NotiFire (Capstone)",
    tag: "Mobile App · 2024",
    blurb:
      "Developed IoT-based fire detection system connecting ESP32 to Firebase Realtime Database, and Implemented real-time push notifications via Firebase Cloud Messaging",
    thumbnail: notifireLogo,
    screenshots: [notifire01, notifire02, notifire03, notifire04, notifire05, notifire06],
    screenshotLayout: "phone",
  },
  {
    title: "Armi Vida's Mart",
    tag: "Point of Sale System · 2025",
    blurb: "A full-stack POS application developed using React and Supabase, featuring product management, sales processing, transaction records, and real-time database integration. Built with a clean user interface to support faster checkout, organized inventory tracking, and efficient store management.",
    thumbnail: nemoPosFavicon,
    screenshots: [nemoPos01, nemoPos02, nemoPos03, nemoPos04],
    screenshotLayout: "desktop",
  },
  {
    title: "TDIP (TESDA DNPO Integrated Portal)",
    tag: "Web App · 2025",
    blurb: "No Info Yet",
    screenshots: ["/projects/sundial-1.png", "/projects/sundial-2.png"],
    screenshotLayout: "desktop",
  },
  
];

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-5 sm:justify-end sm:px-12 sm:py-8"
    >
      <ul className="flex gap-5 font-sans-ui text-xs font-bold tracking-[0.18em] lowercase text-black sm:gap-10 sm:text-sm">
        {navLinks.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="relative inline-block transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-60 active:scale-[0.97] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-black after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.23,1,0.32,1)] hover:after:origin-left hover:after:scale-x-100"
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
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawRoleGroupY = useTransform(scrollYProgress, [0, 1], [0, 112]);
  const roleGroupY = useSpring(rawRoleGroupY, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });
  const roleGroupTransform = useMotionTemplate`translate3d(0, ${roleGroupY}px, 0)`;

  const reveal: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
    },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.72,
        ease: easeOut,
        delay: shouldReduceMotion ? 0 : 0.12 + i * 0.08,
      },
    }),
  };

  return (
    <section ref={ref} className="relative flex min-h-screen items-center px-6 sm:px-12 lg:px-20">
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

        <motion.div
          style={{ transform: shouldReduceMotion ? "none" : roleGroupTransform }}
          className="relative mt-8 sm:mt-4 flex justify-end will-change-transform"
        >
          <div className="relative flex items-end gap-4 sm:gap-6 pr-2 sm:pr-12">
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.52,
                delay: shouldReduceMotion ? 0 : 0.58,
                ease: easeOut,
              }}
              className="text-black"
            >
              <CurvedArrow className="h-20 w-20 sm:h-28 sm:w-28" />
            </motion.div>
            <motion.p
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={4}
              className="font-sans-ui pb-2 text-sm sm:text-lg tracking-[0.25em] text-black"
            >
              junior web developer
            </motion.p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.5,
          delay: shouldReduceMotion ? 0 : 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono-ui text-[10px] tracking-[0.3em] text-black/60">scroll</span>
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.45, repeat: Infinity, ease: easeInOut }}
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className="px-6 py-28 sm:px-12 sm:py-36 lg:px-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, ease: easeOut }}
        className="mx-auto max-w-6xl"
      >
        <p className="font-mono-ui text-xs tracking-[0.35em] text-black/60">{eyebrow}</p>
        <h2 className="font-display mt-4 text-5xl sm:text-7xl text-black">{title}</h2>
        <div className="mt-12">{children}</div>
      </motion.div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      animate={controls}
      viewport={{ once: false, amount: 0.32, margin: "0px 0px -12% 0px" }}
      onViewportEnter={() => controls.start("show")}
      onViewportLeave={() => controls.start("hidden")}
      whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      className="group cursor-pointer outline-none"
      onClick={() => onSelect(project)}
    >
      <div className="aspect-[4/5] overflow-hidden bg-black/[0.04] transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-black/[0.08] group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
        <div className="flex h-full w-full items-center justify-center">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="h-36 w-36 object-contain grayscale transition-[filter,transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] group-hover:grayscale-0 sm:h-44 sm:w-44"
            />
          ) : (
            <span className="font-display text-7xl text-black/15 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]">
              0{index + 1}
            </span>
          )}
        </div>
      </div>
      <p className="font-mono-ui mt-5 text-[10px] tracking-[0.3em] text-black/60">{project.tag}</p>
      <h3 className="font-sans-ui mt-2 text-xl font-semibold text-black">{project.title}</h3>
      <p className="font-sans-ui mt-2 text-sm leading-relaxed text-black/70">{project.blurb}</p>
    </motion.article>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <Section id="projects" eyebrow="01 / work" title="projects.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} onSelect={setSelectedProject} />
        ))}
      </div>
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
            setCarouselApi(null);
          }
        }}
      >
        <DialogContent className="grid h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-5xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-lg border-black/10 p-5 duration-200 data-[state=closed]:duration-150 sm:h-auto sm:max-h-[90vh] sm:w-[calc(100vw-2rem)] sm:p-6">
          {selectedProject ? (
            <>
              <DialogHeader className="w-full items-start space-y-2 border-b border-black/10 pb-4 pr-10 text-left sm:border-0 sm:pb-0">
                <DialogTitle className="w-full text-left font-sans-ui text-2xl leading-tight text-black sm:text-2xl">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="w-full max-w-none text-left font-sans-ui text-base leading-relaxed text-black/80 sm:max-w-3xl">
                  {selectedProject.blurb}
                </DialogDescription>
              </DialogHeader>
              <Carousel
                opts={{ loop: true, duration: 24 }}
                setApi={setCarouselApi}
                className="mt-4 grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3 sm:mt-4 sm:block"
              >
                <CarouselContent>
                  {selectedProject.screenshots.map((src, index) => (
                    <CarouselItem key={src}>
                      <div className="relative flex h-[calc(100dvh-18rem)] min-h-[240px] items-center justify-center overflow-hidden rounded-lg bg-black/[0.04] sm:aspect-video sm:h-auto sm:min-h-0">
                        <img
                          src={src}
                          alt={`${selectedProject.title} screenshot ${index + 1}`}
                          className={
                            selectedProject.screenshotLayout === "phone"
                              ? "absolute left-1/2 top-1/2 z-10 h-auto max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 rounded-md object-contain sm:inset-0 sm:h-full sm:w-full sm:max-h-none sm:translate-x-0 sm:translate-y-0"
                              : "absolute left-1/2 top-1/2 z-10 h-auto max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 rounded-md object-contain sm:inset-0 sm:h-full sm:w-full sm:max-h-none sm:translate-x-0 sm:translate-y-0"
                          }
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                          <span className="font-mono-ui text-xs tracking-[0.3em] text-black/40">
                            screenshot {index + 1}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-3 sm:pointer-events-none sm:absolute sm:inset-y-0 sm:left-3 sm:right-3 sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Previous screenshot"
                    onClick={() => carouselApi?.scrollPrev()}
                    className="h-10 w-10 rounded-full border-black/10 bg-white text-black shadow-sm transition-[background-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black hover:text-white active:scale-[0.97] sm:pointer-events-auto sm:h-8 sm:w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Next screenshot"
                    onClick={() => carouselApi?.scrollNext()}
                    className="h-10 w-10 rounded-full border-black/10 bg-white text-black shadow-sm transition-[background-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black hover:text-white active:scale-[0.97] sm:pointer-events-auto sm:h-8 sm:w-8"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Carousel>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

function About() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-80px" },
    transition: { duration: shouldReduceMotion ? 0.01 : 0.48, ease: easeOut },
  };

  const education = [
    {
      title: "Bachelor of Science in Information Technology",
      meta: "University of Mindanao Tagum College",
      date: "2021 - 2025",
    },
  ];

  const experience = [
    {
      title: "Frontend Developer Intern",
      meta: "AIMHI (Artificial Intelligence Meets Human Intelligence)",
      date: "Apr 2025 - Jul 2025",
    },
    {
      title: "Full Stack Web Developer",
      meta: "TESDA (Technical Education and Skills Development Authority)",
      date: "Mar 2026 - Present",
    },
  ];

  return (
    <Section id="about" eyebrow="02 / about" title="about.">
      <div className="grid gap-12 lg:grid-cols-5">
        <motion.p
          {...reveal}
          className="font-sans-ui lg:col-span-3 text-xl leading-relaxed text-black/80"
        >
          I'm Joshua — a junior web developer who loves to develop responsive websites that have{" "}
          <strong className="font-display text-3xl leading-none text-black sm:text-4xl">
            purpose
          </strong>
          .
        </motion.p>
        <motion.ul
          {...reveal}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.48,
            delay: shouldReduceMotion ? 0 : 0.06,
            ease: easeOut,
          }}
          className="font-sans-ui lg:col-span-2 space-y-3 text-sm text-black/70"
        >
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">based in</span>
            <span>Tagum City, Davao del Norte, Philippines</span>
          </li>
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">focus</span>
            <span>React · TypeScript</span>
          </li>
          <li className="flex justify-between border-b border-black/10 pb-3">
            <span className="tracking-[0.2em] uppercase text-black/50">status</span>
            <span>Open to work</span>
          </li>
        </motion.ul>
      </div>
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {[
          { label: "education", items: education },
          { label: "professional experience", items: experience },
        ].map((group, groupIndex) => (
          <motion.div
            key={group.label}
            {...reveal}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.12 + groupIndex * 0.06,
              ease: easeOut,
            }}
          >
            <p className="font-mono-ui text-[10px] tracking-[0.3em] uppercase text-black/40">
              {group.label}
            </p>
            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              {group.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.38,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    ease: easeOut,
                  }}
                  className="grid min-h-32 gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                >
                  <div>
                    <h3 className="font-sans-ui text-lg font-semibold text-black">{item.title}</h3>
                    <p className="font-sans-ui mt-1 text-sm leading-relaxed text-black/55">
                      {item.meta}
                    </p>
                  </div>
                  <span className="font-mono-ui text-[10px] tracking-[0.25em] text-black/50 sm:text-right">
                    {item.date}
                  </span>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-80px" },
    transition: { duration: shouldReduceMotion ? 0.01 : 0.48, ease: easeOut },
  };

  const socials = [
    { label: "github", href: "https://github.com/foundnemooo" },
    { label: "linkedin", href: "https://www.linkedin.com/in/joshua-ceazar-lopez-071723359/" },
    { label: "resume", href: "/resume.pdf" },
  ];
  return (
    <Section id="contact" eyebrow="03 / hire me" title="contact.">
      <motion.p
        {...reveal}
        className="font-display block text-[clamp(2.15rem,10vw,4.5rem)] leading-[1.02] text-black [overflow-wrap:anywhere]"
      >
        lopezjoshuaceazar@gmail.com
      </motion.p>
      <motion.ul
        {...reveal}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.48,
          delay: shouldReduceMotion ? 0 : 0.08,
          ease: easeOut,
        }}
        className="mt-16 flex flex-wrap gap-x-10 gap-y-4 font-sans-ui text-sm font-bold tracking-[0.2em] lowercase"
      >
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="relative inline-block transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-60 active:scale-[0.97] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-black after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.23,1,0.32,1)] hover:after:origin-left hover:after:scale-x-100"
            >
              {s.label}
            </a>
          </li>
        ))}
      </motion.ul>
      <motion.p
        {...reveal}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.48,
          delay: shouldReduceMotion ? 0 : 0.14,
          ease: easeOut,
        }}
        className="font-mono-ui mt-24 text-[10px] tracking-[0.3em] text-black/40"
      >
        © 2026 joshua ceazar lopez.
      </motion.p>
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

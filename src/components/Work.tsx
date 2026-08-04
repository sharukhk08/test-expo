"use client";

import { gsap, ScrollTrigger, useGSAP, useRef } from "@/lib/gsap";
import TextReveal from "@/components/TextReveal";

const projects = [
  {
    title: "Aurora Dashboard",
    tag: "SaaS",
    accent: "from-indigo-500 to-violet-600",
    blurb: "Real-time analytics with buttery chart transitions.",
  },
  {
    title: "Drift Studio",
    tag: "Portfolio",
    accent: "from-fuchsia-500 to-pink-600",
    blurb: "Immersive scrolling narrative for a creative studio.",
  },
  {
    title: "Pulse Commerce",
    tag: "E-commerce",
    accent: "from-cyan-500 to-sky-600",
    blurb: "Headless storefront with GSAP-driven product reveals.",
  },
  {
    title: "Orbit Web3",
    tag: "Blockchain",
    accent: "from-emerald-500 to-teal-600",
    blurb: "Landing experience for a next-gen wallet.",
  },
];

export default function Work() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll(".work-card"),
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.querySelector(".work-grid"),
            start: "top 80%",
            once: true,
          },
        }
      );

      // Floating tilt on hover
      el.querySelectorAll(".work-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="work" ref={ref} className="bg-zinc-950 py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
              Selected work
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <TextReveal text="Recent projects" />
            </h2>
          </div>
          <a
            href="#faq"
            className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            View all projects →
          </a>
        </div>

        <div className="work-grid grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="work-card group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div
                className={`mb-6 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br ${project.accent} opacity-90 transition-opacity group-hover:opacity-100`}
              >
                <span className="text-5xl font-black text-white/90">
                  {project.title[0]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {project.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {project.blurb}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

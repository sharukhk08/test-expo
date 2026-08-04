"use client";

import { gsap, ScrollTrigger, useGSAP, useRef } from "@/lib/gsap";
import TextReveal from "@/components/TextReveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // CTA + badge entrance
      gsap.fromTo(
        el.querySelectorAll(".hero-fade"),
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.6 }
      );

      // Parallax on the blobs as you scroll away
      gsap.to(".hero-blob", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Subtle mouse parallax on the glow
      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 24;
        const y = (e.clientY / innerHeight - 0.5) * 24;
        gsap.to(".hero-glow", { x, y, duration: 0.8, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 text-white"
    >
      {/* Animated background blobs */}
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="hero-blob pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      <div className="hero-blob pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Now building with Next.js 16 + GSAP
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <TextReveal text="Designs come" />
          <br />
          <TextReveal text="alive in motion." delay={0.3} className="text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text" />
        </h1>

        <p className="hero-fade mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          testexpo transforms static Figma concepts into buttery-smooth web
          experiences. Scroll-triggered reveals, split-text animations, and
          micro-interactions that feel effortless.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
          >
            Explore the work
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#about"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            How it works
          </a>
        </div>

        <div className="hero-fade mt-16 flex items-center justify-center gap-10 text-zinc-500">
          {["Scroll", "to", "explore"].map((w, i) => (
            <span key={i} className="text-sm uppercase tracking-[0.3em]">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { gsap, ScrollTrigger, useGSAP, useRef } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

const stats = [
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 99, suffix: "%", label: "Lighthouse scores" },
  { value: 120, suffix: "fps", label: "Animation budget" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white sm:text-5xl">
      0{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-zinc-950 py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
              About
            </p>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              <TextReveal text="Pixel-perfect code," />
              <br />
              <TextReveal text="built with intention." delay={0.2} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                Every section of this page is a real, animated component — not
                a static mockup. We obsess over easing curves, scroll
                choreography, and the tiny moments that make interfaces feel
                alive.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <a
                href="#work"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
              >
                See the sections below
                <span>→</span>
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { gsap, useGSAP, useRef } from "@/lib/gsap";

const items = [
  "Next.js",
  "Tailwind CSS",
  "GSAP",
  "TypeScript",
  "Figma",
  "React 19",
  "ScrollTrigger",
  "SplitText",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const track = el.querySelector(".marquee-track");
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        tween.kill();
      };
    },
    { scope: ref }
  );

  // Duplicate the list so the -50% loop is seamless
  const doubled = [...items, ...items];

  return (
    <div ref={ref} className="overflow-hidden border-y border-zinc-800 bg-zinc-900 py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-lg font-semibold uppercase tracking-wider text-zinc-500"
          >
            {item}
            <span className="text-indigo-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

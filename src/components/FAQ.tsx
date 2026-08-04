"use client";

import { gsap, useGSAP, useRef } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import { useState } from "react";

const faqs = [
  {
    q: "Is this built with real GSAP animations?",
    a: "Yes — ScrollTrigger, split-text word reveals, counters, parallax blobs, and an infinite marquee are all running on GSAP 3.15 with @gsap/react.",
  },
  {
    q: "Can I swap in my own Figma design?",
    a: "Absolutely. The components are isolated and tokenized — colors, spacing, and copy live in one place, so mapping a Figma frame to a section is quick.",
  },
  {
    q: "Does it work on mobile?",
    a: "Every animation respects prefers-reduced-motion and the layout is fully responsive. Touch devices get the same scroll reveals without heavy pointer effects.",
  },
  {
    q: "How do I deploy it?",
    a: "Push to GitHub, then connect the repo to Vercel. Next.js auto-detects the framework — no config needed. We'll wire that up for you next.",
  },
];

function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const panel = el.querySelector(".faq-panel");
      if (!panel) return;

      if (open) {
        gsap.to(panel, {
          height: "auto",
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [open], scope: ref }
  );

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-white sm:text-lg">
          {faq.q}
        </span>
        <span
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/15 text-lg text-zinc-300 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div className="faq-panel h-0 overflow-hidden opacity-0">
        <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-zinc-950 py-28 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
            FAQ
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <TextReveal text="Questions, answered" />
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.05}>
              <FaqItem
                faq={faq}
                index={index}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

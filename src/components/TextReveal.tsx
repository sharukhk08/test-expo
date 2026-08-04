"use client";

import { gsap, useGSAP, useRef } from "@/lib/gsap";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

const WORD_CLASS =
  "inline-block will-change-transform overflow-hidden align-top";

/**
 * Splits text into words and animates each word up with a stagger.
 * Usage: <TextReveal text="Hello world" />
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const words = el.querySelectorAll<HTMLElement>(".word");

      gsap.fromTo(
        words,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.9,
          delay,
          stagger: 0.08,
          ease: "power4.out",
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <span className={`word ${WORD_CLASS}`}>{word}</span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

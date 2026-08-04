"use client";

import { gsap, useGSAP, useRef } from "@/lib/gsap";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll(".footer-fade"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="border-t border-white/10 bg-zinc-950 py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 sm:flex-row">
        <div className="footer-fade">
          <a href="#home" className="text-lg font-bold tracking-tight">
            test<span className="text-indigo-400">expo</span>
          </a>
          <p className="mt-2 text-sm text-zinc-500">
            © {new Date().getFullYear()} testexpo. Built with Next.js, Tailwind
            & GSAP.
          </p>
        </div>
        <div className="footer-fade flex items-center gap-6 text-sm text-zinc-400">
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-white">
            Work
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
}

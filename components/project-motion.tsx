"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ProjectReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion ? false : { opacity: 0, transform: "translateY(16px)" }
      }
      whileInView={{ opacity: 1, transform: "translateY(0)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ScrollTrigger follows ScrollSmoother's visible position instead of raw scroll.
export function ProjectStatement({ text }: { text: string }) {
  const target = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        target.current!.children,
        { opacity: 0.5 },
        {
          opacity: 1,
          stagger: 1,
          ease: "none",
          scrollTrigger: {
            trigger: target.current,
            start: "top 85%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );
    });
    return () => media.revert();
  }, [text]);

  return (
    <p
      ref={target}
      className="max-w-5xl text-pretty text-3xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-4xl xl:text-5xl"
    >
      {words.map((word, index) => (
        <span key={index}>{word} </span>
      ))}
    </p>
  );
}

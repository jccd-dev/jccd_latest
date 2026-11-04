"use client";

import { wordmarkLetters } from "@/components/wordmark-letters";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Each letter climbs out of the page edge as the last stretch of scroll runs out.
export function FooterWordmark() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(svg.current!.querySelectorAll("path"), {
        y: 64,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: svg.current,
          start: "top bottom",
          end: "max",
          scrub: true,
        },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <svg
      ref={svg}
      role="img"
      aria-label="JCCDLABS"
      viewBox="0 16 390 61"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      className="wordmark block w-full overflow-hidden"
    >
      {wordmarkLetters.map((letter) => (
        <path key={letter} d={letter} />
      ))}
    </svg>
  );
}

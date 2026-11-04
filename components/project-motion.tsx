"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

// Runs on the client only, so server HTML stays visible without JS and matches
// under reduced motion. Keep it off the first screen, where it would flash.
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(target.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: target.current, start: "top 92%", once: true },
      });
    });
    return () => media.revert();
  }, [delay]);

  return (
    <div ref={target} className={className}>
      {children}
    </div>
  );
}

// Words rise out of a mask. `load` plays in CSS on first paint; otherwise it plays on scroll.
// `children` trail the last word, inside its mask.
export function TextReveal({
  as: Tag = "p",
  text,
  highlight,
  load = false,
  className,
  children,
}: {
  as?: ElementType;
  text: string;
  highlight?: string;
  load?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const target = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const highlightAt = highlight ? text.indexOf(highlight) : -1;
  const firstHighlighted =
    highlightAt < 0 ? -1 : text.slice(0, highlightAt).split(" ").length - 1;
  const highlightLength = highlight ? highlight.split(" ").length : 0;

  useEffect(() => {
    if (load) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(target.current!.querySelectorAll(".word"), {
        yPercent: 115,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.03,
        scrollTrigger: { trigger: target.current, start: "top 90%", once: true },
      });
    });
    return () => media.revert();
  }, [load, text]);

  return (
    <Tag
      ref={target}
      className={load ? `words-load ${className ?? ""}` : className}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="word-mask">
            <span
              className={
                firstHighlighted >= 0 &&
                index >= firstHighlighted &&
                index < firstHighlighted + highlightLength
                  ? "word text-highlight"
                  : "word"
              }
              style={{ "--i": index } as CSSProperties}
            >
              {word}
              {index === words.length - 1 && children}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

// Drifts its image against the scroll. The frame needs overflow hidden, and this
// layer sits taller than the frame so the drift never shows an edge.
export function Parallax({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        target.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: target.current!.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={target} className={className}>
      {children}
    </div>
  );
}

// A label that trails the pointer across its parent, which must be positioned.
export function CursorBadge({ label }: { label: string }) {
  const badge = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const element = badge.current!;
        const area = element.parentElement!;
        gsap.set(element, {
          xPercent: -50,
          yPercent: -50,
          scale: 0.7,
          autoAlpha: 0,
        });
        const moveX = gsap.quickTo(element, "x", {
          duration: 0.4,
          ease: "power3",
        });
        const moveY = gsap.quickTo(element, "y", {
          duration: 0.4,
          ease: "power3",
        });
        const position = (event: PointerEvent) => {
          const bounds = area.getBoundingClientRect();
          return [event.clientX - bounds.left, event.clientY - bounds.top];
        };
        const onMove = (event: PointerEvent) => {
          const [x, y] = position(event);
          moveX(x);
          moveY(y);
        };
        const onEnter = (event: PointerEvent) => {
          const [x, y] = position(event);
          moveX(x, x);
          moveY(y, y);
          gsap.to(element, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(element, {
            autoAlpha: 0,
            scale: 0.7,
            duration: 0.15,
            ease: "power2.out",
          });
        };
        area.addEventListener("pointermove", onMove);
        area.addEventListener("pointerenter", onEnter);
        area.addEventListener("pointerleave", onLeave);
        return () => {
          area.removeEventListener("pointermove", onMove);
          area.removeEventListener("pointerenter", onEnter);
          area.removeEventListener("pointerleave", onLeave);
        };
      },
    );
    return () => media.revert();
  }, []);

  return (
    <span
      ref={badge}
      aria-hidden="true"
      className="pointer-events-none invisible absolute left-0 top-0 z-10 whitespace-nowrap rounded-full bg-neutral-950 px-4 py-2 text-sm text-white"
    >
      {label}
    </span>
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
      className="text-pretty text-2xl leading-[1.15] tracking-[-0.02em] sm:text-3xl"
    >
      {words.map((word, index) => (
        <span key={index}>{word} </span>
      ))}
    </p>
  );
}

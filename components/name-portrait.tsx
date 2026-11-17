"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Wraps a name in a button: hovering or pressing it drops the portrait at a
// random spot inside the nearest positioned ancestor (the hero content box).
export function NamePortrait({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const card = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const hide = () => {
    clearTimeout(timer.current);
    gsap.to(card.current, {
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.15,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const show = () => {
    const element = card.current;
    const area = element?.offsetParent;
    if (!element || !area) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    clearTimeout(timer.current);
    gsap.killTweensOf(element);
    gsap.set(element, {
      x: gsap.utils.random(0, area.clientWidth - element.offsetWidth),
      y: gsap.utils.random(0, area.clientHeight - element.offsetHeight),
      rotation: reduce ? 0 : gsap.utils.random(-6, 6),
      scale: reduce ? 1 : 0.92,
      autoAlpha: 0,
    });
    gsap.to(element, {
      autoAlpha: 1,
      scale: 1,
      duration: reduce ? 0 : 0.3,
      ease: "power3.out",
    });
  };

  return (
    <>
      <button
        type="button"
        style={style}
        className={`cursor-pointer rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${className}`}
        onPointerEnter={(event) => event.pointerType === "mouse" && show()}
        onPointerLeave={(event) => event.pointerType === "mouse" && hide()}
        onBlur={hide}
        onClick={() => {
          show();
          // Touch has no pointer-leave to dismiss it, so it leaves on its own.
          if (!matchMedia("(hover: hover)").matches) {
            timer.current = setTimeout(hide, 2500);
          }
        }}
      >
        {children}
      </button>
      <span
        ref={card}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 z-10 block aspect-3/4 w-[clamp(7rem,18vw,12rem)] overflow-hidden rounded-tile bg-[#8a4a1f] shadow-2xl"
      >
        <Image
          src="/jcportrait.webp"
          unoptimized
          alt=""
          fill
          sizes="192px"
          className="object-cover object-[50%_24%]"
        />
      </span>
    </>
  );
}

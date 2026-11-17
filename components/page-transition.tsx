"use client";

import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { wordmarkLetters } from "./wordmark-letters";

// Size of the wordmark in its own units (the viewBox of public/JCCDLABS.svg).
const WORD = { width: 392.32, height: 97.76, inset: 2 };
// Middle of the L's stem, which is `half` units from either edge: the zoom
// goes through it until the stem is wider than the screen.
const STEM = { x: 208.48, y: 46, half: 3.6 };

// Runs before first paint. `data-intro` shows the curtain and `data-hold` pauses
// the page's own load animations (see globals.css) until a cover clears.
export const introScript = `try{if(!sessionStorage.getItem("intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement.dataset;d.intro="";d.hold=""}}catch(e){}`;

const release = () => delete document.documentElement.dataset.hold;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const cover = useRef<gsap.core.Timeline>(null);
  const zoom = useRef({ origin: "0 0", target: 1 });
  const covering = useRef(false);

  // First visit of the session: count up, then lift the curtain off the page.
  useEffect(() => {
    const root = document.documentElement;
    if (!("intro" in root.dataset)) return;
    try {
      sessionStorage.setItem("intro", "1");
    } catch {}

    const number = { value: 0 };
    const timeline = gsap
      .timeline({ onComplete: () => delete root.dataset.intro })
      .to(
        number,
        {
          value: 100,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current)
              count.current.textContent = String(Math.round(number.value));
          },
        },
        0.15,
      )
      .to(
        curtain.current!.querySelectorAll(".intro-rise"),
        { yPercent: -115, duration: 0.5, ease: "power3.inOut", stagger: 0.015 },
        1.2,
      )
      .to(
        curtain.current,
        { yPercent: -100, duration: 0.85, ease: "expo.inOut" },
        1.3,
      )
      .call(release, undefined, 1.7);

    return () => {
      timeline.kill();
    };
  }, []);

  // Links to another page wait for the cover and its wordmark to fill the screen.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        covering.current ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.download ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;

      // Stops next/link from navigating now; the push happens once covered.
      event.preventDefault();
      covering.current = true;
      document.documentElement.dataset.hold = "";

      const el = svg.current!;
      const { width, height } = el.getBoundingClientRect();
      const scale = Math.min(width * 0.62, 620) / WORD.width;
      const left = (width - WORD.width * scale) / 2 + WORD.inset * scale;
      const top = (height - WORD.height * scale) / 2 + WORD.inset * scale;
      el.querySelectorAll(".pt-place").forEach((group) =>
        group.setAttribute(
          "transform",
          `translate(${left} ${top}) scale(${scale})`,
        ),
      );
      zoom.current = {
        origin: `${left + STEM.x * scale} ${top + STEM.y * scale}`,
        target: width / (STEM.half * scale),
      };

      cover.current = gsap
        .timeline()
        .set(el, { autoAlpha: 1 })
        .set(el.querySelectorAll(".pt-zoom"), {
          scale: 1,
          svgOrigin: zoom.current.origin,
        })
        .set(el.querySelector(".pt-logo"), { opacity: 1 })
        .set(el.querySelector(".pt-logo use"), { fillOpacity: 1 })
        .set(el.querySelector(".pt-holes"), { opacity: 0 })
        .fromTo(
          el.querySelector(".pt-cover"),
          { y: height },
          { y: 0, duration: 0.5, ease: "power3.inOut" },
          0,
        )
        .fromTo(
          el.querySelectorAll("#pt-word path"),
          { y: 72 },
          { y: 0, duration: 0.45, ease: "power3.out", stagger: 0.02 },
          0.15,
        )
        .call(
          () => {
            // The menu listens for this to finish closing out of sight.
            window.dispatchEvent(new Event("page-covered"));
            router.push(url.pathname + url.search + url.hash);
          },
          undefined,
          0.5,
        );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new page has rendered under the cover: the wordmark zooms, its fill
  // drops out, and the letters open as windows the zoom passes through.
  useEffect(() => {
    if (!covering.current) return;
    covering.current = false;
    const el = svg.current!;
    const { origin, target } = zoom.current;
    const zooms = el.querySelectorAll(".pt-zoom");
    const progress = { value: 0 };
    const timeline = cover.current;
    gsap
      // Waits for the letters if the page arrived before they finished rising.
      .timeline({
        delay: timeline
          ? Math.max(0, timeline.duration() - timeline.time())
          : 0,
      })
      .to(progress, {
        value: 1,
        duration: 1,
        ease: "power2.in",
        // Exponential scale, so the zoom reads as one steady push.
        onUpdate: () =>
          gsap.set(zooms, {
            scale: target ** progress.value,
            svgOrigin: origin,
          }),
      })
      .call(release, undefined, 0.3)
      .to(
        el.querySelector(".pt-logo use"),
        { fillOpacity: 0, duration: 0.25, ease: "power1.out" },
        0.3,
      )
      .to(
        el.querySelector(".pt-holes"),
        { opacity: 1, duration: 0.25, ease: "power1.out" },
        0.3,
      )
      .to(el.querySelector(".pt-logo"), { opacity: 0, duration: 0.3 }, 0.7)
      .set(el, { autoAlpha: 0 });
  }, [pathname]);

  return (
    <div aria-hidden="true">
      <div
        ref={curtain}
        className="intro-cover fixed inset-0 z-70 flex-col justify-between bg-foreground p-4 text-background md:p-6"
      >
        <p className="text-[13vw] leading-none tracking-[-0.05em]">
          <span className="word-mask">
            {[..."JccdLabs"].map((letter, index) => (
              <span
                key={index}
                className="intro-rise"
                style={{ animationDelay: `${100 + index * 30}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </p>
        <div className="flex items-end justify-between gap-4 text-sm">
          <p>Full-stack developer, Philippines</p>
          <p className="text-[9vw] leading-[0.9] tracking-[-0.04em] tabular-nums">
            <span className="word-mask">
              <span ref={count} className="intro-rise">
                0
              </span>
            </span>
          </p>
        </div>
      </div>
      <svg
        ref={svg}
        className="pointer-events-none invisible fixed inset-0 z-60 h-full w-full"
      >
        <defs>
          <g id="pt-word">
            {wordmarkLetters.map((letter) => (
              <path key={letter} d={letter} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          {/* Hides the letters below the baseline until they rise. */}
          <clipPath id="pt-box">
            <rect x="-2" y="12" width={WORD.width} height="68" />
          </clipPath>
          <mask
            id="pt-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <rect width="100%" height="100%" fill="#fff" />
            <g className="pt-zoom pt-holes">
              <g className="pt-place">
                <use href="#pt-word" fill="#000" />
              </g>
            </g>
          </mask>
        </defs>
        <g mask="url(#pt-mask)">
          <rect
            className="pt-cover fill-neutral-950"
            width="100%"
            height="100%"
          />
        </g>
        <g className="pt-zoom pt-logo">
          <g className="pt-place" clipPath="url(#pt-box)">
            <use
              href="#pt-word"
              className="fill-neutral-50 stroke-neutral-50"
              strokeWidth="1.25"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

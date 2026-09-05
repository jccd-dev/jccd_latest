"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function scrollToHash(smooth: boolean) {
  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 96;
  ScrollSmoother.get()?.scrollTo(target, smooth, `top ${margin}px`);
}

export function SmoothScrolling({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const historyPath = useRef<string | null>(null);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1,
        smoothTouch: 0.1,
        onFocusIn: (_, event) =>
          event.target instanceof Node &&
          content.current?.contains(event.target),
      });

      // Respect both the navigation menu's lock and Radix's portalled dialogs.
      const syncScrollLock = () => {
        smoother.paused(
          document.body.style.overflow === "hidden" ||
            document.body.hasAttribute("data-scroll-locked"),
        );
      };
      const observer = new MutationObserver(syncScrollLock);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style", "data-scroll-locked"],
      });
      syncScrollLock();
      return () => observer.disconnect();
    });

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.download ||
        (link.target && link.target !== "_self") ||
        !ScrollSmoother.get()
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      if (!document.getElementById(url.hash.slice(1))) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      scrollToHash(true);
    };
    const onHashChange = () => scrollToHash(false);
    const onPopState = () => {
      historyPath.current = location.pathname;
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
      media.revert();
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (location.hash) scrollToHash(false);
      else if (
        previousPath.current !== pathname &&
        historyPath.current !== pathname
      )
        ScrollSmoother.get()?.scrollTo(0, false);
      previousPath.current = pathname;
      historyPath.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content" className="flow-root w-full">
        {children}
      </div>
    </div>
  );
}

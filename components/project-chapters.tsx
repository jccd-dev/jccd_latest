"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ChapterNavigation({
  chapters,
}: {
  chapters: readonly { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState(chapters[0]?.id);
  const navigation = useRef<HTMLUListElement>(null);
  const aside = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = aside.current;
    const container = element?.parentElement;
    if (!element || !container) return;

    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const top = 112;
        gsap.set(element, { position: "relative", top: 0 });
        ScrollTrigger.create({
          trigger: element,
          start: `top ${top}px`,
          endTrigger: container,
          end: () => `bottom ${top + element.offsetHeight}px`,
          pin: true,
          pinType: "transform",
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      },
    );
    return () => media.revert();
  }, []);

  useEffect(() => {
    const sections = chapters.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    const updateCurrent = () => {
      const current = sections.findLast(
        (section) =>
          section.getBoundingClientRect().top <= window.innerHeight * 0.35,
      );
      setActiveId(current?.id ?? sections[0]?.id);
    };
    let observer: IntersectionObserver;
    const observeSections = () => {
      observer?.disconnect();
      // Pixel margins keep the reading boundary tied to height on wide screens.
      observer = new IntersectionObserver(updateCurrent, {
        rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.65)}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer.observe(section));
    };

    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [chapters]);

  useEffect(() => {
    const list = navigation.current;
    const current = list?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (list && current && list.scrollWidth > list.clientWidth) {
      list.scrollTo({
        left:
          current.offsetLeft - list.clientWidth / 2 + current.clientWidth / 2,
      });
    }
  }, [activeId]);

  return (
    <aside
      ref={aside}
      className="lg:sticky lg:top-28 lg:self-start"
    >
      <nav aria-label="Case study chapters">
        <p className="mb-3 text-sm text-muted-foreground lg:mb-5">
          In this project
        </p>
        <ul
          ref={navigation}
          className="relative flex flex-wrap gap-x-4 lg:max-h-[calc(100dvh-10rem)] lg:flex-col lg:flex-nowrap lg:gap-0 lg:overflow-y-auto lg:border-l lg:border-border [scrollbar-width:none]"
        >
          {chapters.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? "location" : undefined}
                className={`flex min-h-11 items-center text-sm outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:-ml-px lg:border-l-2 lg:px-5 ${
                  activeId === id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

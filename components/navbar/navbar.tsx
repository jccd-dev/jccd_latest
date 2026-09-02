"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ModeToggle } from "../mode-toggle";
import "./staggered-menu.css";

const menuItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
] as const;

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const layers = layersRef.current?.querySelectorAll(".sm-prelayer");
      gsap.set([panelRef.current, ...(layers ?? [])], { xPercent: 100 });
    }, wrapperRef);

    return () => context.revert();
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    timelineRef.current?.kill();

    const panel = panelRef.current;
    const layers = layersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? [];
    const labels = panel?.querySelectorAll<HTMLElement>(".sm-panel-item-label") ?? [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timelineRef.current = gsap
      .timeline({
        onComplete: () => {
          if (restoreFocus) toggleRef.current?.focus();
        },
      })
      .to(labels, {
        yPercent: 120,
        duration: reducedMotion ? 0 : 0.2,
        ease: "power2.in",
      })
      .to(
        [panel, ...layers],
        {
          xPercent: 100,
          duration: reducedMotion ? 0 : 0.38,
          ease: "power3.in",
          stagger: reducedMotion ? 0 : 0.04,
        },
        0,
      );

    gsap.to(iconRef.current, {
      rotate: 0,
      duration: reducedMotion ? 0 : 0.35,
      ease: "power3.inOut",
    });
    gsap.to(textRef.current, {
      yPercent: 0,
      duration: reducedMotion ? 0 : 0.35,
      ease: "power3.inOut",
    });
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current) return;

    openRef.current = true;
    setOpen(true);
    timelineRef.current?.kill();

    const panel = panelRef.current;
    const layers = layersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? [];
    const labels = panel?.querySelectorAll<HTMLElement>(".sm-panel-item-label") ?? [];
    const details = panel?.querySelectorAll<HTMLElement>(".sm-panel-detail") ?? [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(labels, { yPercent: 120 });
    gsap.set(details, { opacity: 0, y: 12 });

    timelineRef.current = gsap
      .timeline({
        onComplete: () => panel?.querySelector<HTMLAnchorElement>("a")?.focus(),
      })
      .to([...layers, panel], {
        xPercent: 0,
        duration: reducedMotion ? 0 : 0.58,
        ease: "power4.out",
        stagger: reducedMotion ? 0 : 0.07,
      })
      .to(
        labels,
        {
          yPercent: 0,
          duration: reducedMotion ? 0 : 0.7,
          ease: "power4.out",
          stagger: reducedMotion ? 0 : 0.07,
        },
        reducedMotion ? 0 : 0.18,
      )
      .to(
        details,
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.4,
          ease: "power2.out",
          stagger: reducedMotion ? 0 : 0.05,
        },
        reducedMotion ? 0 : 0.35,
      );

    gsap.to(iconRef.current, {
      rotate: 225,
      duration: reducedMotion ? 0 : 0.8,
      ease: "power4.out",
    });
    gsap.to(textRef.current, {
      yPercent: -50,
      duration: reducedMotion ? 0 : 0.6,
      ease: "power4.out",
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [
        toggleRef.current,
        ...Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
        ),
      ].filter((element): element is HTMLElement => Boolean(element));
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  return (
    <div ref={wrapperRef} className="staggered-menu-wrapper" data-open={open || undefined}>
      {open && (
        <button
          className="sm-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => closeMenu()}
        />
      )}

      <div ref={layersRef} className="sm-prelayers" aria-hidden="true">
        <div className="sm-prelayer sm-prelayer-paper" />
        <div className="sm-prelayer sm-prelayer-graphite" />
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation">
        <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-6">
          <Link className="sm-logo" href="/" aria-label="JC.DEV home">
            JC.DEV
          </Link>
          <button
            ref={toggleRef}
            className="sm-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={open ? () => closeMenu() : openMenu}
          >
            <span className="sm-toggle-text-wrap" aria-hidden="true">
              <span ref={textRef} className="sm-toggle-text">
                <span>Menu</span>
                <span>Close</span>
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <aside
        ref={panelRef}
        id="staggered-menu-panel"
        className="staggered-menu-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Portfolio sections">
          <ul className="sm-panel-list">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => closeMenu(false)}>
                  <span className="sm-panel-item-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm-panel-footer">
          <Link className="sm-contact sm-panel-detail" href="#about" onClick={() => closeMenu(false)}>
            Let&apos;s Work Together
          </Link>
          <div className="sm-panel-links sm-panel-detail">
            <a href="https://github.com/jccd-dev" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="/johncarlodigay_resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
            <span className="sm-theme">
              <span className="sr-only">Theme</span>
              <ModeToggle />
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

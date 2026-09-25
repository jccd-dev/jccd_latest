"use client";

import { gsap } from "gsap";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ModeToggle } from "../mode-toggle";
import "./staggered-menu.css";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Say Hello", href: "/contact" },
] as const;

export default function StaggeredMenu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const layers =
        layersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? [];
      const panel = panelRef.current;
      const labels =
        panel?.querySelectorAll<HTMLElement>(".sm-panel-item-label") ?? [];
      const details =
        panel?.querySelectorAll<HTMLElement>(".sm-panel-detail") ?? [];
      const backdrop = backdropRef.current;

      // Set initial off-screen states
      gsap.set([panel, ...Array.from(layers)], {
        transform: "translate3d(100%, 0, 0)",
      });
      gsap.set(labels, { yPercent: 120 });
      gsap.set(details, { opacity: 0, y: 16 });
      if (backdrop) {
        gsap.set(backdrop, { opacity: 0, pointerEvents: "none" });
      }
    }, wrapperRef);

    return () => context.revert();
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    if (!openRef.current) return;
    openRef.current = false;

    activeTimeline.current?.kill();

    const panel = panelRef.current;
    const layers =
      layersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? [];
    const labels =
      panel?.querySelectorAll<HTMLElement>(".sm-panel-item-label") ?? [];
    const details =
      panel?.querySelectorAll<HTMLElement>(".sm-panel-detail") ?? [];
    const backdrop = backdropRef.current;
    const icon = iconRef.current;
    const text = textRef.current;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set([panel, ...Array.from(layers)], {
        transform: "translate3d(100%, 0, 0)",
      });
      gsap.set(labels, { yPercent: 120 });
      gsap.set(details, { opacity: 0, y: 16 });
      if (backdrop) {
        gsap.set(backdrop, { opacity: 0, pointerEvents: "none" });
      }
      if (icon) gsap.set(icon, { rotate: 0 });
      if (text) gsap.set(text, { yPercent: 0 });
      if (restoreFocus) toggleRef.current?.focus();
      setOpen(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (restoreFocus) toggleRef.current?.focus();
        setOpen(false);
      },
    });

    // 1. First, animate details out
    tl.to(
      details,
      {
        opacity: 0,
        y: 10,
        duration: 0.22,
        ease: "power2.in",
        stagger: 0.03,
      },
      0,
    );

    // 2. Animate out the menu links FIRST (staggered from bottom to top)
    // Giving adequate time so it doesn't feel rushed
    tl.to(
      Array.from(labels).reverse(),
      {
        yPercent: 120,
        duration: 0.35,
        ease: "power3.in",
        stagger: 0.04,
      },
      0.04,
    );

    // 3. ONLY AFTER the links finish animating out, slide the main drawer panel and prelayers away
    // Order: Panel slides out first to reveal Graphite, then Graphite, then Paper
    const drawerStartTime = 0.44;
    const panelAndLayers = [panel, ...Array.from(layers).reverse()];

    tl.to(
      panelAndLayers,
      {
        transform: "translate3d(100%, 0, 0)",
        duration: 0.65,
        ease: "power3.inOut",
        stagger: 0.07,
      },
      drawerStartTime,
    );

    // Toggle button icon and text return in sync with the drawer retracting
    if (icon) {
      tl.to(
        icon,
        {
          rotate: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        drawerStartTime,
      );
    }
    if (text) {
      tl.to(
        text,
        {
          yPercent: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        drawerStartTime,
      );
    }

    // Backdrop fades out as drawer leaves
    if (backdrop) {
      tl.to(
        backdrop,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(backdrop, { pointerEvents: "none" });
          },
        },
        drawerStartTime,
      );
    }

    activeTimeline.current = tl;
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);

    activeTimeline.current?.kill();

    const panel = panelRef.current;
    const layers =
      layersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? [];
    const labels =
      panel?.querySelectorAll<HTMLElement>(".sm-panel-item-label") ?? [];
    const details =
      panel?.querySelectorAll<HTMLElement>(".sm-panel-detail") ?? [];
    const backdrop = backdropRef.current;
    const icon = iconRef.current;
    const text = textRef.current;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set([panel, ...Array.from(layers)], {
        transform: "translate3d(0%, 0, 0)",
      });
      gsap.set(labels, { yPercent: 0 });
      gsap.set(details, { opacity: 1, y: 0 });
      if (backdrop) {
        gsap.set(backdrop, { opacity: 1, pointerEvents: "auto" });
      }
      if (icon) gsap.set(icon, { rotate: 225 });
      if (text) gsap.set(text, { yPercent: -50 });
      panel?.querySelector<HTMLAnchorElement>("a")?.focus();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        panel?.querySelector<HTMLAnchorElement>("a")?.focus();
      },
    });

    // 1. Backdrop fade in
    if (backdrop) {
      tl.to(
        backdrop,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power2.out",
        },
        0,
      );
    }

    // 2. Sliding layers and main panel: Paper -> Graphite -> Dark panel
    tl.to(
      [...Array.from(layers), panel],
      {
        transform: "translate3d(0%, 0, 0)",
        duration: 0.75,
        ease: "power4.out",
        stagger: 0.08,
      },
      0,
    );

    // 3. Typography reveal: home -> projects -> about -> say hello
    tl.to(
      labels,
      {
        yPercent: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.06,
      },
      0.32,
    );

    // 4. Panel details (footer CTA, GitHub link, theme toggle)
    tl.to(
      details,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
      },
      0.5,
    );

    // 5. Toggle button icon & text
    if (icon) {
      tl.to(
        icon,
        {
          rotate: 225,
          duration: 0.5,
          ease: "power3.out",
        },
        0.1,
      );
    }
    if (text) {
      tl.to(
        text,
        {
          yPercent: -50,
          duration: 0.4,
          ease: "power3.out",
        },
        0.1,
      );
    }

    activeTimeline.current = tl;
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

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
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, openMenu]);

  return (
    <div
      ref={wrapperRef}
      className="staggered-menu-wrapper"
      data-open={open || undefined}
    >
      <button
        ref={backdropRef}
        className="sm-backdrop"
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => closeMenu()}
      />

      <div ref={layersRef} className="sm-prelayers" aria-hidden="true">
        <div className="sm-prelayer sm-prelayer-paper" />
        <div className="sm-prelayer sm-prelayer-graphite" />
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation">
        <div className="container mx-auto flex h-full items-center justify-between px-4 lg:px-6">
          <Link
            className="sm-logo font-pp-neue-montreal"
            href="/"
            aria-label="JccdLabs Home"
          >
            JccdLabs
          </Link>
          <button
            ref={toggleRef}
            className="sm-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
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
          <Link
            className="sm-contact sm-panel-detail"
            href="/contact"
            onClick={() => closeMenu(false)}
          >
            Let&apos;s Work Together
          </Link>
          <div className="sm-panel-links sm-panel-detail">
            <a
              href="https://github.com/jccd-dev"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
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

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import type { ProjectScreenshot } from "@/lib/data/projects";

const controlClass =
  "flex size-11 shrink-0 items-center justify-center rounded-xs border border-border text-foreground outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:hover:bg-transparent";

export function ProjectGallery({
  screenshots,
}: {
  screenshots: readonly ProjectScreenshot[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const screenshot = screenshots[activeIndex];
  const expanded =
    expandedIndex === null ? undefined : screenshots[expandedIndex];

  if (!screenshot) return null;

  function goTo(index: number, animate = true) {
    const slide = rail.current?.children[index];
    if (!(slide instanceof HTMLElement) || !rail.current) return;
    rail.current.scrollTo({
      left: slide.offsetLeft,
      behavior: reduceMotion || !animate ? "instant" : "smooth",
    });
    setActiveIndex(index);
  }

  function handleArrowKey(
    event: KeyboardEvent<HTMLElement>,
    index: number,
    select: (index: number) => void,
  ) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    select(
      Math.max(
        0,
        Math.min(
          screenshots.length - 1,
          index + (event.key === "ArrowRight" ? 1 : -1),
        ),
      ),
    );
  }

  return (
    <Dialog.Root
      open={expandedIndex !== null}
      onOpenChange={(open) => {
        if (!open) {
          if (expandedIndex !== null) goTo(expandedIndex, false);
          setExpandedIndex(null);
        }
      }}
    >
      <div
        aria-label="Additional project screenshots"
        aria-roledescription="carousel"
        role="region"
      >
        <div
          ref={rail}
          onKeyDown={(event) => handleArrowKey(event, activeIndex, goTo)}
          onScroll={() => {
            const track = rail.current;
            const first = track?.children[0];
            const second = track?.children[1];
            if (
              track &&
              first instanceof HTMLElement &&
              second instanceof HTMLElement
            ) {
              const step = second.offsetLeft - first.offsetLeft;
              if (step > 0)
                setActiveIndex(
                  Math.max(
                    0,
                    Math.min(
                      screenshots.length - 1,
                      Math.round(track.scrollLeft / step),
                    ),
                  ),
                );
            }
          }}
          className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-sm [scrollbar-width:none] sm:gap-5"
        >
          {screenshots.map((item, index) => (
            <figure
              key={item.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${screenshots.length}`}
              className={`min-w-0 shrink-0 snap-start ${screenshots.length > 1 ? "basis-[88%]" : "basis-full"}`}
            >
              <button
                type="button"
                aria-label={`Expand ${item.title || `screenshot ${index + 1}`}`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  returnFocus.current = event.currentTarget;
                  setExpandedIndex(index);
                }}
                className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-sm bg-muted outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:aspect-[16/10]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1440px) 960px, (min-width: 1024px) 70vw, 88vw"
                  className="object-contain motion-safe:transition-transform motion-safe:duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </button>
            </figure>
          ))}
          {screenshots.length > 1 && (
            <div aria-hidden="true" className="basis-[12%] shrink-0" />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm tabular-nums text-muted-foreground"
          >
            <span className="text-foreground">{activeIndex + 1}</span> /{" "}
            {screenshots.length}
            <span className="sr-only"> screenshots</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Expand current screenshot"
              aria-haspopup="dialog"
              onClick={(event) => {
                returnFocus.current = event.currentTarget;
                setExpandedIndex(activeIndex);
              }}
              className="mr-2 inline-flex min-h-11 items-center gap-2 text-sm text-foreground outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Maximize2 aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Full screen</span>
            </button>
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  disabled={activeIndex === 0}
                  onClick={() => goTo(activeIndex - 1)}
                  className={controlClass}
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  disabled={activeIndex === screenshots.length - 1}
                  onClick={() => goTo(activeIndex + 1)}
                  className={controlClass}
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {screenshots.length > 1 && (
          <div
            className="mt-3 flex gap-3 overflow-x-auto py-1 [scrollbar-width:thin]"
            role="group"
            aria-label="Choose a screenshot"
          >
            {screenshots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Show screenshot ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => goTo(index)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xs border-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:h-16 sm:w-24 ${activeIndex === index ? "border-foreground opacity-100" : "border-transparent opacity-50 hover:opacity-100 focus-visible:opacity-100"}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog.Portal>
        {/* The image viewer sits above the site's navigation (z-50). */}
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/95" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            if (expandedIndex !== null)
              handleArrowKey(event, expandedIndex, setExpandedIndex);
          }}
          className="fixed inset-0 z-[61] flex flex-col bg-background p-4 text-foreground outline-none sm:p-6"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
            <Dialog.Title className="text-sm">
              {expanded?.title || "Project screenshot"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close full screen"
                className={controlClass}
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="relative min-h-0 flex-1">
            {expanded && (
              <Image
                src={expanded.src}
                alt={expanded.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 pt-4 pb-[env(safe-area-inset-bottom)]">
            {expanded && (
              <a
                href={expanded.src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Open original
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
            {expandedIndex !== null && (
              <div className="flex items-center gap-3">
                <p aria-live="polite" className="mr-2 text-sm tabular-nums">
                  {expandedIndex + 1} / {screenshots.length}
                </p>
                <button
                  type="button"
                  aria-label="Previous full-screen screenshot"
                  disabled={expandedIndex === 0}
                  onClick={() => setExpandedIndex(expandedIndex - 1)}
                  className={controlClass}
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next full-screen screenshot"
                  disabled={expandedIndex === screenshots.length - 1}
                  onClick={() => setExpandedIndex(expandedIndex + 1)}
                  className={controlClass}
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { ActionLink } from "@/components/action-link";
import { NamePortrait } from "@/components/name-portrait";
import type { CSSProperties } from "react";
import Link from "next/link";

const focus = [
  "Web applications",
  "AI integration",
  "Business systems",
  "Database design",
  "Next.js, TypeScript",
  "Deployment, CI/CD",
];

// Every other run is set in the foreground colour.
const lede = [
  "John Carlo is a",
  "full-stack developer",
  "from the Philippines who builds",
  "web apps",
  "and",
  "business systems,",
  "from frontend to backend to deployment.",
].flatMap((run, index) =>
  run.split(" ").map((word) => ({ word, strong: index % 2 === 1 })),
);

const ledeWords = lede.map(({ word, strong }, index) => (
  <span key={index}>
    <span className="word-mask">
      <span
        className={strong ? "word text-foreground" : "word"}
        style={{ "--i": index } as CSSProperties}
      >
        {word}
      </span>
    </span>{" "}
  </span>
));

// The entrance runs in order: title, captions, sentence, actions, focus list.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const wordIndex = (i: number) => ({ "--i": i }) as CSSProperties;
const wordsDelay = (ms: number) =>
  ({ "--words-delay": `${ms}ms` }) as CSSProperties;

const Hero = () => (
  <section className="page-container flex min-h-svh flex-col pb-16 pt-28 md:pb-24 md:pt-36">
    {/* Container units size the title to the content width, so it fills one line at any width. */}
    <div className="@container relative flex flex-1 flex-col">
      <h1 className="words-load -ml-[0.04em] text-[length:18cqw] uppercase leading-[0.88] tracking-[-0.04em] @min-[640px]:whitespace-nowrap @min-[640px]:text-[length:9.1cqw]">
        <span className="sr-only">John Carlo Digay, </span>
        <span className="word-mask">
          <span className="word" style={wordIndex(0)}>
            Full-Stack
          </span>
        </span>{" "}
        <br className="@min-[640px]:hidden" />
        <span className="word-mask">
          <span className="word" style={wordIndex(6)}>
            Developer
          </span>
        </span>
      </h1>

      <div className="mt-5 flex items-start justify-between gap-4 text-sm leading-snug">
        <p className="text-muted-foreground">
          <NamePortrait
            style={delay(550)}
            className="rise-load inline-block underline decoration-dotted underline-offset-4"
          >
            John Carlo Digay
          </NamePortrait>
          <span className="rise-load block" style={delay(610)}>
            JccdLabs
          </span>
        </p>
        <p
          className="rise-load text-right uppercase tracking-[0.02em]"
          style={delay(670)}
        >
          AI-augmented, freelance,
          <br />
          based in the Philippines
        </p>
      </div>

      <div className="mt-auto grid gap-10 pt-16 lg:grid-cols-[1.7fr_1fr] lg:items-end lg:gap-18 lg:pt-26">
        <div>
          <p
            className="words-load text-pretty text-[clamp(1.625rem,4.3cqw,3rem)] leading-[1.1] tracking-[-0.03em] text-muted-foreground"
            style={wordsDelay(850)}
          >
            {/* The first two words are the name, which also calls up the portrait. */}
            <NamePortrait>{ledeWords.slice(0, 2)}</NamePortrait>{" "}
            {ledeWords.slice(2)}
          </p>
          <div
            className="rise-load mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={delay(1350)}
          >
            <ActionLink href="/contact">Let&apos;s Work Together</ActionLink>
            <Link
              href="#projects"
              className="inline-flex min-h-11 items-center rounded-xs text-base outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span className="link-line">View Selected Work</span>
            </Link>
          </div>
        </div>

        <div>
          <h2
            style={delay(1450)}
            className="rise-load border-b border-border pb-2.5 text-[0.8125rem] uppercase tracking-[0.06em] text-muted-foreground"
          >
            Focus
          </h2>
          <ul className="grid grid-cols-2 gap-x-6">
            {focus.map((item, index) => (
              <li
                key={item}
                style={delay(1510 + index * 60)}
                className="rise-load border-b border-border py-2.5"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

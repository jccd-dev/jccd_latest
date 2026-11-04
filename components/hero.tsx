import { ActionLink } from "@/components/action-link";
import { AvailabilityStatus } from "@/components/availability";
import { Parallax, TextReveal } from "@/components/project-motion";
import { projects } from "@/lib/data/projects";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const latestProject = projects[0];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const Hero = () => (
  <section className="page-container grid gap-8 pb-16 pt-28 md:pb-24 md:pt-32 sm:grid-cols-12 lg:grid-rows-[auto_1fr]">
    <TextReveal
      as="h1"
      load
      text="Hello I'm John Carlo, an AI-Augmented Full-Stack Developer and Freelancer based in the Philippines."
      highlight="AI-Augmented Full-Stack Developer"
      className="text-[clamp(2.375rem,5.4vw,4.25rem)] leading-[1.04] tracking-[-0.03em] sm:col-span-12 lg:col-span-8"
    />

    <div className="flex flex-col justify-between gap-8 sm:col-span-7 lg:col-span-8 lg:row-start-2">
      <div className="rise-load" style={delay(300)}>
        <p className="max-w-xl text-pretty text-lg leading-snug md:text-xl">
          I enjoy building clean and functional web applications, working across
          both frontend and backend. I&apos;m also open to exploring a wide
          range of digital and creative projects.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ActionLink href="/contact">Let&apos;s Work Together</ActionLink>
          <Link
            href="#projects"
            className="inline-flex min-h-11 items-center rounded-xs text-base outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="link-line">View Selected Work</span>
          </Link>
        </div>
      </div>

      <dl
        className="rise-load grid gap-x-8 gap-y-4 border-t border-border pt-5 text-base lg:grid-cols-3"
        style={delay(420)}
      >
        <div className="hidden sm:block">
          <dt className="text-sm text-muted-foreground">Based in</dt>
          <dd className="mt-1">Camarines Sur, Philippines</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Focus</dt>
          <dd className="mt-1">Web apps and business systems</dd>
        </div>
        {latestProject && (
          <div>
            <dt className="text-sm text-muted-foreground">Latest project</dt>
            <dd className="mt-1">
              <Link
                href={`/projects/${latestProject.slug}`}
                className="-my-3 inline-block rounded-xs py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="link-line">{latestProject.title}</span>
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </div>

    <div className="wipe-load relative aspect-square overflow-hidden rounded-tile bg-[#8a4a1f] sm:col-span-5 sm:aspect-auto sm:min-h-96 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[min(40rem,calc(100dvh-10rem))]">
      <Parallax className="absolute inset-x-0 -inset-y-[7%]">
        <Image
          src="/jcportrait.jpg"
          unoptimized
          alt="Portrait of John Carlo Digay, a freelance full-stack developer behind JccdLabs"
          fill
          priority
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 42vw, 100vw"
          className="object-cover object-[50%_24%]"
        />
      </Parallax>
      <p className="absolute bottom-3 left-3 rounded-full bg-neutral-950 px-3.5 py-2 text-sm leading-none text-white">
        <AvailabilityStatus />
      </p>
    </div>
  </section>
);

export default Hero;

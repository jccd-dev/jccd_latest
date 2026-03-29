"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { projectDetails } from "@/lib/data/projectDetails";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  const project = projectDetails.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      );

      gsap.utils.toArray(".reveal-image").forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen bg-background text-foreground items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-light tracking-wide">
            Project Not Found
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-white/60 hover:text-white underline underline-offset-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="mb-12">
          <Link
            href="/#projects"
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
          >
            &larr; Back to projects
          </Link>
        </div>

        <header ref={headerRef} className="max-w-4xl mb-24">
          <p className="reveal-text text-white/50 mb-8 uppercase tracking-widest text-xs md:text-sm font-semibold">
            Project &mdash; {project.title}
          </p>
          <h1 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-20 text-[#f5f5f5]">
            {project.subtitle}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16">
            <div className="md:col-span-4 reveal-text">
              <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-6">
                Services
              </h3>
              <ul className="space-y-3 text-sm text-white/80 font-medium">
                {project.services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8 reveal-text">
              <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-6">
                Overview
              </h3>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                {project.overview}
              </p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[400px] gap-6">
          {project.images.map((img, idx) => {
            const total = project.images.length;
            let spanClasses = "";

            if (total === 1) {
              spanClasses = "md:col-span-8 md:col-start-3 md:row-span-2";
            } else if (total === 2) {
              spanClasses =
                idx === 0
                  ? "md:col-span-7 md:row-span-2"
                  : "md:col-span-5 md:row-span-1 md:col-start-8 md:row-start-2";
            } else if (total === 3) {
              spanClasses =
                idx === 0
                  ? "md:col-span-12 md:row-span-2"
                  : "md:col-span-6 md:row-span-1";
            } else {
              // Dynamic asymmetrical bento pattern
              const pattern = [
                "md:col-span-8 md:row-span-2",
                "md:col-span-4 md:row-span-1",
                "md:col-span-4 md:row-span-1",
                "md:col-span-5 md:row-span-2",
                "md:col-span-7 md:row-span-1",
                "md:col-span-7 md:row-span-1",
              ];
              spanClasses = pattern[idx % pattern.length];
            }

            return (
              <div
                key={idx}
                className={`reveal-image relative overflow-hidden bg-accent/30 rounded-xs flex items-center justify-center hover:bg-accent/40 transition-colors duration-500 ${spanClasses}`}
              >
                <img
                  src={img}
                  alt={`${project.title} presentation ${idx + 1}`}
                  className="w-full h-full object-cover rounded-xs shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

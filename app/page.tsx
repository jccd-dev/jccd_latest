import About from "@/components/about";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <Hero />
      <About />
      {/* <Experience /> */}
      <Projects />
    </div>
  );
}

import About from "@/components/about";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://jccdlabs.com/#person",

  name: "John Carlo Digay",

  jobTitle: "Freelance Full-Stack Developer",

  description:
    "Freelance full-stack developer specializing in custom web applications, business systems, and workflow automation.",

  url: "https://jccdlabs.com/",

  sameAs: ["https://github.com/jccd-dev"],
};

export default function Home() {
  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="space-y-10 sm:space-y-16">
        <Hero />
        <About />
        {/* <Experience /> */}
        <Projects />
      </div>
    </>
  );
}

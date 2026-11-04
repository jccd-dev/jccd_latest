import About from "@/components/about";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      {/* <Experience /> */}
      <About />
    </>
  );
}

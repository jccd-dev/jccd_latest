import About from "@/components/about";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <Hero />
      <About />
      {/* <Experience /> */}
      {/* <Projects /> */}
    </div>
  );
}

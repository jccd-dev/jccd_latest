import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="mt-8 w-full">
      <div className="h-32" />
      <div className="container mx-auto px-4 lg:px-6 flex flex-col gap-8">
        <div className="">
          <h2 className="text-4xl xl:text-5xl font-medium tracking-tight leading-[1.05] text-foreground text-pretty max-w-7xl">
            I{" "}
            <span className="text-muted-foreground">enjoy building things</span>{" "}
            that don&apos;t just work—but actually matter to the people using
            them. Turning ideas into something{" "}
            <span className="text-muted-foreground">
              useful, usable, and real
            </span>{" "}
            is what keeps me{" "}
            <span className="text-muted-foreground">excited.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-6 gap-6">
          <div className="lg:col-start-7 md:col-start-1 flex flex-col md:flex-row gap-6 md:col-span-6">
            <div className="w-full lg:w-1/2">
              <Image
                src="/jcportrait.jpg"
                alt="Hero"
                width={500}
                height={0}
                className="w-full h-auto object-cover rounded-sm"
                loading="eager"
              />
            </div>
            <div className="w-full lg:w-1/2 font-pp-neue-montreal text-base  tracking-tight leading-5 text-wrap flex flex-col gap-4 text-muted-foreground">
              <p className="w-full text-left">
                With hands-on experience in full-stack development, I focus on
                creating clean and functional web applications using Laravel and
                JavaScript. What drives me most is seeing something I built
                being used in real situations—whether it helps a team, a
                business, or even just makes a process easier.
              </p>
              <p>
                I&apos;m always exploring new ideas, especially in AI and
                product development, and I enjoy working on projects that have
                the potential to grow into something meaningful.
              </p>
              <Button className="rounded-xs text-base w-fit">
                <Download />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </section>
  );
};

export default About;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { GithubLogo } from "./icons";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="mt-8 w-full">
      <div className="h-32" />
      <div className="container mx-auto px-4 lg:px-0 flex flex-col gap-8">
        <div className="">
          <h2 className="text-4xl xl:text-5xl font-medium tracking-tight leading-[1.05] text-foreground text-pretty">
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
        <div className=""></div>
      </div>
      <div className="h-10"></div>
    </section>
  );
};

export default About;

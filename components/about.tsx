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
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <ProfileImage className="hidden md:block" />

          {/* Content */}
          <div className="flex-1 md:text-left">
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>
            <ProfileImage className="mt-3 mb-8 block md:hidden" />
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Driven by purpose, inspired by impact.
            </h2>
            <p className="text-muted-foreground mb-6 text-justify">
            With over 1.5 years of hands-on experience in full-stack development, I focus on building web applications that are not only functional but truly helpful to others in their work or business. I take pride in seeing people use what I&apos;ve built there&apos;s nothing more rewarding than knowing my code makes a real difference.

            I work primarily with Laravel and JS, and I&apos;m always exploring new ideas and technologies that lead to useful, meaningful products especially ones that can grow into something profitable. Outside of coding, I enjoy diving into AI, brainstorming with like-minded friends, and mobile gaming. I&apos;m here to create, learn, and keep building things that matter.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Button className="rounded-full" asChild>
                <Link href="https://github.com/jccd-dev">
                  <GithubLogo />
                  View Github
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full">
                <Download />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileImage = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-10 w-48 h-48 md:w-64 md:h-64", className)} {...props}>
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
      <Image src="/jcportrait.jpg" alt="" className="object-cover" fill />
    </div>
  </div>
);
export default About;

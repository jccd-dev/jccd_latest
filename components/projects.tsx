import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubLogo } from "./icons";
import { projects, type Project } from "@/lib/data/projects";

/**
 * A reusable card component that displays a summary of a project,
 * its tech stack, and action buttons. It links to a detailed case study.
 */
const ProjectCard = ({
  slug,
  title,
  description,
  image,
  technologies,
  githubUrl,
}: Project) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xs border border-accent bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Link 
            href={`/projects/${slug}`}
            className="text-white font-medium flex items-center gap-2"
          >
            Read Case Study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          <Link href={`/projects/${slug}`}>{title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-xs text-[10px] py-0">
              {tech}
            </Badge>
          ))}
          {technologies.length > 4 && (
            <span className="text-[10px] text-muted-foreground flex items-center">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Button variant="default" size="sm" className="rounded-xs h-9 flex-1 group/btn" asChild>
            <Link href={`/projects/${slug}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          
          {githubUrl && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-xs h-9 w-9 shrink-0 shadow-none"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubLogo className="h-4 w-4" />
                <span className="sr-only">Github</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg max-w-lg mx-auto">
            Showcasing some of my best projects and technical achievements across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Want to see more of my work?</p>
          <Button variant="outline" className="rounded-xs" asChild>
            <Link href="https://github.com/jccd-dev" target="_blank">
              <GithubLogo className="mr-2 h-5 w-5" />
              Check my GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

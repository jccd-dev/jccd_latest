import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { GithubLogo } from "./icons";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {liveUrl && (
            <Button variant="default" className="rounded-full" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                View
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubLogo className="mr-1 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Vetdatalynx",
      description:
        "Empowering Vet Clinics with Smart, Simple Solution. Designed to streamline clinic operations, helping to focus on providing the best care for pet patients.",
      image: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750580125/Screenshot_2025-06-22_161130_mglrf0.png",
      technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "Javascript", "Git action", "Linux", "Git", "Livewire"],
      liveUrl: "https://vetdatalynx.com",
    },
    {
      title: "AI Task Manager",
      description:
        "A simple fun AI app message maker using OpenAI",
      image: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1750581312/scrnli_V4oqAfbFhEVa2d_lainf7.png",
      technologies: ["Next.js", "OpenAI", "Typescript", "Tailwind CSS"],
      liveUrl: "https://whisper-note-kappa.vercel.app/",
      githubUrl: "https://github.com/jccd-dev/whisper-note",
    },
    {
      title: "AJ&P",
      description:
        "A web-based Inventory and Order Management System for veterinary products, focused on streamlining inventory tracking and product distribution organization.",
      image: "https://res.cloudinary.com/df3ak7hgk/image/upload/v1754572366/Screenshot_2025-08-07_13-11-51_ynxm0z.png",
      technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "Javascript", "Git action", "Linux", "Git", "Livewire"],
      liveUrl: "https://ajmp.vetdatalynx.com/user-clinic/login",

    },
  ];

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Showcasing some of my best projects and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

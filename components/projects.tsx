import { ActionLink } from "@/components/action-link";
import { ProjectCard, workHeadingClass } from "@/components/project-card";
import { Reveal, TextReveal } from "@/components/project-motion";
import { clientWork } from "@/lib/data/projects";

const Projects = () => (
  <section id="projects" className="page-container pb-28 pt-8 md:pb-40">
    <TextReveal as="h2" text="Selected work" className={workHeadingClass} />
    <TextReveal
      text="Systems built for clients, shipped and supported"
      className={`${workHeadingClass} text-muted-foreground`}
    />
    <div className="mt-10 grid gap-16 md:mt-16 md:gap-24">
      {clientWork.map((project) => (
        <Reveal key={project.slug}>
          <ProjectCard project={project} featured />
        </Reveal>
      ))}
    </div>
    <div className="mt-14 flex justify-center md:mt-20">
      <ActionLink href="/work">View all work</ActionLink>
    </div>
  </section>
);

export default Projects;

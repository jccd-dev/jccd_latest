import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetails } from "@/components/project-details";
import { getProjectBySlug, projects } from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const screenshot = project.screenshots[0];

  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Projects`,
      description: project.shortDescription,
      images: screenshot ? [{ url: screenshot.src, alt: screenshot.alt }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ProjectDetails } from "@/components/project-details";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { ogImageFor, pageMetadata, SITE_URL } from "@/lib/seo";

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

  return pageMetadata({
    path: `/projects/${slug}`,
    title: `${project.title} case study`,
    description: project.shortDescription,
    image: screenshot
      ? { url: ogImageFor(screenshot.src), alt: screenshot.alt, width: 1200 }
      : undefined,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const url = `${SITE_URL}/projects/${project.slug}`;
  const screenshot = project.screenshots[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: project.title, item: url },
              ],
            },
            {
              "@type": "CreativeWork",
              "@id": `${url}#work`,
              name: project.title,
              description: project.shortDescription,
              url,
              ...(screenshot ? { image: ogImageFor(screenshot.src) } : {}),
              ...(project.year ? { dateCreated: project.year } : {}),
              author: { "@id": `${SITE_URL}/#person` },
            },
          ],
        }}
      />
      <ProjectDetails project={project} />
    </>
  );
}

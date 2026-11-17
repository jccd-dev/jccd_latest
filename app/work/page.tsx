import { workHeadingClass } from "@/components/project-card";
import { TextReveal } from "@/components/project-motion";
import { WorkGrid } from "@/components/work-grid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/work",
  title: "Work",
  description:
    "Web applications and business systems built by John Carlo Digay: client platforms and personal products, each with a full case study.",
});

export default function WorkPage() {
  return (
    <section className="page-container pb-28 pt-28 md:pb-40 md:pt-36">
      <TextReveal as="h1" load text="Work" className={workHeadingClass} />
      <TextReveal
        load
        text="Client systems and my own products"
        className={`${workHeadingClass} mb-10 text-muted-foreground md:mb-16`}
      />
      <WorkGrid />
    </section>
  );
}

import { AvailabilityStop } from "@/components/availability";
import {
  ProjectStatement,
  Reveal,
  TextReveal,
} from "@/components/project-motion";

const techStack = [
  "Next.js",
  "TypeScript",
  "Laravel",
  "PHP",
  "Livewire",
  "Tailwind CSS",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "Nginx",
  "GitHub Actions",
  "Cloudflare",
];

const rowClass =
  "grid gap-3 border-t border-border py-6 md:grid-cols-12 md:gap-8 md:py-8";

const About = () => (
  <section id="about" className="page-container pb-24 md:pb-36">
    <div className="grid gap-x-8 gap-y-8 md:grid-cols-12 md:items-end">
      <TextReveal
        as="h2"
        text="Hey"
        className="text-[clamp(5rem,21vw,13rem)] leading-[0.86] tracking-[-0.04em] md:col-span-5"
      >
        <AvailabilityStop />
      </TextReveal>
      <div className="md:col-span-7 md:pb-3">
        <ProjectStatement text="I enjoy building things that don't just work, but actually matter to the people using them. Turning ideas into something useful, usable, and real is what keeps me excited." />
      </div>
    </div>

    <Reveal className="mt-14 md:mt-24">
      <div className={rowClass}>
        <h3 className="text-muted-foreground md:col-span-3">How I work</h3>
        <div className="grid gap-5 leading-snug md:col-span-9 md:grid-cols-2 md:gap-8">
          <p>
            I enjoy taking ideas and turning them into working products that
            people can actually use. Depending on the project, I may be involved
            in everything from development and database work to deployment,
            infrastructure, testing, and ongoing improvements. The most
            rewarding part for me is seeing something I built make a real
            difference whether it helps a team work more efficiently, improves a
            business process, or simply makes a task easier for the people using
            it.
          </p>
          <p>
            I also like exploring AI, automation, and new product ideas,
            especially when they can be used in practical ways. I try to keep
            the things I build simple, maintainable, and flexible enough to grow
            as the project evolves.
          </p>
        </div>
      </div>
      <div className={`${rowClass} border-b`}>
        <h3 className="text-muted-foreground md:col-span-3">Tech stack</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-xl leading-7 tracking-[-0.01em] md:col-span-9 md:text-2xl md:leading-8">
          {techStack.map((name) => (
            <li
              key={name}
              className="transition-colors duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-highlight"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  </section>
);

export default About;

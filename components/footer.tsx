import { ActionLink } from "@/components/action-link";
import {
  AvailabilityStatus,
  AvailabilityStop,
} from "@/components/availability";
import { FooterWordmark } from "@/components/footer-wordmark";
import { TextReveal } from "@/components/project-motion";
import { SocialLinks } from "@/components/social-links";
import Link from "next/link";

const linkClass =
  "inline-block rounded-xs py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950";

const iconLinkClass =
  "inline-flex size-11 items-center justify-center rounded-xs outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none";

const siteLinks = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Footer = () => (
  <footer className="dark w-full overflow-hidden bg-neutral-950 text-white">
    <div className="page-container pt-24 md:pt-32">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <TextReveal
          as="h2"
          text="Say Hello"
          className="text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-[-0.04em] md:col-span-8"
        >
          <AvailabilityStop />
        </TextReveal>
        <div className="flex flex-col items-start gap-5 md:col-span-4">
          <p className="max-w-sm text-pretty text-xl leading-snug">
            Have a system, product, or idea to build? Tell me about it and
            I&apos;ll get back to you.
          </p>
          <ActionLink href="/contact">Let&apos;s Work Together</ActionLink>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/15 pt-6 md:mt-24 md:grid-cols-12">
        <nav aria-label="Footer" className="md:col-span-4">
          <h3 className="text-sm text-neutral-400">Index</h3>
          <ul className="mt-1.5 text-2xl tracking-[-0.02em]">
            {siteLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  <span className="link-line">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h3 className="text-sm text-neutral-400">Elsewhere</h3>
          <SocialLinks
            className="-ml-2.5 mt-0.5 flex flex-wrap items-center"
            linkClassName={iconLinkClass}
          />
        </div>
        <div className="col-span-2 md:col-span-4">
          <h3 className="text-sm text-neutral-400">Local time</h3>
          <p className="mt-3">
            <AvailabilityStatus />
          </p>
          <p className="mt-1 text-neutral-400">
            Camarines Sur, Bicol, Philippines
            <br />
            13°43′36″N, 123°17′38″E
          </p>
        </div>
      </div>

      <p className="mt-16 text-sm text-neutral-400 md:mt-24">
        &copy; {new Date().getFullYear()} John Carlo. All Rights Reserved.
      </p>
    </div>

    <div className="mt-4 px-4 pb-4 md:px-6 md:pb-6">
      <FooterWordmark />
    </div>
  </footer>
);

export default Footer;

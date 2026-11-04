import type { ComponentType, SVGProps } from "react";
import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  TikTokLogo,
} from "@/components/icons";
import { SOCIAL_PROFILES } from "@/lib/seo";

const logos: Record<
  (typeof SOCIAL_PROFILES)[number]["name"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  GitHub: GithubLogo,
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
  TikTok: TikTokLogo,
};

export function SocialLinks({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={className}>
      {SOCIAL_PROFILES.map(({ name, href }) => {
        const Logo = logos[name];
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={linkClassName}
            >
              <Logo aria-hidden="true" className="size-6" />
              <span className="sr-only">{name} (opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

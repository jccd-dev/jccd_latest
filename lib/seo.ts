import type { Metadata } from "next";

export const SITE_URL = "https://jccdlabs.com";

export const SITE_BRAND = "JccdLabs";

export const SITE_NAME =
  "John Carlo Digay | JccdLabs - Freelance Full-Stack Developer";

export const SITE_DESCRIPTION =
  "Freelance full-stack developer in Camarines Sur, Philippines, building custom web applications and business systems with Next.js and Laravel.";

export const SOCIAL_PROFILES = [
  { name: "GitHub", href: "https://github.com/jccd-dev" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/johncarlo24" },
  { name: "Instagram", href: "https://www.instagram.com/jccdlabs/" },
  { name: "TikTok", href: "https://www.tiktok.com/@jccdlabs404" },
] as const;

export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "John Carlo Digay, freelance full-stack developer",
};

// Cloudinary serves a 1200px JPEG instead of the original 1.2 MB PNG.
export function ogImageFor(src: string) {
  return src.replace("/image/upload/", "/image/upload/f_jpg,q_auto,c_limit,w_1200/");
}

type PageMetadataInput = {
  path: string;
  title?: string;
  description?: string;
  image?: { url: string; alt: string; width?: number; height?: number };
};

// A page that sets openGraph replaces the layout's whole openGraph object, so
// every page builds the complete set here to keep type, url and siteName.
export function pageMetadata({
  path,
  title,
  description = SITE_DESCRIPTION,
  image = OG_IMAGE,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${SITE_BRAND}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_BRAND,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_BRAND,
      alternateName: "John Carlo Digay | JccdLabs",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#org`,
      name: SITE_BRAND,
      url: `${SITE_URL}/`,
      description:
        "Freelance full-stack web development: custom web applications, business systems, and workflow automation.",
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: "Worldwide (remote)",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Camarines Sur",
        addressCountry: "PH",
      },
      sameAs: SOCIAL_PROFILES.map(({ href }) => href),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "John Carlo Digay",
      jobTitle: "Freelance Full-Stack Developer",
      description:
        "Freelance full-stack developer specializing in custom web applications, business systems, and workflow automation.",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/jcportrait.jpg`,
      worksFor: { "@id": `${SITE_URL}/#org` },
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Camarines Sur",
          addressCountry: "PH",
        },
      },
      knowsAbout: ["Next.js", "TypeScript", "Laravel", "Livewire", "PostgreSQL"],
      sameAs: SOCIAL_PROFILES.map(({ href }) => href),
    },
  ],
};

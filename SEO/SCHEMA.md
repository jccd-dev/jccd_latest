# Schema markup: jccdlabs.com

Audit date: 2026-11-04. Sources: JSON-LD found in live HTML of `/`, `/contact` and four project pages; `app/page.tsx`.

## Score: 40/100

## Detected

| Page | JSON-LD blocks | Types |
|---|---|---|
| `/` | 1 (the page also matched `ld+json` twice, the second match is the script tag's own reference) | `Person` |
| `/contact` | 0 | none |
| `/projects/*` (4 pages) | 0 | none |

Current block (`app/page.tsx`):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://jccdlabs.com/#person",
  "name": "John Carlo Digay",
  "jobTitle": "Freelance Full-Stack Developer",
  "description": "Freelance full-stack developer specializing in custom web applications, business systems, and workflow automation.",
  "url": "https://jccdlabs.com/",
  "sameAs": ["https://github.com/jccd-dev"]
}
```

## Validation

- Syntax is valid JSON-LD, uses https `@context`, and `<` is escaped (`<`) so it cannot break out of the script tag. Good.
- `@id` and `url` use a trailing slash while the page canonical (`https://jccdlabs.com`) does not. Harmless but inconsistent; pick one.
- Person has no required properties for a rich result (Google has no Person rich result), so there is nothing to "fail". The value is entity clarity.

## Gaps

1. **No Organization/ProfessionalService node** for the brand "JccdLabs". Today the name JccdLabs only appears in text, so nothing machine-readable ties the brand to the person.
2. **No WebSite node** with `name` and `alternateName`. This is what Google reads for the site name in results.
3. **Person is thin.** Missing: `image`, `address`/`homeLocation`, `worksFor`, `knowsAbout`, and more than one `sameAs` profile.
4. **No schema on project pages.** There is no breadcrumb and no node describing each project, so the pages do not point back to the Person by `@id`.
5. **`sameAs` has only GitHub.** Add LinkedIn and any other real profile you control (same name spelling everywhere).

## Recommended markup

Notes: no rich result is promised for any of these. `SoftwareApplication` rich results need offers/ratings that a portfolio piece does not have, so projects use `CreativeWork`. Do not add FAQ or HowTo schema. Only include profiles, properties and dates that are true; the values marked `TODO` need your input.

### 1. Site-wide graph (put in `app/layout.tsx` instead of `app/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://jccdlabs.com/#website",
      "url": "https://jccdlabs.com/",
      "name": "JccdLabs",
      "alternateName": "John Carlo Digay | JccdLabs",
      "inLanguage": "en",
      "publisher": { "@id": "https://jccdlabs.com/#org" }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://jccdlabs.com/#org",
      "name": "JccdLabs",
      "url": "https://jccdlabs.com/",
      "description": "Freelance full-stack web development: custom web applications, business systems and workflow automation.",
      "founder": { "@id": "https://jccdlabs.com/#person" },
      "areaServed": "Worldwide (remote)",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Camarines Sur",
        "addressCountry": "PH"
      }
    },
    {
      "@type": "Person",
      "@id": "https://jccdlabs.com/#person",
      "name": "John Carlo Digay",
      "jobTitle": "Freelance Full-Stack Developer",
      "url": "https://jccdlabs.com/",
      "image": "https://jccdlabs.com/jcportrait.jpg",
      "worksFor": { "@id": "https://jccdlabs.com/#org" },
      "homeLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Camarines Sur",
          "addressCountry": "PH"
        }
      },
      "knowsAbout": ["Next.js", "TypeScript", "Laravel", "Livewire", "PostgreSQL"],
      "sameAs": [
        "https://github.com/jccd-dev"
        /* TODO: add LinkedIn and other real profiles */
      ]
    }
  ]
}
```

### 2. Project page (`app/projects/[slug]/page.tsx`, built from the `project` object)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jccdlabs.com/" },
        { "@type": "ListItem", "position": 2, "name": "VetdataLynx", "item": "https://jccdlabs.com/projects/vetdatalynx" }
      ]
    },
    {
      "@type": "CreativeWork",
      "@id": "https://jccdlabs.com/projects/vetdatalynx#work",
      "name": "VetdataLynx",
      "description": "A veterinary clinic management platform that keeps patient care, appointments, inventory, billing, and daily operations in one system.",
      "url": "https://jccdlabs.com/projects/vetdatalynx",
      "image": "https://res.cloudinary.com/df3ak7hgk/image/upload/v1790337967/vetdatalynx_1_edqjor.png",
      "author": { "@id": "https://jccdlabs.com/#person" },
      "dateCreated": "TODO-year-from-project.year"
    }
  ]
}
```

Generate this from `project.title`, `project.shortDescription`, `project.screenshots[0].src` and `project.year` (set `year` first). Use the same `JSON.stringify(...).replace(/</g, "\\u003c")` pattern already used in `app/page.tsx`.

### 3. Contact page (optional, low value)

A `ContactPage` node with `mainEntity: { "@id": "https://jccdlabs.com/#person" }` is valid. Add it only if cheap.

## Implementation notes
- Keep one `@graph` per page and link nodes by `@id`; do not duplicate the Person on project pages.
- Make `@id`/`url` match the canonical form you choose (trailing slash or not).
- After deploying, test in Google's Rich Results Test and the Schema Markup Validator. I did not run those tools.

## Not checked
Google Rich Results Test and Schema Validator output (not run), whether Search Console reports any structured-data items, and any schema injected after hydration (only server HTML was examined).

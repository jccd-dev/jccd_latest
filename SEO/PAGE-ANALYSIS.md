# Single-page analysis: https://jccdlabs.com/

Audit date: 2026-11-04. Homepage only; inner pages were sampled for titles, descriptions and Open Graph tags.

## Overall score: 66/100

```
On-Page SEO:     72/100  ███████░░░
Content Quality: 62/100  ██████░░░░
Technical:       68/100  ███████░░░
Schema:          45/100  ████░░░░░░
Images:          70/100  ███████░░░
```

Note: the dedicated image audit (`IMAGES.md`, 52/100) and schema audit (`SCHEMA.md`, 40/100) went deeper than this first pass and scored lower after checking every image file size and every page.

## Issues

**Critical**
- The social preview image is 1.9 MB (`/jcportrait.png`, used for `og:image` and `twitter:image`). Replace it with a 1200x630 JPG/WebP under 200 KB.

**High**
- No dedicated target for service queries; the H1 is a greeting. Add a "what I build" section.
- Schema is a single Person node with one `sameAs` link.
- Inner pages have no canonical URL and their `og:url` points to the homepage.

**Medium**
- Meta description is 168 characters (target 150-160) and repeats title wording.
- Project titles run about 82-86 characters and will truncate; the contact title is 99.
- No dates or "last updated" anywhere.
- No byline, credentials or experience statement.
- About copy is generic.

**Low**
- Alt text on project images is mechanical ("Eagles Nexus mockup 1"); "Criter Hub" is a misspelling of CritterHub.

## What is good
- One H1 and a logical heading order, `lang="en"`, viewport meta, `robots: index, follow`.
- Images have alt text; below-the-fold images are lazy; the hero image is preloaded.
- 25 internal links from the homepage, so no orphan pages.
- Sitemap lists all six URLs; robots.txt points to it.

## Core Web Vitals (flags only, nothing measured)
- LCP: hero is preloaded; confirm it is the 293 KB JPG and not the 1.9 MB PNG.
- INP: 11 script tags; animation libraries add main-thread work.
- CLS: images use Next `fill` layout; no obvious risk.

## Recommendations, in order
1. Compressed 1200x630 social image; update `app/layout.tsx`.
2. Per-page canonical and `og:url` on `/contact` and `/projects/[slug]`.
3. Description of about 155 characters, for example: "Freelance full-stack developer in the Philippines building custom web apps and business systems with Next.js, Laravel and Supabase." (Check the stack claim is accurate; Supabase appears only on the Eagles Nexus card.)
4. Factual intro in the About section.
5. Better alt text and project dates.
6. Extended schema (see `SCHEMA.md`).

## Not checked
Lighthouse or field Core Web Vitals, rankings, backlinks, spelling and grammar, and detailed audits of the inner pages (covered in `CONTENT.md` and `TECHNICAL.md`).

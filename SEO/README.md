# SEO audit: jccdlabs.com (2026-11-04)

| Report | Score | Focus |
|---|---|---|
| [PAGE-ANALYSIS.md](PAGE-ANALYSIS.md) | 66/100 | Homepage on-page overview |
| [GEO-ANALYSIS.md](GEO-ANALYSIS.md) | 58/100 | AI search readiness, crawler access, entity signals |
| [IMAGES.md](IMAGES.md) | 52/100 | Image weight, formats, alt text |
| [CONTENT.md](CONTENT.md) | 61/100 | Copy, metadata, proof, freshness |
| [SCHEMA.md](SCHEMA.md) | 40/100 | JSON-LD gaps and ready-to-use markup |
| [TECHNICAL.md](TECHNICAL.md) | 70/100 | Crawl, index, redirects, headers |

## Fix first (appears in several reports)
1. Compress images: Cloudinary `f_auto,q_auto,w_*` on all 22 screenshots (1.2-1.7 MB PNGs) and a new 1200x630 OG image under 200 KB (current one is 1.9 MB).
2. Add `canonical` and correct `og:url` on `/contact` and `/projects/[slug]`.
3. Extend schema: WebSite + ProfessionalService + fuller Person in the layout; breadcrumb and CreativeWork on project pages.
4. Add a quotable "who/what/where/stack" paragraph and a "What I build" section; set project `year`.
5. Shorten titles (new `title.template`), fix the 168-character description, fix sitemap `lastmod`.

Scores are judgments from the checks listed in each report, not measurements from Lighthouse or Search Console.

## Status (2026-11-04): fixes applied in code, not yet deployed
Done: new 1200x630 `public/og.jpg`; Cloudinary image loader (`f_auto,q_auto`, sized by `sizes`); per-page canonical, `og:url`, OG/Twitter tags via `pageMetadata` in `lib/seo.ts`; shorter titles (`%s | JccdLabs`) and a 142-character home description; sitemap without the fake `lastmod`; site-wide JSON-LD graph (WebSite, ProfessionalService, Person) plus breadcrumb and CreativeWork on project pages; alt text typos fixed; LinkedIn, Instagram, TikTok and GitHub logos in the menu panel and footer.
Still yours: HSTS and `www` DNS/redirect in Cloudflare, project `year` values, real screenshot alt text, About/"What I build" copy, dates, and a Lighthouse run after deploy.

# GEO Analysis: jccdlabs.com

Audit date: 2026-11-04. Method: live fetches of `/`, `/contact`, `/projects/*`, `robots.txt`, `sitemap.xml`, `llms.txt`, plus a repo read. Frame: Google says optimizing for AI search is still SEO, so these are SEO fundamentals applied to AI surfaces.

## GEO Readiness Score: 58/100

| Area | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 13/25 | Good facts per project, no direct "who/what/where" answer block, no dates |
| Structural readability | 20% | 14/20 | Clean H1/H2 on home; project pages have Problem/Solution/Outcome headings |
| Multi-modal | 15% | 9/15 | 5 images with alt text on home, project screenshots on Cloudinary, no video |
| Authority and brand | 20% | 6/20 | One `sameAs` (GitHub), no LinkedIn/other profiles, no dates, no byline on projects |
| Technical access | 20% | 16/20 | Server-rendered HTML, all bots allowed, but canonical and schema gaps |

Platform scores (Google AIO, ChatGPT, Perplexity) were **not measured**; no DataForSEO/SE Ranking tool was used. Qualitatively: Google can index the pages (HTML fully server-rendered, 200 for Googlebot UA); ChatGPT/Perplexity/Claude can fetch the raw HTML, but a personal-name query has little third-party corroboration to cite.

## AI crawler access (per user agent, per capability)

`robots.txt` is `User-Agent: * / Allow: /` plus the sitemap. No per-bot rules, so everything is allowed. A UA-spoofed fetch returned 200 and identical 134,510 bytes for each bot below (this tests Cloudflare bot rules at the HTTP level, not IP-verified crawling).

| Bot | Governs | Status |
|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | Allowed |
| OAI-SearchBot | ChatGPT Search citability | Allowed |
| GPTBot | OpenAI training | Allowed |
| Claude-SearchBot | Claude search citability | Allowed |
| ClaudeBot | Anthropic training | Allowed |
| PerplexityBot | Perplexity search | Allowed |
| Google-Extended, CCBot, Applebot-Extended | Training opt-outs | Allowed (no rule) |

Training allow/block is a licensing preference. Nothing needs changing for search visibility. User-triggered fetchers (ChatGPT-User, Perplexity-User, Google-Agent) ignore or may ignore robots.txt anyway.

## llms.txt status

Missing (404). Optional. Google states it does not help or hurt Search, and no major provider confirms using it. Low priority; a template is at the end if you want it for non-Google tools.

## Server-side rendering

Pass. The homepage HTML carries the full text (about 839 words), headings, project descriptions and the JSON-LD with no JavaScript needed. Next.js static output on Cloudflare.

## Findings

### Technical (fix these first, small and certain)

1. **No canonical on `/contact` or `/projects/*`.** Only the homepage sets one (`app/page.tsx`). Add `alternates.canonical` in `generateMetadata` and the contact metadata.
2. **`og:url` on every inner page is the homepage** (`https://jccdlabs.com`), inherited from `app/layout.tsx`. Contact also reuses the homepage OG title/description. Set per-page `openGraph.url`, or drop `url` from the layout.
3. **`twitter:image` on project pages is the portrait**, while `og:image` is the project screenshot. Add `twitter.images` in `generateMetadata`.
4. **Homepage canonical and `og:url` have no trailing slash while the Person `@id`/`url` do** (`https://jccdlabs.com/`). Harmless, but pick one form.
5. **Sitemap `lastmod` is the build time for every URL** (2026-11-04T02:09:26Z on all six). Search engines learn to ignore it. Use real per-project dates, or omit `lastmod`.
6. **`whisper-note` and `ajmp-inventory` exist in `lib/data/projects` but are not in the sitemap or live.** Confirm that is intended.

### Schema

7. Only one Person node, with `sameAs` of GitHub alone. Add: `image`, `address` (Camarines Sur, Philippines), `knowsAbout`, `worksFor`/`founder` pointing to an Organization node, and more `sameAs` (LinkedIn and any other real profile you have).
8. Add an `Organization` (or `ProfessionalService`) node for JccdLabs with `@id` `/#org`, `logo` (`/JCCDLABS.svg` is an SVG; crawlers prefer PNG/JPG for logos), `founder` linking `/#person`. This ties the brand name to the person, which is the entity gap right now.
9. Add a `WebSite` node with `name` and `alternateName: ["JccdLabs", "JCCD Labs"]`.
10. Project pages have no JSON-LD. Add `CreativeWork`/`SoftwareApplication` with `author` = `/#person`, `dateCreated`, `url`. Add `BreadcrumbList` (Home > Projects > name).
11. Skip FAQ schema; it is not rich-result eligible for this site type.

### Content and citability

12. **No direct answer block.** The hero says "AI-Augmented Full-Stack Developer and Freelancer based in the Philippines" but never states in one quotable passage who he is, what he builds, with which stack, for whom, and how to hire him. Add a 50-80 word self-contained paragraph near the top, for example:
    > John Carlo Digay is a freelance full-stack developer in Camarines Sur, Philippines, working under the name JccdLabs. He builds custom web applications and business systems (membership platforms, veterinary clinic software, inventory tools) using Next.js, Laravel, Livewire and Supabase, and works remotely with clients anywhere.

    Only publish facts that are true; the stack list above comes from the project tags on the site.
13. **Project pages are the strongest citable content** (Problem, Solution, Outcome structure), but the home page cards reduce them to teasers. Make sure each project page states client type, your role, stack, dates and a measurable outcome where you have one. No numbers were found to quote; add real ones only if you have them.
14. **No dates anywhere** (no `<time>`, no published/updated). Add launch year per project and a visible "Updated" line. Freshness signals matter for AI answer selection.
15. **Heading quality:** `Hey.`, `Say Hello.`, `Index`, `Elsewhere` are decorative and not useful to retrieval. Keep them if the design needs them, but add descriptive H2s where the content is substantive (for example "Web applications and business systems I build").
16. **Home title is the site name repeated** (`John Carlo Digay | JccdLabs - Freelance Full-Stack Developer`), and project titles append the whole thing (`VetdataLynx | Projects | John Carlo Digay | JccdLabs - Freelance Full-Stack Developer`, 95 chars, will truncate). Use `template: "%s | JccdLabs"`.
17. **`/contact` has about 148 words**, fine for a contact page. Add `ContactPage` schema only if you want; low value.

### Brand and entity (not measured, needs your input)

Not checked with a tool: Wikipedia/Wikidata (unlikely to qualify for a personal freelancer), Reddit, YouTube, LinkedIn. Third-party studies say off-site mentions correlate more with AI visibility than backlinks, but that is correlation. Practical steps that are within reach:

- Create or complete a LinkedIn profile and use identical name/brand/location wording on it, GitHub, and the site, then link all of them in `sameAs`.
- Give clients with live products (CritterHub, VetdataLynx, Aparador) a link back to the project page or a credit line where they agree.
- Publish one or two write-ups (case study on your own site, a dev.to or similar post) on a problem you actually solved, linking to the project pages.
- Search `"JccdLabs"` and `"John Carlo Digay"` in Google, ChatGPT and Perplexity yourself and note what comes back; that is the real baseline and I could not measure it here.

## Top 5 highest-impact changes

1. Add a quotable "who/what/where/stack" paragraph to the homepage (finding 12).
2. Add `Organization` + `WebSite` nodes and widen Person `sameAs`/properties; link them by `@id` (findings 7-9).
3. Fix per-page canonical, `og:url`, `twitter:image` (findings 1-3).
4. Add dates to projects and real `lastmod` in the sitemap (findings 5, 14).
5. Build off-site profile consistency: LinkedIn plus any other real profiles in `sameAs`, then one case-study write-up.

## Implementation notes for this repo

- Files: `app/layout.tsx`, `app/page.tsx` (schema lives here), `app/projects/[slug]/page.tsx` (`generateMetadata`), `app/contact/page.tsx`, `app/sitemap.ts`, `lib/seo.ts`.
- Move the JSON-LD graph into one `@graph` in `app/layout.tsx` (Person, Organization, WebSite) and keep page-level nodes in their pages.
- Run `npm run lint` after edits; run `npm run build` if you touch `sitemap.ts` or metadata exports.

## Optional: llms.txt template (non-Google tools only)

```
# JccdLabs
> Freelance full-stack development by John Carlo Digay, Camarines Sur, Philippines.

## Work
- [Eagles Nexus](https://jccdlabs.com/projects/eagles-nexus): Membership management platform.
- [CritterHub](https://jccdlabs.com/projects/critterhub): Appointments, billing and inventory for groomers and small clinics.
- [VetdataLynx](https://jccdlabs.com/projects/vetdatalynx): Veterinary clinic management platform.
- [Aparador](https://jccdlabs.com/projects/aparador)

## Contact
- [Contact](https://jccdlabs.com/contact)
```

## Not checked

DataForSEO/AI-visibility tools, live AI-assistant query tests, Core Web Vitals, backlinks, the contact form flow, and IP-verified crawler access through Cloudflare.

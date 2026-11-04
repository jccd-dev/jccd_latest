# Content quality: jccdlabs.com

Audit date: 2026-11-04. Sources: live HTML text of `/`, `/contact` and the four project pages. Readability scores (Flesch) were not computed; judgments below are by reading.

## Score: 61/100

| Area | Score | Notes |
|---|---|---|
| Depth and structure | 70 | Project pages follow Overview, Problem, Responsibility, Solution, Product, Engineering, Deployment, Post-launch, Outcome |
| Specificity and proof | 45 | No numbers, dates, client names or testimonials found |
| E-E-A-T | 50 | First-hand work is shown, but no experience statement, credentials or third-party validation |
| Search intent match | 55 | Strong for the name query, weak for service queries |
| Freshness | 40 | No visible dates anywhere |
| Metadata quality | 65 | Titles and descriptions mostly present, several too long or too short |

## Word counts

| Page | Words (visible text) | Judgment |
|---|---|---|
| `/` | about 839 | Fine for a portfolio home |
| `/projects/eagles-nexus` | about 576 | Good |
| `/projects/critterhub` | about 557 | Good |
| `/projects/vetdatalynx` | about 585 | Good |
| `/projects/aparador` | about 689 | Good |
| `/contact` | about 148 | Fine for a contact page |

## Metadata

| Page | Title | Chars | Description | Chars |
|---|---|---|---|---|
| `/` | John Carlo Digay \| JccdLabs - Freelance Full-Stack Developer | 60 | "John Carlo Digay is a freelance full-stack developer behind JccdLabs, ..." | **168** (too long) |
| `/contact` | Contact \| John Carlo Digay Portfolio \| John Carlo Digay \| JccdLabs - Freelance Full-Stack Developer | **99** | "Get in touch with John Carlo Digay about full-stack web development projects and freelance work." | **96** (a bit short) |
| `/projects/eagles-nexus` | Eagles Nexus \| Projects \| John Carlo Digay \| JccdLabs - ... | **86** | 121 chars | short |
| `/projects/critterhub` | CritterHub \| Projects \| ... | **84** | 150 chars | good |
| `/projects/vetdatalynx` | VetdataLynx \| Projects \| ... | **85** | 134 chars | OK |
| `/projects/aparador` | Aparador \| Projects \| ... | **82** | 131 chars | OK |

Causes: `app/layout.tsx` has `title.template: "%s | <SITE_NAME>"` and `SITE_NAME` is already the long "John Carlo Digay | JccdLabs - Freelance Full-Stack Developer". The project pages also add their own "| Projects". Result: the person's name appears twice in the contact title and the tail is cut off in search results. A shorter template (`"%s | JccdLabs"`) and titles like "CritterHub: appointments and billing for clinics" fix it.

The homepage description also repeats the title phrase "Freelance Full-Stack Developer"-style wording (flagged by the metadata check as a brand suffix in the description).

## Findings

### High
1. **No content aimed at what a hiring client would search.** The H1 is a greeting: "Hello I'm John Carlo, an AI-Augmented Full-Stack Developer and Freelancer based in the Philippines." There is no heading or paragraph about the services (custom web applications, business systems, workflow automation) that the meta description promises. Add one short section, for example "What I build", with the three or four service types and the stack, in plain sentences.
2. **The About text is generic.** "I enjoy building things that don't just work, but actually matter" and "How I work" say nothing a stranger can verify. Add facts only you can supply: years working, kinds of clients, what you ship alone vs. in a team, one concrete result per project.
3. **No proof signals.** No client logos or quotes, no metrics (users, records, hours saved), no dates. Even one real sentence per project ("used daily by N staff", "launched Month Year") raises trust and gives AI answers something to cite. Do not publish numbers you cannot back up.

### Medium
4. **No dates.** The `Project` type has an optional `year` field (`lib/data/projects/types.ts`), but none of the project data files set it. Fill it in and show it on the card and project page. Add a visible "Last updated" on the home page if you update regularly.
5. **Titles and descriptions as in the table above.** Contact and project pages need their own descriptions that do not reuse the home phrasing, and titles under about 60 characters.
6. **Project status clarity.** Eagles Nexus is "In development"; the page text says "production delivery" in its role line. Make sure the wording matches reality so the page does not overclaim.
7. **Decorative headings.** "Hey.", "Say Hello.", "Index", "Elsewhere" and "Local time" carry no topic. Fine for design, but add at least one descriptive H2 per main section for scanners and search engines.

### Low
8. **Repeated block on every page.** The footer CTA ("Have a system, product, or idea to build?...") and "Based in the Philippines / Camarines Sur, Bicol" repeat sitewide. That is normal; keep the unique content ratio high on the thin contact page.
9. **Consistent naming.** "VetdataLynx", "Vetdatalynx" (alt text) and "CritterHub"/"Criter Hub" vary. Pick one spelling per product.
10. **Voice.** The copy reads personal and plain, which suits a freelancer. The feature descriptions ("Manage bookings, schedules, and appointment details...") are generic feature-list wording; swap one or two for what you specifically built and why.

## What is already good
- Project pages have a clear problem-to-outcome structure, role statement and tech stack, which is the right shape for case studies.
- Home page lists each project's role, audience and features in scannable blocks.
- Real location (Camarines Sur, Philippines), working hours and availability on the contact page support trust.
- No keyword stuffing or boilerplate padding found.

## Suggested next content (small)
1. A 50-80 word "who/what/where/stack" paragraph near the top of the home page (draft is in `GEO-ANALYSIS.md`).
2. A "What I build" section with 3-4 short service lines.
3. A year, status and one-line outcome on each project.
4. Rewrite the contact description and shorten titles.

## Not checked
Facts in the project copy (whether outcomes and roles are accurate), Flesch scores, plagiarism or AI-text detection, ranking for any keyword, and search demand. No keyword research was done, so the service phrases above are suggestions, not validated targets.

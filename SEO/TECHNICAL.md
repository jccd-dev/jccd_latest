# Technical SEO: jccdlabs.com

Audit date: 2026-11-04. Sources: `curl` of the live site (headers, redirects, HTML), DNS lookups, `next.config.ts`, `app/*`.

## Score: 70/100

| Area | Score | Notes |
|---|---|---|
| Crawlability | 90 | robots.txt allows all, sitemap present, bots get 200 |
| Indexability | 65 | canonicals missing on 5 of 6 pages, sitemap `lastmod` unreliable |
| Security | 50 | HTTPS enforced, but only 2 of the usual headers set |
| URL and redirects | 70 | http to https works, www host does not resolve |
| Mobile and rendering | 85 | viewport set, server-rendered HTML |
| Performance (indicative) | 55 | very large images, 134 KB home HTML; no Lighthouse run |

## Crawlability
- `robots.txt`: `User-Agent: * / Allow: /` and the sitemap URL. Fine. Nothing to block on this site.
- `sitemap.xml`: 6 URLs (`/`, `/contact`, 4 projects), valid XML, referenced from robots.txt.
- Googlebot, GPTBot, ClaudeBot and others all got 200 with the same 134,510-byte homepage (user-agent test only).
- Stack: Next.js static export (`output: "export"`) on Cloudflare. HTTP/2, `alt-svc` advertises HTTP/3, Brotli on HTML.

## Redirects and hosts

| Request | Result |
|---|---|
| `http://jccdlabs.com/` | 301 to `https://jccdlabs.com/` (good) |
| `https://jccdlabs.com/index.html` | 308 to `https://jccdlabs.com/` (good) |
| `https://jccdlabs.com/nonexistent-xyz` | 404 (good, real status code) |
| `https://www.jccdlabs.com/` | **Does not resolve** (no DNS record for `www`) |

**Fix:** if anyone links to or types `www.jccdlabs.com`, they get an error. Add a proxied `www` record in Cloudflare and a redirect rule `www` to apex (301). Not urgent if you never published a `www` URL.

## Indexability

| Check | Result |
|---|---|
| Meta robots | `index, follow` everywhere |
| Canonical on `/` | `https://jccdlabs.com` (present) |
| Canonical on `/contact`, `/projects/*` | **Missing** (5 pages) |
| Duplicate `og:url` | Every inner page says `https://jccdlabs.com` (inherited from layout) |
| Sitemap `lastmod` | Same build timestamp on all 6 URLs (`2026-11-04T02:09:26Z`), so it carries no information |
| Pages not in sitemap | `whisper-note` and `ajmp-inventory` exist in `lib/data/projects` but are not published; confirm that is intended |

Fixes (all in Next metadata):
- `app/contact/page.tsx`: add `alternates: { canonical: "/contact" }` and `openGraph.url`.
- `app/projects/[slug]/page.tsx` `generateMetadata`: add `alternates: { canonical: "/projects/" + slug }` and `openGraph.url`.
- `app/layout.tsx`: remove `openGraph.url` from the layout default so pages do not inherit the home URL.
- `app/sitemap.ts`: use a real per-page date, or omit `lastmod`.

## 404 handling
The 404 response is correct (status 404, `noindex`), but the HTML contains **two `<title>` tags** (the site title from the layout, then "404: This page could not be found.") and **two robots meta tags** (`noindex` and `index, follow`). Search engines take the stricter rule and the status code is a 404 anyway, so the impact is low. A custom `app/not-found.tsx` with its own metadata cleans it up.

## Security headers (home page response)

| Header | Status |
|---|---|
| HTTPS / redirect | Yes |
| `Strict-Transport-Security` | **Missing**. Enable HSTS in Cloudflare (SSL/TLS, Edge Certificates). |
| `X-Content-Type-Options: nosniff` | Present |
| `Referrer-Policy: strict-origin-when-cross-origin` | Present |
| `Content-Security-Policy` | Missing (needs care with inline Next scripts; not an SEO factor) |
| `X-Frame-Options` / `frame-ancestors` | Missing |
| `Permissions-Policy` | Missing |
| `Access-Control-Allow-Origin: *` on HTML | Present; unusual for HTML pages, harmless for a static public site |

These are low priority for rankings but cheap to add through a `public/_headers` file (if Cloudflare Pages) or a Cloudflare Transform Rule. I did not find a `_headers` or `wrangler` config in the repo, so confirm how the site is deployed before choosing.

## Rendering and mobile
- All visible content is in the server HTML (no JavaScript needed to read it).
- `<meta name="viewport" content="width=device-width, initial-scale=1">` and `<html lang="en">` present.
- Mobile layout was not tested in a browser during this audit.

## Performance flags (no lab or field data collected)
- **Images dominate weight:** project screenshots are 1.2-1.7 MB PNGs and the OG image is 1.9 MB. See `IMAGES.md`.
- **HTML size:** home 134 KB, project pages about 80-86 KB. Much of that is the inlined Next payload for all project data; fine, but it grows with every project.
- **Scripts:** 11 script tags, none `async`/`defer` (Next marks its own chunks as needed). The GSAP/Motion and smooth-scroll libraries add main-thread work, so check INP.
- **Cache:** HTML is `max-age=0, must-revalidate`, which is right for HTML. Static assets were not checked.
- **Fonts:** one local WOFF is preloaded with `display: swap`. Good.

## Priority list
1. Add canonicals and correct `og:url` on `/contact` and `/projects/*` (small code change).
2. Compress images (Cloudinary `f_auto,q_auto,w_*`) and replace the 1.9 MB OG image.
3. Fix the sitemap `lastmod`.
4. Enable HSTS in Cloudflare.
5. Add a `www` DNS record plus redirect if you ever use that host.
6. Custom 404 page.
7. Run Lighthouse / PageSpeed Insights on `/` and one project page for real CWV numbers.

## Not checked
Core Web Vitals (lab or field), Search Console coverage and indexing status, JavaScript/CSS asset caching headers, the `/api/contact` endpoint's behavior, internationalization (single-language site, no hreflang needed), IP-verified crawler access through Cloudflare bot rules, and mobile rendering in a browser.

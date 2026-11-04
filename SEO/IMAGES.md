# Image SEO: jccdlabs.com

Audit date: 2026-11-04. Sources: live HTML of `/` and the four project pages, `HEAD`/`GET` of each image, `next.config.ts`.

## Score: 52/100

## Inventory

| Asset | Where used | Format | Size | Verdict |
|---|---|---|---|---|
| `/jcportrait.png` | `og:image`, `twitter:image` on `/` and `/contact` | PNG | **1,908,586 B** | Critical (>500 KB) |
| `/jcportrait.jpg` | Hero portrait (preloaded) | JPEG | 292,951 B | Warning (>200 KB) |
| 22 project screenshots on Cloudinary | Home cards, project pages, `og:image` of project pages | PNG, 1672x941 or 1448x1086 | **1.17 MB to 1.69 MB each** (about 29 MB in total) | Critical (all >500 KB) |
| `/favicon.ico` | Favicon | ICO | 15,406 B | OK, but see below |
| `/jc.png` | Not referenced on the pages audited | PNG | 34,367 B | Unused? |

Measured sizes of the Cloudinary files range from 1,166,467 B (`mockup_6_l4jbhy.png`) to 1,687,602 B (`mockup_2_ednjbp.png`).

## Issues

### Critical
1. **Every project screenshot is a 1.2-1.7 MB PNG served as-is.** `next.config.ts` sets `output: "export"` and `images.unoptimized: true`, so Next does no resizing, no WebP/AVIF and no `srcset`. The first screenshot on each project page is not lazy-loaded (`loading` unset), so it is the likely LCP element and a 1.2-1.6 MB download.
   - Fix without touching Next: ask Cloudinary for a smaller version in the URL, for example `.../image/upload/f_auto,q_auto,w_1600/v1790337967/vetdatalynx_1_edqjor.png`. `f_auto` serves AVIF/WebP, `q_auto` picks quality. Typical result is 80-150 KB per image.
   - For the home cards, request a width close to the card size (`w_900`) rather than the full 1672 px.
2. **The `og:image` is a 1.9 MB PNG** (`/jcportrait.png`). Some scrapers skip images that large and the preview shows blank. Create a 1200x630 JPG or WebP under 200 KB (for example `public/og.jpg`) and point `openGraph.images` and `twitter.images` in `app/layout.tsx` at it.

### High
3. **Project pages: `twitter:image` is the portrait, not the project screenshot**, while `og:image` is the screenshot. Set `twitter.images` in `generateMetadata`.
4. **The hero portrait JPG is 293 KB.** It is the preloaded LCP image on the home page. Re-export at the displayed size (check the rendered width) and try WebP/AVIF; 80-120 KB is realistic for a portrait.

### Medium
5. **Alt text is generic.** `Eagles Nexus mockup 1`, `Criter Hub mockup 3`, `Aparador mockup 5` name the file, not the content. Describe the screen: "Eagles Nexus member list with search and filters". Each `ProjectScreenshot` in `lib/data/projects/*.ts` already has an `alt` field plus optional `title`/`description`, so this is a data edit.
6. **Typos in alt text:** "Vetdatalynx **perations** interface 2" (VetdataLynx image 2) and "**Criter Hub**" instead of "CritterHub" on all six CritterHub images.
7. **No `width`/`height` attributes** on any `<img>`. The images use Next's `fill` layout inside sized containers, so layout shift is only a risk if a container lacks a fixed aspect ratio. Not measured here; confirm with Lighthouse.
8. **Duplicate gallery images with empty `alt`.** Eagles Nexus, CritterHub and Aparador render each of screenshots 2-6 twice (the second set with `alt=""`), VetdataLynx 2-4 twice. Empty alt is correct for purely decorative copies (for example a thumbnail strip), and the browser caches the same URL, so cost is low. Confirm they are decorative.

### Low
9. **Icons:** only `favicon.ico`. Add a 180x180 `apple-touch-icon` and 192/512 PNG icons if you want clean home-screen and search-result icons. Google asks for a favicon at least 48x48 px, which the ICO has.
10. **`/jc.png`, `/placeholder.svg`, `/text.svg`** look unused on the audited pages. Delete them if nothing references them (check with a repo grep first).
11. **Logo as SVG:** `JCCDLABS.svg` is fine for the site, but a PNG/JPG is safer if you later reference it as a schema `logo`.

## What is already good
- Hero image has descriptive alt: "Portrait of John Carlo Digay, a freelance full-stack developer behind JccdLabs".
- Below-the-fold home cards and gallery images use `loading="lazy"`.
- The hero image is preloaded (`<link rel="preload" as="image" href="/jcportrait.jpg">`).
- Brotli compression is on for HTML (JS/CSS not checked).

## Fix order
1. Cloudinary `f_auto,q_auto,w_*` on every screenshot URL (biggest win, no layout code changes).
2. New 1200x630 OG image under 200 KB; update layout and per-page metadata.
3. Rewrite alt text and fix the typos.
4. Re-export the portrait smaller.

## Not checked
Rendered image dimensions against intrinsic size, real LCP element and timing, CLS, image sitemap (not needed for this site), and whether the duplicate gallery images are thumbnails.

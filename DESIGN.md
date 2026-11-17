# Design System: JC.DEV Portfolio

## 1. Design Read

Reading this as a developer portfolio for prospective clients and hiring teams, with a restrained editorial and technical language, built from native Tailwind CSS tokens, Radix primitives, and Motion only where interaction benefits.

This is a preserve-brand system. Keep the current identity, content structure, logo treatment, and direct first-person voice. Modernization should refine typography, spacing, contrast, and motion before changing composition.

### Design dials

- `DESIGN_VARIANCE: 6`: offset and asymmetric, but easy to scan.
- `MOTION_INTENSITY: 5`: fluid entrances and tactile feedback, never cinematic for its own sake.
- `VISUAL_DENSITY: 4`: compact enough for quick portfolio review, with enough space for work samples to breathe.

## 2. Brand Foundation

### Identity

- Brand mark: `JC.DEV` as a compact text wordmark.
- Logo treatment: plain, high-contrast type. No container, badge, glow, gradient, or replacement symbol.
- Voice: concise, direct, personal, technically credible.
- Primary visual language: neutral monochrome, crisp typography, quiet borders, strong project imagery.

### Preservation contract

Do not change these without explicit approval:

- URL structure and route slugs.
- Primary navigation labels: `Experience`, `Projects`, `About`.
- Anchor IDs: `#experience`, `#projects`, `#about`.
- Primary contact label: `Let's Work Together`.
- Form field names and order if forms are added or restored.
- `JC.DEV` logo text and treatment.
- Legal and consent copy.

## 3. Color Palette and Roles

Use one neutral family across the full page, plus two chromatic signals. **Highlight copper** (`--highlight`, matched by eye to the portrait backdrop) is the one accent: the role in the hero headline, each project name, and hover states on icons, tech names, and footer letters. Working-hours green stays a live signal only: the status dot and the full stop in `Hey.` and `Say Hello.` turn green from 8 AM to 5 PM Manila time and neutral grey otherwise. The status text is always the neutral local time, never "Available" or "Offline", so visitors in other time zones are not told he is unavailable. Project cover tiles carry each product's own flat colour (`tileColor`).

### Light theme

- **Warm Canvas**: `oklch(0.997 0.004 95.1)` (approximately `#FFFEFA`). Main page background.
- **Ink**: `oklch(0.145 0 0)` (approximately `#0A0A0A`). Primary text and solid actions.
- **Pure Surface**: `oklch(1 0 0)` (`#FFFFFF`). Elevated menus and popovers only.
- **Muted Surface**: `oklch(0.97 0 0)` (approximately `#F5F5F5`). Quiet interactive and grouped surfaces.
- **Muted Ink**: `oklch(0.556 0 0)` (approximately `#737373`). Secondary copy.
- **Border**: `oklch(0.922 0 0)` (approximately `#E5E5E5`). Structural separators and input outlines.
- **Highlight**: `oklch(0.55 0.13 50)`. Copper, darkened to pass AA on the warm canvas.

### Dark theme

- **Deep Canvas**: `oklch(18.52% 0.003 145.47)` (approximately `#1B1E1B`). Main page background.
- **Soft White**: `oklch(0.997 0 0)` (approximately `#FEFEFE`). Primary text.
- **Dark Surface**: `oklch(0.269 0 0)` (approximately `#303030`). Quiet interactive and grouped surfaces.
- **Muted Light**: `oklch(0.708 0 0)` (approximately `#A3A3A3`). Secondary copy.
- **Dark Border**: `oklch(0.269 0 0)` (approximately `#303030`). Structural separators and input outlines.
- **Highlight**: `oklch(0.76 0.13 62)`. Copper, lifted for dark surfaces.

### Color rules

- Respect system theme through the existing root theme provider.
- Keep one page theme at a time. The one exception is the footer, which is always near-black (`neutral-950`) in both themes.
- Preserve contrast hierarchy in both modes.
- Body text must meet WCAG AA. Hero copy should target WCAG AAA.
- Never add AI-purple gradients, neon glows, mixed warm and cool gray families, or arbitrary section colors.

## 4. Typography

### Type stack

- **Only face**: PP Neue Montreal Regular, loaded through `next/font/local` as `--font-neue-montreal` and exposed as `font-sans`.
- Only the Regular cut ships and `font-synthesis-weight: none` is set, so `font-medium` has no effect. Build hierarchy with size and color.

### Scale and rhythm

- Hero headline: `clamp(2.25rem, 5vw, 4rem)`, medium weight, tight tracking, `1.05` to `1.1` line height, maximum two lines on desktop.
- Section headline: `clamp(2rem, 4vw, 3rem)`, medium weight, tight tracking.
- Card or project title: `1.125rem` to `1.5rem`, medium weight.
- Body: `1rem` to `1.125rem`, relaxed line height, maximum `65ch`.
- Metadata: `0.75rem` to `0.875rem`, normal tracking unless the content is genuinely technical.

### Typography rules

- Use weight, spacing, and color before increasing type size.
- Keep hero support copy at 20 words or fewer and four lines or fewer.
- Keep section support copy near 25 words.
- Use one copy register throughout: direct, practical, first person.
- No random serif emphasis, mixed-family headline flourishes, oversized display type, forced poetic copy, or generic marketing verbs.
- Never use em dashes or en dashes. Rewrite with periods, commas, parentheses, or regular hyphens.

## 5. Shape and Material

Use a compact, mostly sharp radius system based on the existing `0.625rem` token.

- Buttons and badges: `0.125rem` to `0.25rem`.
- Images and compact project surfaces: `0.25rem` to `0.375rem`.
- Navigation and large grouped surfaces: `0.625rem` maximum.
- Pills are reserved for controls whose behavior requires the shape. They are not decoration.
- Cards exist only when elevation communicates hierarchy. Prefer whitespace and one quiet separator.
- Shadows must be subtle and tinted to the surrounding surface. No black outer glow.
- Backdrop blur is limited to navigation or overlays where content visibly passes behind the surface.

## 6. Layout Principles

- Main content uses the `page-container` utility: centered, `1rem` mobile gutters, `1.5rem` gutters from `768px`, maximum width `1440px`.
- Prefer CSS Grid for multi-column composition.
- At `768px` and below, every multi-column section collapses to one column with no horizontal overflow.
- Use `min-height: 100dvh` for viewport-height sections. Never use `100vh` or `h-screen`.
- Navigation stays on one line at desktop and remains at or below `80px` high.
- High-variance sections must return to a strict single-column mobile layout.
- Each section needs a distinct compositional job. Do not repeat the same split-image pattern more than twice in sequence.
- Do not use three equal feature cards. Use asymmetric grids, one strong project feature, or a two-column composition.
- Do not add decorative crosshairs, fake dashboards, empty bento cells, or section-number labels.
- Page order is Hero, Selected work, About, Footer.
- The footer closes on the full-width `JCCDLABS` wordmark (outlines in `components/wordmark-letters.ts`, from `public/JCCDLABS.svg`). Each letter climbs out of the page edge over the last stretch of scroll. Above it sit `Say Hello.`, the contact action, and the Index, Elsewhere, and Local time columns.
- Selected work on the landing page stacks the client projects as full-width cards (`ProjectCard` with `featured`): cover in `tileColor`, then title, tagline, and tech tags, with status and type in a ruled column on the right. `View all work` leads to `/work`, a two-column grid of every project with All, Client work, and Personal filters.

## 7. Hero

- Two columns on the page grid. Left: headline with the role in highlight copper, support copy with actions, then a three-column fact strip (location, focus, latest project). Right: the full-colour portrait, running the height of the left column, with the live local-time chip on it.
- The portrait lives here only, so the same photo does not repeat in About.
- First-screen entrances run in CSS, not JS, so they start on first paint and never depend on hydration.
- Keep one primary CTA and at most one secondary CTA with a distinct intent.
- All hero actions must be visible in the initial viewport.

## 8. Navigation

- Keep `JC.DEV` left aligned.
- Preserve `Experience`, `Projects`, and `About` in that order.
- Keep the contact action and theme control on the right at desktop.
- On mobile, use one accessible menu button with `aria-expanded`, a clear focus state, and a menu that closes after selection.
- Keep the fixed navigation visually quiet. It has a solid `--background` fill so scrolled content never collides with the logo, and it turns footer black once the footer reaches it.
- All interactive targets must be at least `44px` in both dimensions on touch devices.

## 9. Components

### Buttons

- Primary: solid Ink in light mode and Soft White in dark mode, with inverse text.
- Secondary: transparent or quiet surface with a visible border.
- `ActionLink` is the main call to action: a pill with a circular arrow that swaps on hover.
- Labels remain on one line at desktop and should use three words or fewer where possible.
- Active feedback: translate down by `1px` or scale to `0.98`.
- Focus state: visible three-pixel ring with WCAG-compliant contrast.
- One label per intent across the page. Do not alternate between synonymous contact or portfolio labels.

### Project features

- Lead with a real screenshot at a reserved aspect ratio.
- Keep title concrete and short. Keep summary to one or two sentences.
- Use one primary project action. A source-code action may appear separately only when a real URL exists.
- No image-overlay pills, decorative captions, fake metrics, or hover motion that obscures content.

### Forms

- Label above each input.
- Helper text follows the label when needed.
- Error text sits below the input and describes the fix.
- Never use placeholder text as a label.
- Preserve existing field names and order.
- Inputs, labels, placeholders, focus rings, helper text, and errors must meet WCAG AA in both themes.

### Loading, empty, and error states

- Use skeletons matching final image and text geometry.
- Empty states explain the next useful action.
- Errors appear inline near the failed action.
- Do not use generic circular spinners for page content.

## 10. Images and Icons

- Use real project screenshots and portraits already owned by the portfolio.
- New section imagery should be generated or sourced for the specific placement and aspect ratio.
- Reserve image width and height to keep CLS below `0.1`.
- Preserve useful alt text. Avoid generic `Hero`, `Image`, or filename-based descriptions.
- Use one installed icon family consistently. Do not mix families within a screen.
- Do not hand-draw decorative SVG icons or build fake product screenshots from styled rectangles.
- The existing `JC.DEV` wordmark is the logo. Do not replace it with a generated symbol.

## 11. Motion and Interaction

- Motion communicates hierarchy, feedback, or state change. If it has no clear purpose, omit it.
- Use `TextReveal` for headings (words rise out of a mask), `Reveal` for tiles, and `Parallax` for images inside a frame. GSAP drives anything tied to scroll or pointer position.
- Animate only `transform` and `opacity`, plus `clip-path` for the one portrait wipe.
- Use a restrained easing curve such as `[0.16, 1, 0.3, 1]` for entrances.
- Entry duration: `0.4s` to `0.8s`. Stagger: about `0.06s` between related items.
- Tactile action feedback should be immediate and under `0.2s`.
- Avoid pulse, shimmer, blur, spinners, and other perpetual repainting unless they communicate live state and have a static fallback.
- Never use React state or a window scroll listener for continuous pointer or scroll values.
- Every animation must honor `prefers-reduced-motion` and collapse to a static or instant state.
- Client-side animation effects must clean up listeners, timers, and animation contexts.

## 12. Content Rules

- Use minimal, factual copy that a client or hiring manager can scan quickly.
- Keep the current first-person voice.
- Name technologies, outcomes, and responsibilities plainly.
- Do not invent metrics, clients, testimonials, availability, or technical claims.
- Avoid `Elevate`, `Seamless`, `Unleash`, `Next-Gen`, mock-poetic labels, decorative coordinates, and atmospheric locale or time strips unless location or availability is functional content.
- Quotes, if introduced, must stay within three lines and include a real attribution.
- Use no em dash or en dash characters anywhere visible.

## 13. Accessibility and Performance

- Body text and controls meet WCAG AA contrast. Hero text should target AAA.
- Keyboard focus is always visible.
- Interactive controls use semantic elements and accessible names.
- Touch targets are at least `44px`.
- Motion respects reduced-motion preferences.
- Hero images are prioritized or preloaded. Below-fold media is lazy-loaded.
- Target LCP below `2.5s`, INP below `200ms`, and CLS below `0.1`.
- Keep heavy animation libraries out of static sections.
- Film grain is approved site-wide: one fixed, pointer-events-none `body::before` behind the content at `0.16` opacity (`app/globals.css`). Never put grain on a scrolling container.

## 14. Banned Patterns

- No AI-purple or neon glow aesthetic.
- No centered hero while `DESIGN_VARIANCE` remains above `4`.
- No three equal feature cards.
- No generic glassmorphism across every surface.
- No decorative pills, status dots, section numbers, version labels, scroll cues, or location strips.
- No duplicate CTA intent.
- No fake product UI, fake metrics, fake testimonials, or generic stock identities.
- No em dashes or en dashes.
- No excessive gradient text.
- No cursor replacement. The `View project` label that trails the pointer over a cover is the only pointer-following element.
- No decorative image captions or image-overlay labels. The live local-time chip on the portrait is functional.
- No repeated split-header or zigzag layout rhythm.
- No `window.addEventListener("scroll", ...)` animation loop.
- No animation of `top`, `left`, `width`, or `height`.
- No theme inversion between sections.
- No unapproved route, anchor, navigation, logo, legal-copy, or form-field changes.

## 15. Screen Generation Checklist

Before accepting a generated screen, verify:

- Design read and dial values still match this document.
- One theme is applied consistently across the page.
- Neutral palette remains consistent and no unapproved accent appears.
- PP Neue Montreal, Geist, and Geist Mono keep their assigned roles.
- Shape system remains mostly sharp and consistent.
- Hero fits the initial viewport and includes a real visual.
- Navigation is one line and no taller than `80px` at desktop.
- Mobile collapse is explicit below `768px`.
- CTA labels do not wrap and each intent uses one label.
- Images reserve space and use useful alt text.
- Motion is motivated, transform-based, and reduced-motion safe.
- No banned pattern appears.
- No URL, navigation label, anchor, form field, logo treatment, or legal copy changed without approval.
- Visible copy contains zero em dash or en dash characters.

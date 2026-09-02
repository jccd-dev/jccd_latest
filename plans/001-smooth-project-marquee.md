# 001 — Smooth and isolate the project marquee

- **Status**: TODO
- **Commit**: ad597f7
- **Severity**: HIGH
- **Category**: Performance and cohesion
- **Estimated scope**: 2 files, under 30 changed lines

## Problem

Every project marquee animates continuously, including cards outside the viewport, and every track is permanently promoted with `will-change`. Runtime inspection found all three tracks running in the same phase. This creates unnecessary compositor work and makes the project section appear to move as one surface.

```css
/* app/globals.css:152 — current */
.project-marquee-track {
  display: flex;
  width: max-content;
  animation-name: project-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
```

The media viewport is also transparent and has no paint containment:

```tsx
/* components/projects.tsx:69 — current */
<Link
  href={href}
  aria-label={`View ${project.title} case study`}
  className="project-marquee block overflow-hidden p-2 pt-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
>
```

## Target

- Use the existing `useInView` export from `motion/react` and a React ref to identify visible marquee links.
- Marquee tracks are paused by default.
- Only a marquee whose link is at least 25% visible receives `data-active` and runs.
- `will-change: transform` applies only while that marquee is active.
- Hover and keyboard focus continue to pause an active marquee.
- The marquee viewport owns a fixed `bg-background`, isolated stacking context, and `contain: paint` boundary.
- Keep the current linear transform-only loop, image sizing, direction, duration, and reduced-motion behavior unchanged.

```css
/* target */
.project-marquee-track {
  display: flex;
  width: max-content;
  animation-name: project-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}

.project-marquee[data-active] .project-marquee-track {
  animation-play-state: running;
  will-change: transform;
}
```

## Repo conventions to follow

- `components/projects.tsx` is already a Client Component and already imports hooks from `motion/react`.
- Reduced motion is already handled by `useReducedMotion()` and `@media (prefers-reduced-motion: reduce)`.
- Hover movement is already gated by `@media (hover: hover) and (pointer: fine)` in `app/globals.css:175`.
- Use native React refs and the installed Motion hook. Add no dependency and no custom observer abstraction.

## Steps

1. In `components/projects.tsx`, import `useRef` from React and `useInView` from `motion/react`.
2. In `ProjectDossier`, create `marqueeRef` for the marquee link and call `useInView(marqueeRef, { amount: 0.25 })`.
3. Attach the ref and `data-active={marqueeInView ? "" : undefined}` to the marquee link. Add `bg-background isolate [contain:paint]` to its existing class list.
4. In `app/globals.css`, remove permanent `will-change`, pause tracks by default, and add the active selector shown above before the existing hover/focus pause rules.
5. Do not alter the duplicated-group seam math or keyframes; runtime measurements confirmed both group halves match exactly.

## Boundaries

- Do NOT touch files other than `components/projects.tsx` and `app/globals.css`.
- Do NOT change image markup, dimensions, image data, direction, keyframes, or animation duration.
- Do NOT add dependencies or a reusable observer abstraction.
- Preserve unrelated working-tree changes.
- If the current marquee code differs from the excerpts, stop and report instead of improvising.

## Verification

- **Mechanical**: run `git diff --check` and `npm run lint`; both must exit 0.
- **Runtime**: inspect all `.project-marquee-track` animations. Only tracks whose container is at least 25% visible may report `running`; off-screen tracks report `paused`.
- **Feel check**: scroll slowly through Projects and confirm the visible row moves right-to-left without the surrounding card background appearing to translate. Hover the row with a fine pointer and confirm it pauses without jumping. Resume and confirm it continues from the same position.
- **Reduced motion**: emulate `prefers-reduced-motion: reduce`; the track must remain static and horizontally scrollable.
- **Done when**: the page has no horizontal overflow, the moving layer is contained to the media viewport, and off-screen project marquees consume no continuous animation work.

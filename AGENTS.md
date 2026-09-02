# Project guidance

## Stack

- Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS 4
- ESLint 9 with Next.js Core Web Vitals and TypeScript rules
- npm (`package-lock.json` is authoritative)
- UI utilities already installed: Radix UI, Lucide, Motion/GSAP, Cloudinary

## Build

- Read the affected flow and reuse nearby patterns before editing.
- Prefer deletion, platform features, and existing dependencies. Add or upgrade a package only for a concrete requirement they cannot meet.
- Keep changes small, direct, and scoped. Avoid speculative abstractions and configuration.
- Keep TypeScript strict. Do not use `any`; use inferred types, narrowing, generics, or `unknown` at trust boundaries.
- Prefer Server Components. Add `"use client"` only when browser APIs, events, or client state require it.
- Use semantic HTML and preserve keyboard access, focus behavior, and accessible names.
- Preserve unrelated working-tree changes.

## Verify

- Run `npm run lint` after code changes.
- Run `npm run build` after framework, configuration, or dependency changes.
- Add focused tests only when behavior has meaningful logic worth protecting; do not add test scaffolding by default.

## Safety

- Ask before destructive actions, production access, or changing secrets.

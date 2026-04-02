---
name: material-ui-nextjs
description: Integrates Material UI with Next.js App and Pages routers using @mui/material-nextjs, Emotion cache providers, next/font, CSS layers with Tailwind/CSS Modules, Link component prop patterns, CSS theme variables SSR notes, App Router useSearchParams + Suspense, and nested-app monorepo notes. Use when setting up or debugging MUI in a Next.js app.
license: MIT
metadata:
  author: mui
  version: '1.0.0'
---

# Material UI and Next.js

Agent skill for Next.js + Material UI wiring (SSR/streaming, cache providers, fonts, layers, Link, App Router URL state). SKILL.md is the entry; AGENTS.md is the full guide.

## When to apply

- New App Router or Pages Router app using `@mui/material`
- Styles missing, wrong order, or in `body` instead of `head`
- `next/font` + `ThemeProvider` / `createTheme`
- Tailwind or CSS Modules + MUI (`enableCssLayer`)
- `Button component={Link}` or Next.js v16 client boundary errors
- `useSearchParams` / URL-driven MUI views and Suspense boundaries
- Nested Next app inside a parent pnpm monorepo (wrong Turbopack root, lockfile warnings)

## Sections in AGENTS.md

| Area             | Topics                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- |
| App Router       | `AppRouterCacheProvider`, `@emotion/cache`, `options`, `useSearchParams` + `<Suspense>` |
| Pages Router     | `_document`, `_app`, `DocumentHeadTags`, `AppCacheProvider`                             |
| Fonts            | `'use client'` theme, `next/font`, CSS variables on `html`                              |
| CSS variables    | `cssVariables`, SSR flicker docs                                                        |
| CSS layers       | `enableCssLayer`, Tailwind / other CSS                                                  |
| Link             | Client wrapper, routing guide, examples repo                                            |
| Monorepo hygiene | Nested app folder, `turbopack.root`, stray `pnpm-workspace.yaml`                        |

## Full guide

Read [AGENTS.md](./AGENTS.md) for complete steps and doc links.

[reference.md](./reference.md) lists import paths and provider shape.

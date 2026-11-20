---
name: material-ui-tailwind
description: Integrates Material UI with Tailwind CSS v4 using cascade layers (the @layer order at the top of the CSS file) and documents Tailwind v3 interoperability (preflight off). Use when combining MUI with Tailwind utilities, slotProps className, or theme token bridges.
license: MIT
metadata:
  author: mui
  version: '2.0.0'
---

# Material UI and Tailwind CSS

Agent skill for MUI + Tailwind. SKILL.md is the entry; AGENTS.md is the full guide.

## When to apply

- Tailwind utilities not overriding MUI (specificity / layer order)
- Setting up v4 with Next.js App or Pages Router, or Vite
- `className` / `slotProps.*.className` on MUI components
- Mapping `--mui-*` variables into Tailwind `@theme`
- Legacy v3 setups or migrations

## Sections in AGENTS.md

| Area         | Topics                                          |
| :----------- | :---------------------------------------------- |
| v4           | `@layer` order, `mui` before `utilities`        |
| Next.js      | Layer order at the top of the global CSS file   |
| SPA          | Layer order at the top of the CSS file          |
| Usage        | Root vs slot `className`                        |
| `@theme`     | Full snippet on docs site; needs `cssVariables` |
| IntelliSense | VS Code `classRegex`                            |
| v3           | preflight off; unlayered utilities override MUI |

## Full guide

Read [AGENTS.md](./AGENTS.md). Copy-paste snippets: [reference.md](./reference.md).

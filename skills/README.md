# Material UI agent skills

Packaged guidance for AI agents and humans. Each skill is a directory under `skills/` with this layout:

```text
skills/
├── README.md                    # this file
├── material-ui-styling/         # sx vs styled vs theme vs global CSS
│   ├── AGENTS.md                # full guide (read for complete detail)
│   ├── SKILL.md                 # Cursor entry + index
│   ├── README.md
│   ├── metadata.json
│   └── reference.md
├── material-ui-theming/         # createTheme, tokens, dark mode, CSS variables
│   ├── AGENTS.md
│   ├── SKILL.md
│   ├── README.md
│   ├── metadata.json
│   └── reference.md
├── material-ui-nextjs/          # Next.js App/Pages Router, cache, fonts, Link
│   ├── AGENTS.md
│   ├── SKILL.md
│   ├── README.md
│   ├── metadata.json
│   └── reference.md
└── material-ui-tailwind/        # Tailwind v4 layers + v3 interoperability
    ├── AGENTS.md
    ├── SKILL.md
    ├── README.md
    ├── metadata.json
    └── reference.md
```

## Cursor

Symlinks under `.cursor/skills/<skill-name>` point at `skills/<skill-name>` so Cursor loads `SKILL.md` while the canonical content stays in `skills/`.

## Adding a skill

1. Create `skills/<kebab-case-name>/` with `AGENTS.md`, `SKILL.md`, `README.md`, `metadata.json` (optional: `reference.md` or a `rules/` subtree later).
2. Add `ln -s ../../skills/<name> .cursor/skills/<name>` from the repo root (see existing symlinks).
3. List the new skill in the table below.

## Catalog

| Folder                                          | Focus                                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [material-ui-styling](./material-ui-styling/)   | Choosing styling scope: `sx`, `styled()`, theme overrides, global CSS; slots and state                         |
| [material-ui-theming](./material-ui-theming/)   | Theme object, design tokens, `colorSchemes`, `cssVariables` / `theme.vars`, composition, TS augmentation       |
| [material-ui-nextjs](./material-ui-nextjs/)     | `@mui/material-nextjs`, App/Pages Router, Emotion cache, `next/font`, CSS layers, Next `Link` + MUI            |
| [material-ui-tailwind](./material-ui-tailwind/) | Tailwind v4 `@layer` + `enableCssLayer`; `className` / `slotProps`; v3 preflight / `important` / `injectFirst` |

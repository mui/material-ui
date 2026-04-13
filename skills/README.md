# Material�UI agent skills

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

## Files in each skill

| File            | Purpose                                                             |
| :-------------- | :------------------------------------------------------------------ |
| `AGENTS.md`     | Full guide — the canonical source of truth for all agents and tools |
| `SKILL.md`      | Cursor entry point and index (frontmatter + section summary)        |
| `README.md`     | Human-readable overview                                             |
| `metadata.json` | Machine-readable metadata (version, references)                     |
| `reference.md`  | Quick-reference cheat sheet (imports, API shapes)                   |

## Tool-specific discovery

### All AGENTS.md-compatible tools (Claude Code, Copilot, etc.)

The root `AGENTS.md` lists each skill and links directly to `skills/<name>/AGENTS.md`. Any agent that reads `AGENTS.md` files will find the skills from there.

### Cursor

Symlinks under `.cursor/skills/<skill-name>` point at `skills/<skill-name>` so Cursor loads `SKILL.md` while the canonical content stays in `skills/`. See [.cursor/skills/README.md](../.cursor/skills/README.md).

## Adding a skill

1. Create `skills/<kebab-case-name>/` with `AGENTS.md`, `SKILL.md`, `README.md`, `metadata.json` (optional: `reference.md`).
2. Add an entry to the table in the root `AGENTS.md` linking to the new `AGENTS.md`.
3. For Cursor: `ln -s ../../skills/<name> .cursor/skills/<name>` from the repo root (see existing symlinks).
4. List the new skill in the catalog below.

## Catalog

| Folder                                          | Focus                                                                                                          |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| [material-ui-styling](./material-ui-styling/)   | Choosing styling scope: `sx`, `styled()`, theme overrides, global CSS; slots and state                         |
| [material-ui-theming](./material-ui-theming/)   | Theme object, design tokens, `colorSchemes`, `cssVariables` / `theme.vars`, composition, TS augmentation       |
| [material-ui-nextjs](./material-ui-nextjs/)     | `@mui/material-nextjs`, App/Pages Router, Emotion cache, `next/font`, CSS layers, Next `Link` + MUI            |
| [material-ui-tailwind](./material-ui-tailwind/) | Tailwind v4 `@layer` + `enableCssLayer`; `className` / `slotProps`; v3 preflight / `important` / `injectFirst` |

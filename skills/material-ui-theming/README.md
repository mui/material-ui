# Material UI theming (agent skill)

**Theming** and **design tokens** for Material UI: `createTheme`, `ThemeProvider`, palette, typography, spacing, **`colorSchemes`**, **`cssVariables`** / **`theme.vars`**, and TypeScript customization.

## Layout (Vercel-style)

| File | Purpose |
|------|---------|
| **AGENTS.md** | Full agent/LLM document |
| **SKILL.md** | Cursor skill entry (frontmatter + index) |
| **metadata.json** | Version, abstract, references |
| **reference.md** | TypeScript augmentation snippets |

Same pattern as [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills).

## Cursor

Canonical files live under **`skills/`** at the repository root. **`.cursor/skills/<name>`** symlinks to **`skills/<name>`** so Cursor discovers each skill.

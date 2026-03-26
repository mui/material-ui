# Material UI styling (agent skill)

Material UI-specific guidance for **which styling mechanism to use** (`sx`, `styled()`, theme overrides, global CSS), aligned with the official docs in this monorepo.

## Layout (Vercel-style)

| File | Purpose |
|------|---------|
| **AGENTS.md** | Full agent/LLM document (read this for complete rules) |
| **SKILL.md** | Cursor skill entry: frontmatter + index + pointer to AGENTS.md |
| **metadata.json** | Version, abstract, references |
| **reference.md** | State classes and slot naming tables |

This mirrors the structure used in [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (`skills/<name>/AGENTS.md` + `SKILL.md` + `metadata.json`).

## Cursor

Project skills are loaded from **`.cursor/skills/`**. This repository symlinks each package under `.cursor/skills/` to the canonical **`skills/`** directory at the repo root.

# Public CSS variables are design-agnostic, one per property

The public CSS-variable API exposes exactly **one variable per styleable property** (`--Button-padding-block`, `--Button-font-size`, `--Button-bg`, `--Button-color`, `--Button-border-color`, `--Button-border-width`, `--Button-radius`, `--Button-shadow`, `--InputBase-height`, …). Public names encode **no variant, size, color, or state**. Each variable defaults to the Material Design spec via *private* per-variant/size fallbacks (e.g. `--variant-containedBg`, the literal size paddings). Overriding a public variable **opts that property out of the spec** across every variant/size/state — you trade the built-in design language for full manual control.

## Why

The intent is to keep the public surface small and **unopinionated about design language**. We explicitly rejected variant/size/color-specific public variables (`--Button-contained-bg`, `--Button-small-padding-block`, `--Button-primary-bg`): they multiply the API surface and bake MUI's variant/size/color taxonomy into a permanent contract. The private `--variant-*` machinery stays private (it carries the spec defaults); it is not promoted to public API.

## Consequences

- **Override flattens** — a custom `--Button-bg` tints text/outlined buttons too; a custom `--Button-padding-block` collapses the size matrix. Intended: you left the spec, so the per-variant/size distinctions no longer apply.
- **Resting-only** — state styling (hover/active/focus) is reassigned on the private `--variant-*` layer beneath the public var, so a custom color/shadow does not animate on hover. If you customize, you own the states. The spec-preserving global path is unchanged: remap `--mui-palette-*` / `--mui-spacing` to restyle *with* states intact.
- Adding a new public var is a deliberate act: it must be a single agnostic property knob, not a variant/size/color slot.

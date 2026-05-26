# Public CSS variables are design-agnostic, one per property

The public CSS-variable API exposes exactly **one variable per styleable property** (`--Button-padding-block`, `--Button-font-size`, `--Button-bg`, `--Button-color`, `--Button-border-color`, `--Button-border-width`, `--Button-radius`, `--Button-shadow`, `--InputBase-height`, …). Public names encode **no variant, size, color, or state**. Each variable defaults to the Material Design spec via _private_ per-variant/size fallbacks (e.g. `--variant-containedBg`, the literal size paddings). Overriding a public variable **opts that property out of the spec** across every variant/size/state — you trade the built-in design language for full manual control.

## Why

The intent is to keep the public surface small and **unopinionated about design language**. An agnostic var is **neutral to any design language** (not just Material's) — it lifts a property up a layer so the component can be _re-expressed_ in another design language, i.e. reset to a neutral baseline. We explicitly rejected variant/size/color-specific public variables (`--Button-contained-bg`, `--Button-small-padding-block`, `--Button-primary-bg`): they multiply the API surface and bake MUI's variant/size/color taxonomy into a permanent contract. The private `--variant-*` machinery stays private (it carries the spec defaults); it is not promoted to public API.

## Structure: the five axes

Every agnostic variable belongs to exactly one of five axes, which double as the method for **determining** a component's vars:

| Axis           | Covers                                                              |
| -------------- | ------------------------------------------------------------------- |
| **geometry**   | width, height, radius, border-width                                 |
| **density**    | margin, padding, gap                                                |
| **elevation**  | shadow, transform                                                   |
| **color**      | color, bg, border-color, ring                                       |
| **typography** | font-size, line-height, font-weight, text-transform, letter-spacing |

To determine a component's vars: walk the axes; for each, expose one var per property the component actually paints/sizes — collapsing the variant × size × color × state matrix to a single var, and only exposing what the component paints (no `--TextField-bg`, because outlined InputBase paints no fill).

A proposed var that fits no axis is a smell: it is probably **anatomy/behavior** (label float, the outline notch, ripple, DOM shape), which is handled by a complementary mechanism — props/variants/slots — not the agnostic surface. A CSS var can restyle the _look_; only a prop/variant/slot can change DOM and semantics (e.g. opting an outlined input out of its floating label: a var could zero the notch visually, but the `<legend>` stays vestigial and the label's a11y position is unaddressed). **Agnostic vars = the design language's look; props/variants/slots = its anatomy.**

## Consequences

- **Override flattens** — a custom `--Button-bg` tints text/outlined buttons too; a custom `--Button-padding-block` collapses the size matrix. Intended: you left the spec, so the per-variant/size distinctions no longer apply.
- **The var is honored in every assignment — no exceptions.** A property that has an agnostic var must consume it at _every_ assignment: resting, interactive states (hover/active/focus), _and_ affordance states (`disabled`, `error`, `disableElevation`), each written as `var(--X, <that context's spec value>)`. A direct literal anywhere — e.g. `boxShadow: shadows[4]` on hover, `borderColor: action.disabledBackground` on disabled — is a **bug**: it clobbers the var. So a set `--Button-bg` / `--OutlinedInput-border-color` wins _everywhere_, including disabled and error. Consequence: customizing a property fully opts out of the spec for it — the component's hover/active delta, disabled greying, error red, and elevation-off no longer show for that property. To keep the spec's state styling, remap `--mui-palette-*` / `--mui-spacing` instead of the component var.
- Adding a new public var is a deliberate act: it must be a single agnostic property knob, not a variant/size/color slot.

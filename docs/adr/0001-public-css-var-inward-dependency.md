# Public CSS variables flow inward only

Public component CSS variables (e.g. `--Button-padding-block`, `--InputBase-padding-block`) are a fixed, hand-authorable API. To keep components decoupled, a component's variable fallback chain may reference only its own variables and those of components it renders or extends (inward), never its consumers (outward).

Concretely: `InputBaseInput` consumes `var(--InputBase-padding-block, <literal>)`; `OutlinedInputInput` (extends InputBase) may add its own knob with an inward fallback `var(--OutlinedInput-padding-block, var(--InputBase-padding-block, <literal>))`; `TextField` (renders OutlinedInput) maps its knob downward with `--OutlinedInput-padding-block: var(--TextField-padding-block)`. No inner component names `--TextField-*`.

## Why

The rejected alternative was a single nested-fallback chain at the consumer — `var(--InputBase-padding-block, var(--OutlinedInput-padding-block, var(--TextField-padding-block, <literal>)))`. It is shorter but bakes the outer component's variable name into the base component's CSS, coupling InputBase to TextField. The inward-only rule preserves standalone use of inner components and lets each layer expose its own knob.

## Consequences

- A user setting `--TextField-padding-block` drives the rendered Input via the downward mapping; defaults survive because an unset `var(--TextField-padding-block)` yields the guaranteed-invalid value, so downstream `var(--…, <literal>)` falls through to the literal.
- When wrapped by TextField, the TextField root re-declares `--OutlinedInput-padding-block`, so setting that inner knob on an *ancestor of* the TextField is shadowed. Contract: use `--TextField-*` for TextField, inner knobs for standalone Inputs.

See [Public CSS Variable Layering](../design/public-css-var-layering.md) for detailed mechanics, a worked input example, and the rejected alternatives.

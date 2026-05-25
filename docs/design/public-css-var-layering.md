# Public CSS Variable Layering

Detailed companion to [ADR-0001](../adr/0001-public-css-var-inward-dependency.md). Explains _why_ the inward-dependency rule exists, _how_ the CSS mechanics work, a fully worked input example, and the alternatives that were considered and dropped.

---

## 1. Why it matters

Public component CSS variables (`--Button-padding-block`, `--InputBase-padding-block`, …) are a **fixed, hand-authorable API**. Once shipped, a variable name is a compatibility contract. That raises one architectural risk above all others: **coupling between component layers through variable names.**

A Material UI input is built from nested layers:

```text
TextField            (wrapper — renders one Input flavor, owns no padding)
  └─ OutlinedInput   (extends InputBase, adds the notched-outline look)
       └─ InputBase  (the base; its Input slot is what actually paints padding)
```

These layers are also used **independently**: people render `<OutlinedInput>` or `<InputBase>` directly, without a `TextField`. So the dependency direction must mirror the composition direction — outer knows inner, never the reverse.

> **The rule:** a component's variable fallback chain may reference only its **own** variables and the variables of components it **renders or extends** (inward). It must never reference a **consumer's** variable (outward).
>
> `InputBase` must not mention `--OutlinedInput-*` or `--TextField-*`.
> `OutlinedInput` (extends InputBase) **may** reference `--InputBase-*`.
> `TextField` (renders OutlinedInput) **may** map down to `--OutlinedInput-*`.

Break this rule and the base component carries dead knowledge of every wrapper that might one day use it — `InputBase`'s CSS would hard-code `--TextField-padding-block` even when no TextField is present. That is the coupling we refuse.

---

## 2. How it works

Two CSS mechanics carry the whole design.

### 2.1 `var()` with a fallback

```css
padding-block: var(--InputBase-padding-block, 4px);
```

If `--InputBase-padding-block` is set anywhere up the inheritance chain, it wins; otherwise the literal `4px` (today's value) applies. This is what makes **defaults byte-identical** while still being overridable.

### 2.2 The guaranteed-invalid value (how downward mapping stays safe)

A wrapper maps its public knob onto the inner component's variable:

```css
/* TextField root, variant=outlined */
--OutlinedInput-padding-block: var(--TextField-padding-block);
```

When the user sets nothing, `var(--TextField-padding-block)` (no fallback, property unset) resolves to the **guaranteed-invalid value**. A custom property holding that value behaves as unset _to downstream `var()` lookups_ — so the inner `var(--OutlinedInput-padding-block, <literal>)` correctly **falls through to its literal**.

This is the key trick: the mapping declaration is **harmless when the user sets nothing**, so it can always be present without disturbing defaults.

### 2.3 Resolution order

The inner consumer reads, innermost-knob first, then inward fallbacks, then literal:

```css
/* OutlinedInputInput (the Input slot of OutlinedInput) */
padding-block: var(
  --OutlinedInput-padding-block,
  var(--InputBase-padding-block, 16.5px)
);
```

So precedence is: `--OutlinedInput-*` (variant knob) → `--InputBase-*` (base knob shared across input flavors) → literal default. Outer-most (`--TextField-*`) only enters via the wrapper's downward mapping into `--OutlinedInput-*`.

---

## 3. Worked example — input padding

Pseudo-CSS for the three layers (real selectors elided; `${spacing(n)}` renders to `calc(var(--mui-spacing) * n)` under `cssVariables: true`):

```css
/* --- InputBase: base consumer (standard variant) --- */
.InputBaseInput {
  padding-block: var(--InputBase-padding-block, 4px);
  padding-inline: var(--InputBase-padding-inline, 0px);
}

/* --- OutlinedInput: extends InputBase, may reference --InputBase-* (inward) --- */
.OutlinedInputInput {
  /* vertical: height-driven, padding DERIVED to keep text centered.
     Height chain: --OutlinedInput-height (variant) → --InputBase-height (base) → spacing(7). */
  padding-block: var(
    --OutlinedInput-padding-block,
    var(
      --InputBase-padding-block,
      calc(
        (
            var(--OutlinedInput-height, var(--InputBase-height, ${spacing(7)}))
              /* 56px medium / spacing(5)=40px small */ -
              var(--InputBase-line-height, 1.4375) * var(--InputBase-font-size, 1rem)
          )
          /* text line-box = 23px */ / 2
      )
    )
  );
  /* horizontal: spacing-driven, independent of height */
  padding-inline: var(
    --OutlinedInput-padding-inline,
    var(--InputBase-padding-inline, ${spacing(1.75)}) /* 14px */
  );
}

/* --- TextField: renders OutlinedInput, maps its knob DOWNWARD (inward).
   Single knob is HEIGHT, mapped to the variant-level var so a page-level
   --InputBase-height set by the user is NOT shadowed for wrapped inputs. --- */
.TextField--outlined {
  --OutlinedInput-height: var(--TextField-height);
}
```

### Traces (rendered as `<TextField variant="outlined">`)

| user sets                                     | `padding-block` resolves to | path                                                                                                                                                  |
| :-------------------------------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| nothing                                       | `16.5px`                    | `--TextField-*` unset → `--OutlinedInput-*` guaranteed-invalid → `--InputBase-*` unset → derived `(spacing(7)−23)/2` = 16.5px. **Default preserved.** |
| `--TextField-height: 40px` (on the TextField) | `8.5px`                     | wrapper maps to `--OutlinedInput-height` → `(40−23)/2`; height becomes 40px                                                                           |
| `--InputBase-height: 48px`                    | `12.5px`                    | `(48−23)/2` — geometry stays centered, height contract holds                                                                                          |
| `--InputBase-line-height: 1.2`                | `18.4px`                    | `(56−19.2)/2` — line-height density, height stays 56px                                                                                                |
| `--mui-spacing: 6px` (page scope)             | `9.5px`, height 42px        | `--InputBase-height` defaults to `spacing(7)` → rides the global dial                                                                                 |
| `--InputBase-padding-block: 9px`              | `9px`                       | base-knob override beats the derived formula                                                                                                          |

**Floor:** when `height < line-height·font-size` (e.g. `--mui-spacing: 3px` → `spacing(7)=21px < 23px`), the derived padding goes negative. Fixing this needs font-size to scale too (deferred) or a `max(…, lineBox)` clamp.

### Standalone use (no TextField)

`<OutlinedInput>` alone: the `.TextField--outlined` mapping never applies, so `--OutlinedInput-padding-block` stays genuinely unset and the inward fallback chain still bottoms out correctly. Setting `--OutlinedInput-padding-block` directly now works (no wrapper to shadow it). This is exactly the decoupling the rule buys.

---

## 4. Dropped alternatives (history)

### A. Single nested-fallback chain at the consumer — **rejected (coupling)**

```css
/* OutlinedInputInput */
padding-block: var(
  --InputBase-padding-block,
  var(--OutlinedInput-padding-block, var(--TextField-padding-block, 16.5px))
); /* ← base CSS names the wrapper */
```

Shortest to write and the traces work, **but it bakes `--TextField-padding-block` into the base/Input CSS** — the inner layer now knows about a consumer it may not even have. Violates the inward rule; abandoned in favor of the layered mapping. This was the first proposal and the reason the rule was formalised.

### B. Upward-direction declarations — **rejected (value never reaches the input)**

```css
.OutlinedInput {
  --OutlinedInput-padding-block: var(--InputBase-padding-block);
}
.TextField {
  --TextField-padding-block: var(--OutlinedInput-padding-block);
}
```

Declares each layer's own var _from its child's_ — flow goes inner→outer. A `--TextField-padding-block` the user sets then never propagates **down** to the Input that paints padding. This was the original sketch's direction; corrected to outer-declares-inner.

### C. Per-variant vars only, no shared base knob — **rejected (no cross-flavor dial)**

Expose only `--OutlinedInput-*`, `--FilledInput-*`, etc., with no `--InputBase-*` in the chain. Precise, but there is then **no single knob to densify all input flavors at once** — a common need. Keeping `--InputBase-*` as the inward fallback gives that cross-variant dial for free.

### D. Wrapper prop-drills a value (no CSS var mapping) — **rejected (loses scope cascade)**

TextField reads a prop/theme value and passes a concrete number to the Input. Works for explicit props but **can't be overridden by an ancestor scope** (`.dense { --TextField-padding-block: … }`) or a `@media` query — which is the entire point of the density experiment. CSS-var mapping preserves the cascade; prop-drilling does not.

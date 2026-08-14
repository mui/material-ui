import type * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';

const focusVisibleOffsetVar = '--_focusVisible-offset';
const focusVisibleBehaviorVar = '--_focusVisible-behavior';
const focusVisibleShadowVar = '--_focusVisible-shadow';

const offsetValue = `var(${focusVisibleOffsetVar}, 1)`;
const behaviorValue = `var(${focusVisibleBehaviorVar}, )`;

export const outsetFocusRing = {
  [focusVisibleOffsetVar]: 1,
  [focusVisibleBehaviorVar]: 'initial', // reverts the var to guaranteed-invalid so `var(--_focusVisible-behavior, )` falls back to empty — there is no explicit `outset` keyword.
};

// Used by the colored-background surfaces (AppBar, Alert, SnackbarContent) to make the focus visible appear through box-shadow
export function applyChildrenFocusVisible(color: string) {
  return {
    [focusVisibleShadowVar]: color,
  };
}

// Clip-prone components (Tab, MenuItem, …) spread this on their root to inset the ring, so an
// `overflow: hidden` ancestor cannot clip it — without the component knowing the ring width.
// `offset` multiplies the ring's own outlineOffset, so 1 = mirror it inward.
export function applyInsetFocusVisible(offset: number) {
  return {
    [focusVisibleOffsetVar]: -offset,
    [focusVisibleBehaviorVar]: 'inset',
  };
}

export type FocusVisibleInput = boolean | React.CSSProperties | null | undefined;

// Assemble the raw `focusVisible` input from `createTheme(options, ...args)` with the theme's own
// deep-merge semantics: two objects merge key-by-key, a non-object (`true`/`false`) replaces
// wholesale. The single-key wrapper is load-bearing — raw values hit deepmerge's top-level
// plain-object guard (`deepmerge(true, obj)` drops the object); wrapped, they take the per-key
// branch that has the required semantics.
export function mergeFocusVisibleInput(
  optionsFocusVisible: FocusVisibleInput,
  args: readonly any[],
): FocusVisibleInput {
  return args.reduce(
    (acc, arg) =>
      arg && 'focusVisible' in arg ? deepmerge(acc, { focusVisible: arg.focusVisible }) : acc,
    { focusVisible: optionsFocusVisible },
  ).focusVisible;
}

/**
 * Whether an input is this module's own output rather than something an author wrote. Only
 * `wireFocusVisibleVars` produces the offset calc, so a re-composed theme
 * (`createTheme(existingTheme, …)`) is recognizable by it — and its `outlineColor` is a baked
 * default, not a choice.
 */
export function isResolvedFocusVisible(input: FocusVisibleInput): boolean {
  return (
    input != null &&
    typeof input === 'object' &&
    typeof input.outlineOffset === 'string' &&
    input.outlineOffset.includes(focusVisibleOffsetVar)
  );
}

/**
 * Resolve the opt-in ring (`true` → curated default, object → merged over it), wiring in the
 * private inset vars. `outlineColor` is the default the caller supplies — a hex, the palette var,
 * or a scheme's primary — overridden by a user-provided `outlineColor`.
 */
export function resolveFocusVisible(
  input: true | React.CSSProperties,
  outlineColor: string,
): React.CSSProperties {
  return wireFocusVisibleVars({
    outlineStyle: 'solid',
    outlineColor,
    outlineWidth: 2,
    outlineOffset: 2,
    // invisible shadow for parent component with solid background (AppBar, Snackbar, Alert) can control the ring color.
    boxShadow: `var(${focusVisibleShadowVar}, 0 0)`,
    ...(input === true ? null : input),
  });
}

/**
 * Wire the private inset vars into a resolved `theme.focusVisible` so a custom `outlineOffset` or
 * `boxShadow` insets automatically on clip-prone components — the consumer never references a var.
 * Mutates and returns the object.
 */
export function wireFocusVisibleVars(resolved: React.CSSProperties): React.CSSProperties {
  // Multiply the offset by the sign var so it flips to inset on clip-prone components; default to 0
  // when no offset was set (the curated default sets an explicit `outlineOffset`). Skip if already
  // wired, so re-composing a resolved theme (`createTheme(existingTheme, overrides)`) does not wrap
  // the calc twice and invert the sign.
  const offset = resolved.outlineOffset ?? 0;
  if (typeof offset !== 'string' || !offset.includes(focusVisibleOffsetVar)) {
    const offsetPx = typeof offset === 'number' ? `${offset}px` : offset;
    resolved.outlineOffset = `calc(${offsetValue} * ${offsetPx})`;
  }
  // Prefix a box-shadow with the behavior var so it insets there too, unless it already opts in.
  // Standalone keywords are complete values — prefixing would make the declaration invalid
  // (`inset none`) on clip-prone components.
  const standaloneBoxShadows = new Set([
    'none',
    'initial',
    'inherit',
    'unset',
    'revert',
    'revert-layer',
  ]);
  if (
    typeof resolved.boxShadow === 'string' &&
    !standaloneBoxShadows.has(resolved.boxShadow.trim().toLowerCase()) &&
    !/\binset\b/.test(resolved.boxShadow) &&
    !resolved.boxShadow.includes(focusVisibleBehaviorVar)
  ) {
    resolved.boxShadow = `${behaviorValue} ${resolved.boxShadow}`;
  }
  return resolved;
}

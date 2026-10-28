import type * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';

const focusVisibleOffsetVar = '--_focusVisible-offset';
const focusVisibleBehaviorVar = '--_focusVisible-behavior';
const focusVisibleContrastVar = '--_focusVisible-contrast';

const offsetValue = `var(${focusVisibleOffsetVar}, 1)`;
const behaviorValue = `var(${focusVisibleBehaviorVar}, )`;

function toLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value;
}

// Named `set` instead of `apply` because these do not return the full `theme.focusVisible` styles,
// they only set the variables that control one part of the ring.
export function setFocusVisibleOffset(offset: number) {
  return {
    [focusVisibleOffsetVar]: offset,
    // `initial` reverts the var to guaranteed-invalid so `var(--_focusVisible-behavior, )` falls back to empty — there is no explicit `outset` keyword.
    [focusVisibleBehaviorVar]: offset < 0 ? 'inset' : 'initial',
  };
}

export const outsetFocusRing = setFocusVisibleOffset(1);

export function applyInsetFocusVisible(offset: number) {
  return setFocusVisibleOffset(-offset);
}

export function setFocusVisibleContrast(color: string) {
  return {
    [focusVisibleContrastVar]: color,
  };
}

function contrastBoxShadow(outlineOffset: number | string, outlineWidth: number | string) {
  const offset = `${offsetValue} * ${toLength(outlineOffset)}`;
  return `0 0 0 calc(max(${offset}, -1 * ${offset}) + ${toLength(outlineWidth)}) var(${focusVisibleContrastVar}, transparent)`;
}

export type FocusVisibleInput = boolean | React.CSSProperties | null | undefined;

// Merge the raw `focusVisible` input across `createTheme(options, ...args)` with the theme's own
// deep-merge semantics. The single-key wrapper is load-bearing — a raw value hits deepmerge's
// top-level plain-object guard (`deepmerge(true, obj)` drops the object).
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
 * Whether an input is this module's own output. Only `wireFocusVisibleVars` emits the offset calc,
 * so it identifies a ring fed back in by `createTheme(existingTheme, …)`.
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
 * Resolve the opt-in ring, wiring in the private inset vars. `outlineColor` is the caller's default
 * — a hex, the palette var, or a scheme's primary — overridden by a user-provided `outlineColor`.
 */
export function resolveFocusVisible(
  input: true | React.CSSProperties,
  outlineColor: string,
): React.CSSProperties {
  const resolved: React.CSSProperties = {
    outlineStyle: 'solid',
    outlineColor,
    outlineWidth: 2,
    outlineOffset: 2,
    ...(input === true ? null : input),
  };
  if (resolved.boxShadow === undefined) {
    resolved.boxShadow = contrastBoxShadow(resolved.outlineOffset ?? 0, resolved.outlineWidth ?? 0);
  }
  return wireFocusVisibleVars(resolved);
}

/**
 * Wire the private inset vars into a resolved `theme.focusVisible` so a custom `outlineOffset` or
 * `boxShadow` insets automatically on clip-prone components. Mutates and returns the object.
 */
export function wireFocusVisibleVars(resolved: React.CSSProperties): React.CSSProperties {
  // Multiply the offset by the sign var so it flips to inset on clip-prone components. Skip if
  // already wired: re-composing a resolved theme must not wrap the calc twice and invert the sign.
  const offset = resolved.outlineOffset ?? 0;
  if (typeof offset !== 'string' || !offset.includes(focusVisibleOffsetVar)) {
    resolved.outlineOffset = `calc(${offsetValue} * ${toLength(offset)})`;
  }
  // Prefix a box-shadow with the behavior var so it insets there too, unless it already opts in.
  // Standalone keywords are complete values — prefixing would produce an invalid `inset none`.
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

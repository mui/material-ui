import type * as React from 'react';
import toPx from '../utils/toPx';

// Private custom properties the opt-in focus ring reads. Wired internally by `createTheme` so a
// consumer's `theme.focusVisible` insets on clip-prone components (Tab, MenuItem, …) without
// referencing any var. `--_focusVisible-offset` flips the outline-offset sign (1 outset / -1 inset);
// `--_focusVisible-behavior` resolves to `inset` there, so prefixing a box-shadow insets it.
export const focusVisibleOffsetVar = '--_focusVisible-offset';
export const focusVisibleBehaviorVar = '--_focusVisible-behavior';

const offsetValue = `var(${focusVisibleOffsetVar}, 1)`;
const behaviorValue = `var(${focusVisibleBehaviorVar}, )`;

/**
 * Wire the private inset vars into a resolved `theme.focusVisible` so a custom `outlineOffset` or
 * `boxShadow` insets automatically on clip-prone components — the consumer never references a var.
 * Mutates and returns the object.
 */
export function wireFocusVisibleVars(resolved: React.CSSProperties): React.CSSProperties {
  // Multiply the offset by the sign var so it flips to inset on clip-prone components; default to
  // the outline width when the consumer did not set an offset.
  resolved.outlineOffset = `calc(${offsetValue} * ${toPx(
    (resolved.outlineOffset ?? resolved.outlineWidth) as string | number,
  )})`;
  // Prefix a box-shadow with the behavior var so it insets there too, unless it already opts in.
  if (
    typeof resolved.boxShadow === 'string' &&
    !/\binset\b/.test(resolved.boxShadow) &&
    !resolved.boxShadow.includes(focusVisibleBehaviorVar)
  ) {
    resolved.boxShadow = `${behaviorValue} ${resolved.boxShadow}`;
  }
  return resolved;
}

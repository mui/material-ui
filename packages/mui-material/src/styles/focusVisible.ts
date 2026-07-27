import type * as React from 'react';

// Private vars the ring reads so `theme.focusVisible` insets on clip-prone components without the
// consumer referencing a var. `-offset` flips the outline-offset sign (1 outset, -1 inset);
// `-behavior` resolves to `inset`, so prefixing a box-shadow insets it too.
export const focusVisibleOffsetVar = '--_focusVisible-offset';
export const focusVisibleBehaviorVar = '--_focusVisible-behavior';

const offsetValue = `var(${focusVisibleOffsetVar}, 1)`;
const behaviorValue = `var(${focusVisibleBehaviorVar}, )`;

// Clip-prone components (Tab, MenuItem, …) spread this on their root to inset the ring, so an
// `overflow: hidden` ancestor cannot clip it — without the component knowing the ring width.
export const insetFocusRing = {
  [focusVisibleOffsetVar]: -1,
  [focusVisibleBehaviorVar]: 'inset',
};

// Read the raw `focusVisible` from `createTheme(options, ...args)`. A later merge arg wins (like the
// theme's own deep-merge), so scan from the last; fall through to options when none set it.
export function extractFocusVisibleInput(
  optionsFocusVisible: unknown,
  args: readonly any[],
): unknown {
  for (let i = args.length - 1; i >= 0; i -= 1) {
    if (args[i] && 'focusVisible' in args[i]) {
      return args[i].focusVisible;
    }
  }
  return optionsFocusVisible;
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
    ...(input === true ? null : input),
  });
}

/**
 * Wire the private inset vars into a resolved `theme.focusVisible` so a custom `outlineOffset` or
 * `boxShadow` insets automatically on clip-prone components — the consumer never references a var.
 * Mutates and returns the object.
 */
export function wireFocusVisibleVars(resolved: React.CSSProperties): React.CSSProperties {
  // Multiply the offset by the sign var so it flips to inset on clip-prone components; default to
  // the outline width when no offset was set.
  const offset = resolved.outlineOffset ?? resolved.outlineWidth;
  const offsetPx = typeof offset === 'number' ? `${offset}px` : offset;
  resolved.outlineOffset = `calc(${offsetValue} * ${offsetPx})`;
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

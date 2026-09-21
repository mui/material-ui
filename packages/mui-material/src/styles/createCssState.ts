import type * as React from 'react';
import type { Palette, PaletteColor } from './createPalette';

/** Spreadable CSS, exactly like `FocusVisible`. */
export type StateStyle = React.CSSProperties;

/**
 * One colour's styles, keyed by state name — never by selector; selectors belong
 * to the component. Configuring an entry replaces the component's state styles
 * wholesale: everything is optional, and an absent state or property simply
 * emits no CSS.
 */
export interface ColorStates {
  initial?: StateStyle | undefined;
  hover?: StateStyle | undefined;
  active?: StateStyle | undefined;
  focused?: StateStyle | undefined;
  selected?: StateStyle | undefined;
  /** selected AND hovered — enumerated so no consumer composes it */
  selectedHover?: StateStyle | undefined;
  selectedActive?: StateStyle | undefined;
  disabled?: StateStyle | undefined;
}

/** Every `Palette` key whose value is a `PaletteColor`; augmented colours flow in automatically. */
export type PaletteStateColor = {
  [K in keyof Palette]-?: Palette[K] extends PaletteColor ? K : never;
}[keyof Palette];

export type StateGroup = {
  [K in PaletteStateColor]?: ColorStates | undefined;
} & {
  default?: ColorStates | undefined;
};

/**
 * Augment with the design system's group names to type `state` and
 * `stateVariants`:
 *
 *   declare module '@mui/material/styles' {
 *     interface StateGroupOverrides { input: true; ghost: true }
 *   }
 */
export interface StateGroupOverrides {}

export type StateGroupKey = keyof StateGroupOverrides & string;

export type ThemeState = {
  [K in StateGroupKey]?: StateGroup | undefined;
};

export type StateVariants<Variant extends string = never> = {
  [K in Variant | 'default']?: StateGroupKey | undefined;
};

export default function createCssState(config: ThemeState = {}): ThemeState | undefined {
  if (!Object.keys(config).length) {
    return undefined;
  }
  return config;
}

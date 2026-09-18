import type * as React from 'react';
import type { Theme } from './createThemeNoVars';
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

export interface ThemeState {
  [group: string]: StateGroup | undefined;
}

export default function createCssState(
  theme: Theme,
  config: ThemeState = {},
): ThemeState | undefined {
  const groups = Object.keys(config);
  if (!groups.length) {
    return undefined;
  }
  const palette = theme.palette as unknown as Record<string, PaletteColor | undefined>;
  groups.forEach((group) => {
    Object.keys(config[group] ?? {}).forEach((name) => {
      if (name !== 'default' && typeof palette?.[name]?.main !== 'string') {
        throw new Error(
          `MUI: the \`state.${group}.${name}\` entry does not match a palette colour ` +
            'with a `main` value.',
        );
      }
    });
  });
  return config;
}

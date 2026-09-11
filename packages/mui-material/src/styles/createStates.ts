/**
 * `theme.states` — ready-to-use interaction styles, a sibling of `theme.palette`.
 *
 *   theme.states.default          // states that do not depend on a colour
 *   theme.states.primary          // states derived from `palette.primary`
 *
 * The theme stores OUTPUT ONLY: plain style objects, keyed by state name, with no
 * logic to interpret. They are serializable, visible in a console.log, and
 * spreadable straight into a `styled()`.
 *
 * WHY A SIBLING OF `palette` AND NOT INSIDE IT
 * Code in the wild iterates palette colours and their properties. Nesting style
 * objects under `palette.primary` would put state keys in front of every such
 * loop. `theme.states` keeps that surface untouched.
 *
 * WHY THERE IS NO DEFAULT BEHAVIOUR
 * Every entry is asked for by name. `enhanceColorStates(theme, {})` generates
 * nothing, so a colour nobody configured keeps exactly today's styles and the
 * zero-diff contract is provable per colour rather than per theme. It also means
 * Material UI never picks a magnitude, a ramp direction, or a CSS backend on the
 * author's behalf — measured against a real design system, the right values
 * differ per colour AND per scheme, so any house default would be wrong for
 * someone.
 */

import type { Theme } from './createThemeNoVars';

/**
 * One state's styles. Deliberately NARROWER than `CSSObject`: every value a
 * generator emits is a colour string, so a consumer reading a single property
 * (`states.primary.hover.backgroundColor`) gets a `string`, not the wide union
 * `CSSObject` would give. Still spreads into `styled()` / `styleOverrides`.
 */
export interface StateStyle {
  backgroundColor?: string | undefined;
  borderColor?: string | undefined;
}

/** `disabled` is the one state that may fade rather than recolour. */
export interface DisabledStyle {
  opacity?: number | string | undefined;
  boxShadow?: string | undefined;
  color?: string | undefined;
  backgroundColor?: string | undefined;
}

/**
 * Ready-to-use styles for one colour, keyed by STATE NAME rather than by selector.
 *
 * Selectors are deliberately NOT encoded here: which selector a state maps to is
 * a DOM concern belonging to the component that applies it, and `Mui-selected` /
 * hover media gating already differ per family today. Keying by name is what
 * makes both call sites clean — apply the whole state (`'&:hover': s.hover`) or
 * read one property (`s.hover.backgroundColor`) — with no traversal.
 */
export interface ColorStates {
  hover: StateStyle;
  active: StateStyle;
  selected: StateStyle;
  /** selected AND hovered — enumerated so no consumer composes it */
  selectedHover: StateStyle;
  disabled: DisabledStyle;
}

/**
 * `theme.states`. Every key is optional: only the colours that were configured
 * appear, which is exactly what the converted components gate on.
 */
export interface ThemeStates {
  [color: string]: ColorStates | undefined;
}

/** A theme that may carry the generated states. */
export type StatefulTheme = Theme & {
  states?: ThemeStates | undefined;
  vars?: unknown;
};

export interface GeneratorContext {
  /** the config key — a palette colour name, or `default` */
  name: string;
  /**
   * A CSS reference to the colour's `main`, already scheme-correct (under
   * `cssVariables` it is a `var(--…-palette-<name>-main, fallback)` string).
   * Absent for `default`, which is the colour-independent ramp.
   */
  color?: string | undefined;
  theme: StatefulTheme;
}

/** Produces one colour's states. Runs ONCE, at theme-build time. */
export type StateGenerator = (context: GeneratorContext) => ColorStates;

/**
 * The whole public config: FLAT, one entry per palette colour, plus the optional
 * `default` key for the colour-independent ramp. Every value names its generator
 * explicitly, so the CSS backend a colour uses — and therefore the browser
 * support it needs — is readable at the call site.
 */
export type ColorStatesConfig = Record<string, StateGenerator>;

/**
 * Run each configured generator once and collect the output. All of the logic
 * lives in the generators; this only resolves each colour's `main` and calls them.
 */
export default function createStates(
  theme: StatefulTheme,
  config: ColorStatesConfig = {},
): ThemeStates | undefined {
  const names = Object.keys(config);
  if (!names.length) {
    return undefined;
  }
  // Values come from `(theme.vars || theme).palette` — under `cssVariables` that
  // mirror already holds `var(--<prefix>-palette-…, fallback)` strings built with
  // this theme's own prefix, so nothing here has to know the naming scheme, and
  // it degrades to plain literals under `cssVariables: false`.
  const palette = ((theme as any).vars || theme).palette as Record<string, any>;
  if (!palette) {
    return undefined;
  }

  const states: ThemeStates = {};
  names.forEach((name) => {
    const color = name === 'default' ? undefined : palette[name]?.main;
    if (name !== 'default' && !color) {
      throw new Error(
        `MUI: enhanceColorStates() was given states for \`${name}\`, which is not a palette colour ` +
          'with a `main` value.',
      );
    }
    states[name] = config[name]({ name, color, theme });
  });
  return states;
}

/**
 * `createStates` — derive every palette color's interaction states from a few levers.
 *
 * `enhanceColorStates(theme, config)` runs this ONCE per theme and stores only the
 * output on `theme.states`, a sibling of `theme.palette` holding READY-TO-USE style
 * objects — no logic, nothing to interpret:
 *
 *   theme.states.default          // states that do not depend on a color
 *   theme.states.primary          // states derived from `palette.primary`
 *
 * Because the theme stores output rather than logic, the objects are plain,
 * serializable, visible in a console.log, and spreadable straight into a `styled()`.
 *
 * WHY A SIBLING OF `palette` AND NOT INSIDE IT
 * Code in the wild iterates palette colors and their properties. Nesting style
 * objects under `palette.primary` would put state keys in front of every such loop.
 * `theme.states` keeps that surface untouched.
 *
 * WHY THERE IS NO PER-COLOR OPT-IN
 * The enhancer IS the opt-in: a theme that never calls it is byte-identical to
 * today. Once called, every color derives, because a design system wants its colors
 * to behave alike. A marker per color would add a second opt-in surface AND a
 * detection path that cannot read from `theme.vars` — the mirror holds strings, so
 * markers are invisible on it. Dropping the marker drops that whole split.
 *
 * WHY DERIVED AT ALL
 * Measured against a real design system's token export, state colors are not
 * independent values: they are one anchor plus a repeated step, and the step moves
 * the color AWAY FROM THE PAGE — darker on a light ground, lighter on a dark one.
 * `palette.<color>.dark` cannot express that, because "dark" is an absolute
 * direction that is wrong in one of the two schemes. The pole `common.onBackground`
 * (#000 light / #fff dark) flips per scheme, so one expression is correct in both.
 */

import type { Theme } from './createThemeNoVars';

/**
 * One state's styles. Deliberately NARROWER than `CSSObject`: every value the
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
 * Ready-to-use styles for one color, keyed by STATE NAME rather than by selector.
 *
 * Each value is a plain style object, so a call site both reads one property
 * (`states.primary.hover.backgroundColor`) and applies the whole thing
 * (`'&:hover': states.primary.hover`) without traversing or reconstructing
 * anything. Selectors are deliberately NOT encoded here: which selector a state
 * maps to is a DOM concern that belongs to the component applying it, and
 * `Mui-selected` / hover media gating already differ per family today.
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
 * `theme.states` — `default` holds everything not tied to a color (disabled, and
 * the ghost/overlay ramp, which never references the color); the remaining keys
 * mirror the palette's color entries.
 */
export interface ThemeStates {
  default: ColorStates;
  [color: string]: ColorStates;
}

/** A theme that may carry the generated states. */
export type StatefulTheme = Theme & {
  states?: ThemeStates | undefined;
  vars?: unknown;
};

export interface StatesConfig {
  /** distance per level for opaque bases, e.g. `'4.5%'`. Any CSS value, so a
   * caller may pass a `var()` reference to vary it per color scheme. */
  step?: string | undefined;
  /** overlay alpha per level for transparent bases, e.g. `'5%'`. */
  overlayStep?: string | undefined;
  /** what states move toward. Defaults to this theme's `common.onBackground`. */
  pole?: string | undefined;
  /** steps from rest, per named state. */
  levels?: Record<string, number> | undefined;
  /**
   * How disabled reads. `opacity` (default) fades the control as a unit — the
   * model the reference token export uses, where a single `opacity/disabled`
   * exists and NOT ONE disabled color. `color` keeps Material UI's recolor model.
   */
  disabled?:
    | {
        opacity?: number | string | undefined;
        color?: string | undefined;
        background?: string | undefined;
      }
    | undefined;
}

// Plain values only. A custom property reference would have to guess this theme's
// `cssVarPrefix` and would resolve to nothing under `cssVariables: false`; anything
// theme-derived is read from the theme below instead.
const DEFAULTS = {
  step: '4.5%',
  overlayStep: '5%',
  levels: { hover: 1, active: 2, selected: 1 } as Record<string, number>,
};

const DISABLED_OPACITY = 0.5;

/** `color-mix` from `base` toward `target` by `amount`.
 *
 * `in oklab`, not oklch: with a NEUTRAL target the two are mathematically
 * identical, but a tinted pole makes oklch rotate hue — a red button would drift
 * purple. oklab desaturates instead, which keeps color identity.
 */
function mix(base: string, target: string, amount: string) {
  return `color-mix(in oklab, ${base}, ${target} ${amount})`;
}

function times(level: number, step: string) {
  return level === 1 ? step : `calc(${level} * ${step})`;
}

/**
 * THE GENERATOR. Everything that decides how a state looks happens here, once
 * per theme. Returns ready-to-use style objects; callers never re-derive.
 */
export default function createStates(
  theme: StatefulTheme,
  options: StatesConfig = {},
): ThemeStates | undefined {
  const cfg = { ...DEFAULTS, ...options, levels: { ...DEFAULTS.levels, ...options.levels } };
  const { step, overlayStep, levels } = cfg;
  // Values come from `(theme.vars || theme).palette` — under `cssVariables` that
  // mirror already holds `var(--<prefix>-palette-…, fallback)` strings built with
  // this theme's own prefix, so nothing here has to know the naming scheme, and it
  // degrades to plain literals under `cssVariables: false`.
  const palette = ((theme as any).vars || theme).palette as Record<string, any>;
  if (!palette) {
    return undefined;
  }
  const pole = options.pole ?? palette.common.onBackground;

  // A palette color is anything carrying a `main` — the shape `augmentColor`
  // produces. That skips `text`, `background`, `action`, `grey`, `common`,
  // `divider` and the optional `states` lever node, while picking up any custom
  // color a theme adds.
  const colors = Object.keys(palette).filter((key) => typeof palette[key]?.main === 'string');
  if (!colors.length) {
    return undefined;
  }

  const disabled = cfg.disabled?.color
    ? {
        color: cfg.disabled.color,
        ...(cfg.disabled.background ? { backgroundColor: cfg.disabled.background } : null),
      }
    : { opacity: cfg.disabled?.opacity ?? DISABLED_OPACITY, boxShadow: 'none' };

  const states = {
    // Color-INDEPENDENT states. A ghost surface tints toward the pole by the same
    // amount whatever color its label is, so these belong here rather than being
    // duplicated onto every color.
    default: {
      hover: { backgroundColor: mix('transparent', pole, times(levels.hover, overlayStep)) },
      active: { backgroundColor: mix('transparent', pole, times(levels.active, overlayStep)) },
      selected: { backgroundColor: mix('transparent', pole, times(levels.selected, overlayStep)) },
      // Compound states are enumerated HERE, by the generator — so no consumer has
      // to reason about how a selected surface behaves when hovered.
      selectedHover: {
        backgroundColor: mix(
          'transparent',
          pole,
          times(levels.selected + levels.hover, overlayStep),
        ),
      },
      disabled,
    },
  };

  colors.forEach((name) => {
    const main = palette[name].main;
    // Border travels a different axis: from a translucent main TOWARD the opaque
    // main, so one step lands exactly on `main` as it does today. `color-mix`
    // clamps past 100%, so a deeper level simply rests there.
    const border = (level: number) => mix(theme.alpha(main, 0.5), main, times(level, '100%'));

    const forLevel = (level: number) => ({
      backgroundColor: mix(main, pole, times(level, step)),
      borderColor: border(level),
    });

    (states as ThemeStates)[name] = {
      hover: forLevel(levels.hover),
      active: forLevel(levels.active),
      selected: forLevel(levels.selected),
      selectedHover: forLevel(levels.selected + levels.hover),
      disabled,
    };
  });

  return states as ThemeStates;
}

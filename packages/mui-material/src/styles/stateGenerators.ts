/**
 * State generators — the two CSS backends Material UI ships.
 *
 * A generator is a function the theme author names explicitly, once per palette
 * colour, in `enhanceColorStates`. There is no implicit default: a colour with no
 * generator keeps today's styles, so adoption is per colour and provably
 * zero-diff for the rest.
 *
 *   enhanceColorStates(theme, {
 *     default: colorMix({ overlayStep: '5%' }),
 *     primary: colorMix({ step: '4.4%' }),
 *     warning: relativeColor({ lightness: 0.072, chroma: 0.014, hue: 4.15 }),
 *   })
 *
 * Naming the backend at the call site is deliberate: `relativeColor` needs
 * Chrome 119 / Firefox 128, above Material UI's browserslist floor, so a reader
 * can see which colours carry that requirement instead of discovering it in
 * production. Everything else stays on `colorMix`, which is within targets.
 *
 * Both return the same `ColorStates` shape, so nothing downstream — the gates,
 * the shared component layer, `theme.states` — can tell them apart, and a third
 * party can ship a generator of its own without Material UI knowing.
 */

import type { ColorStates, DisabledStyle, GeneratorContext, StateGenerator } from './createStates';

/** Steps from rest, per state. Shared by both generators. */
export interface StateLevels {
  hover?: number | undefined;
  active?: number | undefined;
  selected?: number | undefined;
}

const LEVELS = { hover: 1, active: 2, selected: 1 };
const DISABLED: DisabledStyle = { opacity: 0.5, boxShadow: 'none' };

function resolveLevels(levels: StateLevels | undefined) {
  return { ...LEVELS, ...levels };
}

export interface ColorMixOptions {
  /**
   * Distance travelled per level, e.g. `'4.5%'`. Required — there is no house
   * magnitude, because the right value is a property of the design, not of
   * Material UI. Any CSS value, so a `var()` reference may vary it per scheme.
   */
  step?: string | undefined;
  /** Alpha per level for the colour-independent overlay ramp (the `default` key). */
  overlayStep?: string | undefined;
  /**
   * Where the ramp travels TO. Defaults to `palette.common.onBackground`, which
   * flips per colour scheme (#000 light / #fff dark) and so keeps one generated
   * expression correct in both. Point it at a colour's own anchor
   * (`var(--mui-palette-warning-main)`) for tinted surfaces, which ramp by
   * gaining chroma rather than losing it.
   */
  target?: string | undefined;
  levels?: StateLevels | undefined;
  disabled?: DisabledStyle | undefined;
}

/**
 * Ramp with `color-mix()`. Within Material UI's browserslist targets today.
 *
 * `in oklab`, not oklch: with a neutral target the two are mathematically
 * identical, but a tinted target makes oklch rotate hue — a red button drifts
 * purple — while oklab desaturates and keeps the colour's identity.
 */
export function colorMix(options: ColorMixOptions = {}): StateGenerator {
  const { step, overlayStep, target, levels, disabled = DISABLED } = options;
  const lv = resolveLevels(levels);

  return ({ color, theme }: GeneratorContext): ColorStates => {
    const palette = ((theme as any).vars || theme).palette;
    const pole = target ?? palette.common.onBackground;
    const times = (n: number, unit: string) => (n === 1 ? unit : `calc(${n} * ${unit})`);
    const mix = (base: string, to: string, amount: string) =>
      `color-mix(in oklab, ${base}, ${to} ${amount})`;

    // No colour: the `default` key — a ghost ramp that tints whatever sits under
    // it. It never references a palette colour, which is why one entry serves a
    // text Button and a list row alike.
    if (!color) {
      const overlay = (level: number) => ({
        backgroundColor: mix('transparent', pole, times(level, overlayStep ?? '5%')),
      });
      return {
        hover: overlay(lv.hover),
        active: overlay(lv.active),
        selected: overlay(lv.selected),
        selectedHover: overlay(lv.selected + lv.hover),
        disabled,
      };
    }

    if (!step) {
      throw new Error(
        'MUI: colorMix() needs a `step` for a palette colour, e.g. colorMix({ step: "4.5%" }).',
      );
    }
    // The border travels a different axis: from a translucent main TOWARD the
    // opaque main, so one step lands exactly where an outlined hover does today.
    // `color-mix` clamps past 100%, so deeper levels simply rest there.
    const forLevel = (level: number) => ({
      backgroundColor: mix(color, pole, times(level, step)),
      borderColor: mix(theme.alpha(color, 0.5), color, times(level, '100%')),
    });
    return {
      hover: forLevel(lv.hover),
      active: forLevel(lv.active),
      selected: forLevel(lv.selected),
      selectedHover: forLevel(lv.selected + lv.hover),
      disabled,
    };
  };
}

export interface RelativeColorOptions {
  /** Lightness added per level, in oklch units (0–1). Negative darkens. */
  lightness: number;
  /** Chroma added per level. Positive saturates — which `colorMix` cannot do. */
  chroma?: number | undefined;
  /**
   * Hue rotated per level, in degrees. Amber is the case that needs it: it loses
   * chroma steeply as lightness drops, so a straight ramp reads as brown unless
   * the hue is carried along.
   */
  hue?: number | undefined;
  levels?: StateLevels | undefined;
  disabled?: DisabledStyle | undefined;
}

/**
 * Ramp with CSS relative colour syntax — exact, and the only backend here that
 * can raise chroma or rotate hue.
 *
 * REQUIRES Chrome 119 / Firefox 128, ABOVE Material UI's browserslist floor
 * (Chrome 117 / Firefox 121). Naming it opts a single palette colour into that
 * floor; every other colour stays on `colorMix`.
 */
export function relativeColor(options: RelativeColorOptions): StateGenerator {
  const { lightness, chroma = 0, hue = 0, levels, disabled = DISABLED } = options;
  const lv = resolveLevels(levels);

  return ({ color, name }: GeneratorContext): ColorStates => {
    if (!color) {
      throw new Error(
        `MUI: relativeColor() derives from a palette colour and cannot be used for \`${name}\`, ` +
          'which has none. Use colorMix() for the colour-independent ramp.',
      );
    }
    const at = (level: number) => {
      const l = `calc(l + ${(lightness * level).toFixed(5)})`;
      const c = chroma ? `calc(c + ${(chroma * level).toFixed(5)})` : 'c';
      const h = hue ? `calc(h + ${(hue * level).toFixed(3)})` : 'h';
      return `oklch(from ${color} ${l} ${c} ${h})`;
    };
    const forLevel = (level: number) => ({ backgroundColor: at(level), borderColor: at(level) });
    return {
      hover: forLevel(lv.hover),
      active: forLevel(lv.active),
      selected: forLevel(lv.selected),
      selectedHover: forLevel(lv.selected + lv.hover),
      disabled,
    };
  };
}

import clamp from '@mui/utils/clamp';
import {
  newColor,
  format,
  formatRGB,
  parse,
  getRed,
  getGreen,
  getBlue,
  getAlpha,
  setAlpha,
  extractHex,
  matchColor,
} from './index';

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param color - Hex color, i.e. #nnn or #nnnnnn
 * @returns A CSS rgb() or rgba() color string
 */
export function hexToRgb(hexadecimal: string) {
  return formatRGB(parse(hexadecimal));
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param color - RGB color, i.e. rgb(n, n, n)
 * @returns A CSS hexadecimal color string as #rrggbbaa
 */
export function rgbToHex(color: string) {
  return format(parse(color));
}

/**
 * Converts a color from hsl format to rgb format.
 * @param color - HSL color values
 * @returns rgb color values
 */
export function hslToRgb(color: string) {
  return formatRGB(parse(color));
}

/**
 * Returns a channel created from the input color.
 *
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns The channel for the color, that can be used in rgba or hsla colors
 */
export const colorChannel = (color: string) => {
  const HASH = '#'.charCodeAt(0);
  if (color.charCodeAt(0) === HASH) {
    const hex = extractHex(color);
    return `${hex[0]} ${hex[1]} ${hex[2]}`;
  }
  const match = matchColor(color);
  const format = match[1];
  const p1 = match[2];
  const p2 = match[3];
  const p3 = match[4];
  switch (format) {
    case 'rgb':
    case 'rgba':
    case 'hsl':
    case 'hsla': {
      return `${p1} ${p2} ${p3}`;
    }
    case 'color': {
      const colorspace = p1;
      switch (colorspace) {
        case 'srgb':
          return `${p2} ${p3} ${p3}`;
      }
    }
  }
  return '';
};

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: string): number {
  const c = parse(color);

  const r = getRed(c) / 255;
  const g = getGreen(c) / 255;
  const b = getBlue(c) / 255;

  const apply = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

  // prettier-ignore
  return Math.round((
    0.2126 * apply(r) +
    0.7152 * apply(g) +
    0.0722 * apply(b)
  ) * 1000) / 1000;
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(foreground: string, background: string) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  // prettier-ignore
  return (
    (Math.max(lumA, lumB) + 0.05) /
    (Math.min(lumA, lumB) + 0.05)
  );
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param value - value to set the alpha channel to in the range 0 - 1
 * @returns A CSS hexadecimal color string
 */
export function unstable_alpha(color: string, value: number) {
  return format(setAlpha(parse(color), Math.round(clamp(value) * 255)));
}

/**
 * Darkens a color.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 */
export function unstable_darken(color: string, coefficient: number) {
  const c = parse(color);

  const r = getRed(c);
  const g = getGreen(c);
  const b = getBlue(c);
  const a = getAlpha(c);

  const factor = 1 - clamp(coefficient);

  // prettier-ignore
  return format(newColor(
    r * factor,
    g * factor,
    b * factor,
    a
  ));
}

/**
 * Lightens a color.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 */
export function unstable_lighten(color: string, coefficient: number) {
  const c = parse(color);

  const r = getRed(c);
  const g = getGreen(c);
  const b = getBlue(c);
  const a = getAlpha(c);

  coefficient = clamp(coefficient);

  return format(
    newColor(
      r + (255 - r) * coefficient,
      g + (255 - g) * coefficient,
      b + (255 - b) * coefficient,
      a,
    ),
  );
}

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient=0.15 - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 */
export function unstable_emphasize(color: string, coefficient = 0.15) {
  return getLuminance(color) > 0.5
    ? unstable_darken(color, coefficient)
    : unstable_lighten(color, coefficient);
}

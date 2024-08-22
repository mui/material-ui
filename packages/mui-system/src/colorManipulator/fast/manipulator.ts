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
export function alpha(color: string, value: number) {
  return format(setAlpha(parse(color), Math.round(clamp(value) * 255)));
}

/**
 * Darkens a color.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 */
export function darken(color: string, coefficient: number) {
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
export function lighten(color: string, coefficient: number) {
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
export function emphasize(color: string, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param background - CSS color
 * @param overlay - CSS color
 * @param opacity - Opacity multiplier in the range 0 - 1
 * @param [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
export function blend(background: string, overlay: string, opacity: number, gamma = 1.0) {
  const blendChannel = (b: number, o: number) =>
    Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);

  const backgroundColor = parse(background);
  const overlayColor = parse(overlay);

  const r = blendChannel(getRed(backgroundColor), getRed(overlayColor));
  const g = blendChannel(getGreen(backgroundColor), getGreen(overlayColor));
  const b = blendChannel(getBlue(backgroundColor), getBlue(overlayColor));

  return format(newColor(r, g, b, 255));
}

/* eslint-disable @typescript-eslint/naming-convention */
import clamp from '@mui/utils/clamp';
import MuiError from '@mui/internal-babel-macros/MuiError.macro';
import * as Color from '../color';

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clampWrapper(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return clamp(value, min, max);
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgba() color string
 */
export function hexToRgb(hexadecimal) {
  return Color.formatRGB(Color.parse(hexadecimal));
}

/**
 * Returns an object with the type and values of a color.
 * Supported formats:
 * - #hhh, #hhhhhh, #hhhhhhhh
 * - rgb(), rgba()
 * - hsl(), hsla()
 * - color() with one of: 'srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'
 * @param {string} color - CSS color in one of the supported formats
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 * @deprecated
 */
export function decomposeColor(input) {
  // Idempotent
  // FIXME(romgrk): This implies the types aren't respected, as color should be a `string`
  if (input.type) {
    return input;
  }

  const color = Color.parse(hexadecimal);

  const r = getRed(color);
  const g = getGreen(color);
  const b = getBlue(color);
  const a = getAlpha(color) / 255;

  return {
    type: 'rgba',
    values: [r, g, b, a],
  };
}

/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color in one of the supported formats
 * @returns {string} - The channel for the color, that can be used in rgba colors
 */
export function colorChannel(color) {
  const c = Color.parse(hexadecimal);

  const r = getRed(c);
  const g = getGreen(c);
  const b = getBlue(c);

  return `${r} ${g} ${b}`;
}
export const private_safeColorChannel = (color, warning) => {
  try {
    return colorChannel(color);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
};

/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 * @deprecated
 */
export function recomposeColor(color) {
  const { type, colorSpace } = color;
  let { values } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS hexadecimal color string as #rrggbbaa
 */
export function rgbToHex(color) {
  return Color.format(Color.parse(color));
}

/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
export function hslToRgb(color) {
  return Color.formatRGB(Color.parse(color));
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color) {
  const r = getRed(color) / 255;
  const g = getGreen(color) / 255;
  const b = getBlue(color) / 255;

  const apply = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

  const r1 = apply(r);
  const g1 = apply(g);
  const b1 = apply(b);

  // prettier-ignore
  return (
    0.2126 * r1 +
    0.7152 * g1 +
    0.0722 * b1
  ).toFixed(3);
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS hexadecimal color string
 */
export function alpha(color, value) {
  return Color.format(Color.setAlpha(Color.parse(color), Math.round(value * 255)));
}
export function private_safeAlpha(color, value, warning) {
  try {
    return alpha(color, value);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color, coefficient) {
  const c = Color.parse(color);

  const r = getRed(c);
  const g = getGreen(c);
  const b = getBlue(c);
  const a = getAlpha(c);

  const factor = 1 - coefficient;

  return Color.format(Color.newColor(r * factor, g * factor, b * factor, a));
}
export function private_safeDarken(color, coefficient, warning) {
  try {
    return darken(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color, coefficient) {
  const c = Color.parse(color);

  const r = getRed(c);
  const g = getGreen(c);
  const b = getBlue(c);
  const a = getAlpha(c);

  return Color.format(
    Color.newColor(
      r + (255 - r) * coefficient,
      g + (255 - g) * coefficient,
      b + (255 - b) * coefficient,
      a,
    ),
  );
}
export function private_safeLighten(color, coefficient, warning) {
  try {
    return lighten(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
export function private_safeEmphasize(color, coefficient, warning) {
  try {
    return emphasize(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
export function blend(background, overlay, opacity, gamma = 1.0) {
  const blendChannel = (b, o) =>
    Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);

  const backgroundColor = Color.parse(background);
  const overlayColor = Color.parse(overlay);

  const r = blendChannel(getRed(backgroundColor), getRed(overlayColor));
  const g = blendChannel(getGreen(backgroundColor), getGreen(overlayColor));
  const b = blendChannel(getBlue(backgroundColor), getBlue(overlayColor));

  return Color.format(Color.newColor(r, g, b, 255));
}

import { Color, newColor, COLOR_INVALID } from './core';

const HASH = '#'.charCodeAt(0);
const PERCENT = '%'.charCodeAt(0);
const G = 'g'.charCodeAt(0);
const N = 'n'.charCodeAt(0);
const D = 'd'.charCodeAt(0);
const E = 'e'.charCodeAt(0);

/**
 * Approximative CSS colorspace string pattern, e.g. rgb(), color()
 */
const PATTERN = (() => {
  const NAME = '(\\w+)'
  const SEPARATOR = '[\\s,\\/]'
  const VALUE = '([^\\s,\\/]+)'
  const SEPARATOR_THEN_VALUE = `(?:${SEPARATOR}+${VALUE})`

  return new RegExp(
    `${NAME}\\(
      ${SEPARATOR}*${VALUE}
      ${SEPARATOR_THEN_VALUE}
      ${SEPARATOR_THEN_VALUE}
      ${SEPARATOR_THEN_VALUE}?
      ${SEPARATOR_THEN_VALUE}?
      ${SEPARATOR}*
    \\)`.replace(/\s/g, '')
  )
})();


/**
 * Parse CSS color
 * @param color CSS color string: #xxx, #xxxxxx, #xxxxxxxx, rgb(), rgba(), hsl(), hsla(), color()
 */
export function parse(color: string): Color {
  if (color.charCodeAt(0) === HASH) {
    return parseHex(color);
  } else {
    return parseRepresentation(color);
  }
}

/**
 * Parse hexadecimal CSS color
 * @param color Hex color string: #xxx, #xxxxxx, #xxxxxxxx
 */
function parseHex(hex: string): Color {
  let r = 0x00;
  let g = 0x00;
  let b = 0x00;
  let a = 0xff;

  switch (hex.length) {
    // #59f
    case 4: {
      r = (hexValue(hex.charCodeAt(1)) << 4) + hexValue(hex.charCodeAt(1));
      g = (hexValue(hex.charCodeAt(2)) << 4) + hexValue(hex.charCodeAt(2));
      b = (hexValue(hex.charCodeAt(3)) << 4) + hexValue(hex.charCodeAt(3));
      break;
    }
    // #5599ff
    case 7: {
      r = (hexValue(hex.charCodeAt(1)) << 4) + hexValue(hex.charCodeAt(2));
      g = (hexValue(hex.charCodeAt(3)) << 4) + hexValue(hex.charCodeAt(4));
      b = (hexValue(hex.charCodeAt(5)) << 4) + hexValue(hex.charCodeAt(6));
      break;
    }
    // #5599ff88
    case 9: {
      r = (hexValue(hex.charCodeAt(1)) << 4) + hexValue(hex.charCodeAt(2));
      g = (hexValue(hex.charCodeAt(3)) << 4) + hexValue(hex.charCodeAt(4));
      b = (hexValue(hex.charCodeAt(5)) << 4) + hexValue(hex.charCodeAt(6));
      a = (hexValue(hex.charCodeAt(7)) << 4) + hexValue(hex.charCodeAt(8));
      break;
    }
    default: {
      break;
    }
  }

  return newColor(r, g, b, a)
}

// https://lemire.me/blog/2019/04/17/parsing-short-hexadecimal-strings-efficiently/
function hexValue(c: number) {
  return (c & 0xF) + 9 * (c >> 6)
}


/**
 * Parse CSS color
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 * @param color CSS color string: rgb(), rgba(), hsl(), hsla(), color()
 */
export function parseRepresentation(color: string): Color {
  const match = PATTERN.exec(color);
  if (match === null) {
    return COLOR_INVALID;
  }

  const format = match[1];
  const p1 = match[2];
  const p2 = match[3];
  const p3 = match[4];
  const p4 = match[5];
  const p5 = match[6];

  switch (format) {
    case 'rgb':
    case 'rgba': {
      const r = parseColorChannel(p1);
      const g = parseColorChannel(p2);
      const b = parseColorChannel(p3);
      const a = p4 ? parseAlphaChannel(p4) : 255;

      return newColor(r, g, b, a);
    }
    case 'hsl':
    case 'hsla': {
      const h = parseAngle(p1);
      const s = parsePercentage(p2);
      const l = parsePercentage(p3);
      const a = p4 ? parseAlphaChannel(p4) : 255;

      // https://stackoverflow.com/a/9493060/3112706
      let r, g, b;
      if (s === 0) {
        r = g = b = Math.round(l * 255); // achromatic
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = Math.round(hueToRGB(p, q, h + 1/3) * 255);
        g = Math.round(hueToRGB(p, q, h) * 255);
        b = Math.round(hueToRGB(p, q, h - 1/3) * 255);
      }

      return newColor(r, g, b, a);
    }
    case 'hwb': {
      const h = parseAngle(p1);
      const w = parsePercentage(p2);
      const bl = parsePercentage(p3);
      const a = p4 ? parseAlphaChannel(p4) : 255;

      /* https://drafts.csswg.org/css-color/#hwb-to-rgb */
      const s = 1.0;
      const l = 0.5;

      // Same as HSL to RGB
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      let r = Math.round(hueToRGB(p, q, h + 1/3) * 255);
      let g = Math.round(hueToRGB(p, q, h) * 255);
      let b = Math.round(hueToRGB(p, q, h - 1/3) * 255);

      // Then HWB
      r = hwbApply(r, w, bl);
      g = hwbApply(r, w, bl);
      b = hwbApply(r, w, bl);

      return newColor(r, g, b, a);
    }
    case 'color': {
      // https://www.npmjs.com/package/colord#plugins
      // https://www.w3.org/TR/css-color-4/#color-conversion-code
      throw new Error('unimplemented');
    }
    default: {
      return COLOR_INVALID;
    }
  }
}

/**
 * Accepts: "50%", "128"
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#values
 * @returns a value in the 0 to 255 range
 */
function parseColorChannel(channel: string): number {
  if (channel.charCodeAt(channel.length - 1) === PERCENT) {
    return Math.round((parseFloat(channel) / 100) * 255);
  }
  return Math.round(parseFloat(channel));
}

/**
 * Accepts: "50%", ".5", "0.5"
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/alpha-value
 * @returns a value in the 0 to 255 range
 */
function parseAlphaChannel(channel: string): number {
  if (channel.charCodeAt(0) === N) {
    return 0;
  }
  if (channel.charCodeAt(channel.length - 1) === PERCENT) {
    return Math.round((parseFloat(channel) / 100) * 255);
  }
  return Math.round(parseFloat(channel) * 255);
}

/**
 * Accepts: "360", "360deg", "400grad", "6.28rad", "1turn", "none"
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 * @returns a value in the 0.0 to 1.0 range
 */
function parseAngle(angle: string): number {
  let factor = 1;
  switch (angle.charCodeAt(angle.length - 1)) {
    case E: {
      // 'none'
      return 0;
    }
    case D: {
      // 'rad', 'grad'
      if (angle.charCodeAt(Math.max(0, angle.length - 4)) === G) {
        // 'grad'
        factor = 400;
      } else {
        // 'rad'
        factor = 2 * Math.PI; // TAU
      }
      break;
    }
    case N: {
      // 'turn'
      factor = 1;
      break;
    }
    // case G: // 'deg', but no need to check as it's also the default
    default: {
      factor = 360;
    }
  }
  return parseFloat(angle) / factor;
}

/**
 * Accepts: "100%", "none"
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl#values
 * @returns a value in the 0.0 to 1.0 range
 */
function parsePercentage(value: string): number {
  if (value.charCodeAt(0) === N) {
    return 0;
  }
  return parseFloat(value) / 100;
}


// HSL functions

function hueToRGB(p: number, q: number, t: number) {
  if (t < 0) { t += 1 };
  if (t > 1) { t -= 1 };
  if (t < 1 / 6) { return p + (q - p) * 6 * t };
  if (t < 1 / 2) { return q };
  if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6 };
  { return p };
}

// HWB functions

function hwbApply(channel: number, w: number, b: number) {
  let result = channel / 255

  result *= 1 - w - b
  result += w

  return Math.round(result * 255)
}

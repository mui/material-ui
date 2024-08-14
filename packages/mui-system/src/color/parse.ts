import { shl } from './bitwise';

export type Color = number;

export const COLOR_INVALID = -1 as Color;

export const OFFSET_R = 24;
export const OFFSET_G = 16;
export const OFFSET_B = 8;
export const OFFSET_A = 0;

const HASH = '#'.charCodeAt(0);
const ARGUMENTS_END = ')'.charCodeAt(0);
const SPACE = ' '.charCodeAt(0);
const COMMA = ','.charCodeAt(0);
const SLASH = '/'.charCodeAt(0);
const PERIOD = '.'.charCodeAt(0);
const PERCENT = '%'.charCodeAt(0);
const G = 'g'.charCodeAt(0);
const N = 'n'.charCodeAt(0);
const D = 'd'.charCodeAt(0);
const E = 'e'.charCodeAt(0);

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
  let r = '00';
  let g = '00';
  let b = '00';
  let a = 'ff';

  switch (hex.length) {
    // #59f
    case 4: {
      r = hex.charAt(1) + hex.charAt(1);
      g = hex.charAt(2) + hex.charAt(2);
      b = hex.charAt(3) + hex.charAt(3);
      break;
    }
    // #5599ff
    case 7: {
      r = hex.slice(1, 3);
      g = hex.slice(3, 5);
      b = hex.slice(5, 7);
      break;
    }
    // #5599ff88
    case 9: {
      r = hex.slice(1, 3);
      g = hex.slice(3, 5);
      b = hex.slice(5, 7);
      a = hex.slice(7, 9);
      break;
    }
    default: {
      break;
    }
  }

  // prettier-ignore
  return (
    shl(parseInt(r, 16), OFFSET_R) +
    shl(parseInt(g, 16), OFFSET_G) +
    shl(parseInt(b, 16), OFFSET_B) +
    shl(parseInt(a, 16), OFFSET_A)
  )
}

/** Global parsing state */
const state = {
  data: '',
  offset: 0,
};

/**
 * Parse CSS color
 * @spec https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 * @param color CSS color string: rgb(), rgba(), hsl(), hsla(), color()
 */
export function parseRepresentation(color: string): Color {
  let format = '';
  let p1 = '';
  let p2 = '';
  let p3 = '';
  let p4 = '';

  state.data = color;
  state.offset = 0;

  while (hasContent()) {
    if (isLetter(peek())) {
      format += consume();
    } else {
      break;
    }
  }

  consume(); // "("
  skipSeparators();

  p1 = consumeValue();
  p2 = consumeValue();
  p3 = consumeValue();

  if (peek() !== ARGUMENTS_END) {
    p4 = consumeValue();
  }

  switch (format) {
    case 'rgb':
    case 'rgba': {
      const r = parseColorChannel(p1);
      const g = parseColorChannel(p2);
      const b = parseColorChannel(p3);
      const a = p4 ? parseAlphaChannel(p4) : 255;

      // prettier-ignore
      return (
        shl(r, OFFSET_R) +
        shl(g, OFFSET_G) +
        shl(b, OFFSET_B) +
        shl(a, OFFSET_A)
      )
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

      // prettier-ignore
      return (
        shl(r, OFFSET_R) +
        shl(g, OFFSET_G) +
        shl(b, OFFSET_B) +
        shl(a, OFFSET_A)
      )
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

      // prettier-ignore
      return (
        shl(r, OFFSET_R) +
        shl(g, OFFSET_G) +
        shl(b, OFFSET_B) +
        shl(a, OFFSET_A)
      )
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
      // 'grad'
      if (angle.charCodeAt(Math.max(0, angle.length - 4)) === G) {
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
  return parseInt(value) / 100;
}


// Parsing state functions

function hasContent() {
  return state.offset < state.data.length;
}

function peek() {
  return state.data.charCodeAt(state.offset);
}

function consume() {
  if (process.env.NODE_ENV !== 'production') {
    if (state.offset >= state.data.length) {
      throw new Error(`MUI: Invalid color input: "${state.data}"`);
    }
  }

  const result = state.data.charAt(state.offset);
  state.offset += 1;
  return result;
}

function skipSeparators() {
  while (hasContent()) {
    const code = peek();
    // This makes the parser a bit more liberal in what it accepts,
    // e.g. `rgb(1 / 2 / 3)` would be accepted.
    if (code === SPACE || code === COMMA || code === SLASH) {
      consume();
    } else {
      break;
    }
  }
}

function consumeValue() {
  let value = '';
  while (hasContent()) {
    const code = peek();
    if (isLetter(code) || isDigit(code) || code === PERIOD || code === PERCENT) {
      value += consume();
    } else {
      break;
    }
  }
  skipSeparators();
  return value;
}

function isLetter(code: number) {
  return code >= 64 && code <= 122;
}

function isDigit(code: number) {
  return code >= 48 && code <= 57;
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

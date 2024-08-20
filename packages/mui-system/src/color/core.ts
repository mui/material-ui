import { get, set } from './bit';

export type Color = number;

export const OFFSET_R = 24;
export const OFFSET_G = 16;
export const OFFSET_B = 8;
export const OFFSET_A = 0;

export function newColor(r: number, g: number, b: number, a: number) {
  // prettier-ignore
  return (
    (r << OFFSET_R) +
    (g << OFFSET_G) +
    (b << OFFSET_B) +
    (a << OFFSET_A)
  );
}

export function from(hex: number) {
  return newColor(get(hex, OFFSET_R), get(hex, OFFSET_G), get(hex, OFFSET_B), get(hex, OFFSET_A));
}

export function getRed(c: Color) {
  return get(c, OFFSET_R);
}
export function getGreen(c: Color) {
  return get(c, OFFSET_G);
}
export function getBlue(c: Color) {
  return get(c, OFFSET_B);
}
export function getAlpha(c: Color) {
  return get(c, OFFSET_A);
}

export function setRed(c: Color, value: number) {
  return set(c, OFFSET_R, value);
}
export function setGreen(c: Color, value: number) {
  return set(c, OFFSET_G, value);
}
export function setBlue(c: Color, value: number) {
  return set(c, OFFSET_B, value);
}
export function setAlpha(c: Color, value: number) {
  return set(c, OFFSET_A, value);
}

/**
 * Map 8-bits value to its hexadecimal representation
 * ['00', '01', '02', ..., 'fe', 'ff']
 */
const FORMAT_HEX = Array.from({ length: 256 }).map((_, byte) => byte.toString(16).padStart(2, '0'));

export function format(color: Color): string {
  /*
   * Implementing this as `cast(color).toString(16).padStart(8, '0')` would be simpler,
   * but `cast()` makes the color a non-Smi value on V8.
   * This version is about 4 times faster than the simple one.
   */
  return (
    '#' +
    FORMAT_HEX[getRed(color)] +
    FORMAT_HEX[getGreen(color)] +
    FORMAT_HEX[getBlue(color)] +
    FORMAT_HEX[getAlpha(color)]
  );
}

export function formatRGB(color: Color) {
  const r = getRed(color);
  const g = getGreen(color);
  const b = getBlue(color);
  const a = getAlpha(color) / 255;

  if (a === 1.0) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${Math.round(a * 1000) / 1000})`;
}

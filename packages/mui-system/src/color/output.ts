import { get } from './bitwise';
import { Color, OFFSET_R, OFFSET_G, OFFSET_B, OFFSET_A } from './parse';

export function hsl(color: Color) {
  const r = get(color, OFFSET_R) / 255;
  const g = get(color, OFFSET_G) / 255;
  const b = get(color, OFFSET_B) / 255;

  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;

  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  }
}

export function format(color: Color): string {
  return `#${color.toString(16).padStart(8, '0')}`;
}

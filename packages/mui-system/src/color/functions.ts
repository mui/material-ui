import {
  Color,
  OFFSET_A,
} from './parse';
import { set } from './bitwise';

export function alpha(color: Color, value: number) {
  return set(color, OFFSET_A, Math.round(value * 255))
}

export function format(color: Color): string {
  return `#${color.toString(16).padStart(8, '0')}`;
}

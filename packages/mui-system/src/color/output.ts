import { Color } from './core';

export function format(color: Color): string {
  return `#${color.toString(16).padStart(8, '0')}`;
}

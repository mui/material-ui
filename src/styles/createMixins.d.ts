import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';

export interface Mixins {
  gutters: (styles: Object) => Object;
}

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing
): Mixins;

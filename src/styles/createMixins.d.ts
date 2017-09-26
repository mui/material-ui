import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';

export interface Mixins {
  gutters: (styles: Object) => Object;
  toolbar: Object;
}

export default function createMixins<T = {}>(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: T
): Mixins & T;

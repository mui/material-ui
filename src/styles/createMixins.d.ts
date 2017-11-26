import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';
import { StyleRules } from '../styles';

export interface Mixins {
  gutters: (styles: React.CSSProperties) => React.CSSProperties;
  toolbar: React.CSSProperties;
}

export default function createMixins<T = {}>(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: T
): Mixins & T;

import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';
import { StyleRules } from '../styles';

interface CustomMixins {
  // Use interface declaration merging to add custom mixins
}

export interface Mixins extends CustomMixins {
  gutters: (styles: React.CSSProperties) => React.CSSProperties;
  toolbar: React.CSSProperties;
}

export type MixinsOptions = Partial<Mixins> & CustomMixins;

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
): Mixins;

import { Breakpoints } from './createBreakpoints';
import { Spacing } from './createSpacing';
import { CSSObject } from './experimentalStyled';

export interface Mixins {
  toolbar: CSSObject;
  // ... use interface declaration merging to add custom mixins
}

export interface MixinsOptions extends Partial<Mixins> {
  // ... use interface declaration merging to add custom mixin options
}

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
): Mixins;

import { Breakpoints } from './createBreakpoints';
import { Spacing } from './createSpacing';
import * as React from 'react';

export interface Mixins {
  gutters: (styles?: React.CSSProperties) => React.CSSProperties;
  toolbar: React.CSSProperties;
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

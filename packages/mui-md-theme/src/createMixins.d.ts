import { Breakpoints } from '@mui/system';
import { CSSProperties } from './createTypography';

export interface Mixins {
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

export interface MixinsOptions extends Partial<Mixins> {
  // ... use interface declaration merging to add custom mixin options
}

export default function createMixins(breakpoints: Breakpoints, mixins: MixinsOptions): Mixins;

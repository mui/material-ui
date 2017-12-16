import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';
import { StyleRules } from '../styles';

export interface Mixins {
  gutters: (styles: React.CSSProperties) => React.CSSProperties;
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
): Mixins {
  return {
    gutters: styles => {
      return {
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2,
        ...styles,
        [breakpoints.up('sm')]: {
          paddingLeft: spacing.unit * 3,
          paddingRight: spacing.unit * 3,
          ...styles[breakpoints.up('sm')],
        },
      };
    },
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48,
      },
      [breakpoints.up('sm')]: {
        minHeight: 64,
      },
    },
    ...mixins,
  };
}

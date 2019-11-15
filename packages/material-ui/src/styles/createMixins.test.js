import { assert } from 'chai';
import createMixins from './createMixins';
import createMuiTheme from './createMuiTheme';

describe('createMixins', () => {
  it('should be able to override the breakpoint', () => {
    const theme = createMuiTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, {});

    const mixin = mixins.gutters({
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 1,
      },
    });
    assert.deepEqual(mixin, {
      '@media (min-width:600px)': {
        paddingLeft: 1,
        paddingRight: 24,
      },
      display: 'flex',
      paddingLeft: 16,
      paddingRight: 16,
    });
  });

  it('should accept a function', () => {
    const theme = createMuiTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, (breakpoints, spacing) => {
      assert.strictEqual(breakpoints, theme.breakpoints);
      assert.strictEqual(spacing, theme.spacing);
      return {
        element: {
          padding: spacing(1),
          [breakpoints.up('sm')]: {
            padding: spacing(2),
          },
        },
      };
    });

    assert.deepEqual(mixins.element, {
      element: {
        padding: theme.spacing(1),
        [breakpoints.up('sm')]: {
          padding: spacing(2),
        },
      },
    });
  });
});

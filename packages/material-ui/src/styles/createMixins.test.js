import { expect } from 'chai';
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
    expect(mixin).to.deep.equal({
      '@media (min-width:600px)': {
        paddingLeft: 1,
        paddingRight: 24,
      },
      display: 'flex',
      paddingLeft: 16,
      paddingRight: 16,
    });
  });
});

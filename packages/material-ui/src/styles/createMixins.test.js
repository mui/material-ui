import { expect } from 'chai';
import createMixins from './createMixins';
import createMuiTheme from './createMuiTheme';

describe('createMixins', () => {
  it('should be able add other mixins', () => {
    const theme = createMuiTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, { test: { display: 'block' } });

    expect(mixins.test).to.deep.equal({
      display: 'block',
    });
  });
});

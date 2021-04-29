import { expect } from 'chai';
import createMixins from './createMixins';
import createTheme from './createTheme';

describe('createMixins', () => {
  it('should be able add other mixins', () => {
    const theme = createTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, { test: { display: 'block' } });

    expect(mixins.test).to.deep.equal({
      display: 'block',
    });
  });
});

import { expect } from 'chai';
import { createTheme } from '@mui/md-theme';
import createMixins from './createMixins';

describe('createMixins', () => {
  it('should be able add other mixins', () => {
    const theme = createTheme();
    const mixins = createMixins(theme.breakpoints, { test: { display: 'block' } });

    expect(mixins.test).to.deep.equal({
      display: 'block',
    });
  });
});

import { expect } from 'chai';
import { extendTheme } from '@mui/material-next/styles';

describe('Material You — extendTheme', () => {
  it('should have default cssVarPrefix', () => {
    expect(extendTheme().cssVarPrefix).to.equal('md');
  });

  it('`getCssVar` return default prefix', () => {
    expect(extendTheme().getCssVar('palette-primary-main')).to.equal(
      'var(--md-palette-primary-main)',
    );
  });
});

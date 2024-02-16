import { expect } from 'chai';
import { extendTheme, Theme } from '@mui/material-next/styles';

describe('extendTheme', () => {
  it('should have default cssVarPrefix', () => {
    expect(extendTheme().cssVarPrefix).to.equal('md');
  });

  it('`getCssVar` return default prefix', () => {
    expect(extendTheme().getCssVar('palette-primary-main')).to.equal(
      'var(--md-palette-primary-main)',
    );
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      // MD2 specific tokens
      'palette',
      'shadows',
      'zIndex',
      'opacity',
      'overlays',
      'shape',
      // MD3 specific tokens
      'ref',
      'sys',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key as keyof Theme]).to.deep.equal(theme.vars[key as keyof Theme['vars']]);
    });
  });
});

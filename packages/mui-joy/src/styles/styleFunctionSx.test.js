import { expect } from 'chai';
import styleFunctionSx from './styleFunctionSx';

describe('styleFunctionSx', () => {
  const theme = {
    palette: {
      primary: {
        500: '#ff5252',
      },
    },
    vars: {
      palette: {
        primary: {
          500: 'var(--palette-primary-500)',
          textColor: 'var(--palette-primary-textColor)',
          containedBg: 'var(--palette-primary-containedBg)',
          outlinedBorder: 'var(--palette-primary-outlinedBorder)',
        },
      },
      radius: {
        md: 'var(--radius-md)',
      },
      shadow: {
        md: 'var(--shadow-md)',
      },
      fontFamily: {
        display: 'var(--fontFamily-display)',
      },
      fontSize: {
        md: 'var(--fontSize-md)',
      },
      fontWeight: {
        md: 'var(--fontWeight-md)',
      },
      letterSpacing: {
        md: 'var(--letterSpacing-md)',
      },
      lineHeight: {
        md: 'var(--lineHeight-md)',
      },
    },
  };
  it('color', () => {
    expect(styleFunctionSx({ sx: { color: 'primary.500' }, theme })).to.deep.equal({
      color: 'var(--palette-primary-500)',
    });
  });

  it('bgcolor', () => {
    expect(styleFunctionSx({ sx: { bgcolor: 'primary.containedBg' }, theme })).to.deep.equal({
      backgroundColor: 'var(--palette-primary-containedBg)',
    });
  });

  it('backgroundColor', () => {
    expect(
      styleFunctionSx({ sx: { backgroundColor: 'primary.containedBg' }, theme }),
    ).to.deep.equal({
      backgroundColor: 'var(--palette-primary-containedBg)',
    });
  });

  it('borderColor', () => {
    expect(styleFunctionSx({ sx: { borderColor: 'primary.outlinedBorder' }, theme })).to.deep.equal(
      {
        borderColor: 'var(--palette-primary-outlinedBorder)',
      },
    );
  });

  it('borderRadius', () => {
    expect(styleFunctionSx({ sx: { borderRadius: 'md' }, theme })).to.deep.equal({
      borderRadius: 'var(--radius-md)',
    });
  });

  it('boxShadow', () => {
    expect(styleFunctionSx({ sx: { boxShadow: 'md' }, theme })).to.deep.equal({
      boxShadow: 'var(--shadow-md)',
    });
  });

  it('fontFamily', () => {
    expect(styleFunctionSx({ sx: { fontFamily: 'display' }, theme })).to.deep.equal({
      fontFamily: 'var(--fontFamily-display)',
    });
  });

  it('fontSize', () => {
    expect(styleFunctionSx({ sx: { fontSize: 'md' }, theme })).to.deep.equal({
      fontSize: 'var(--fontSize-md)',
    });
  });

  it('fontWeight', () => {
    expect(styleFunctionSx({ sx: { fontWeight: 'md' }, theme })).to.deep.equal({
      fontWeight: 'var(--fontWeight-md)',
    });
  });

  it('letterSpacing', () => {
    expect(styleFunctionSx({ sx: { letterSpacing: 'md' }, theme })).to.deep.equal({
      letterSpacing: 'var(--letterSpacing-md)',
    });
  });

  it('lineHeight', () => {
    expect(styleFunctionSx({ sx: { lineHeight: 'md' }, theme })).to.deep.equal({
      lineHeight: 'var(--lineHeight-md)',
    });
  });
});

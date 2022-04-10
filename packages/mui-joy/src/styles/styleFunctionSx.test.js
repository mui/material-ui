import { expect } from 'chai';
import { createBreakpoints } from '@mui/system';
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
        sm: 'var(--fontSize-sm)',
        md: 'var(--fontSize-md)',
        xl: 'var(--fontSize-xl)',
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
    breakpoints: createBreakpoints({}),
  };
  it('color', () => {
    expect(styleFunctionSx({ theme, sx: { color: 'primary.500' } })).to.deep.equal({
      color: 'var(--palette-primary-500)',
    });
  });

  it('bgcolor', () => {
    expect(styleFunctionSx({ theme, sx: { bgcolor: 'primary.containedBg' } })).to.deep.equal({
      backgroundColor: 'var(--palette-primary-containedBg)',
    });
  });

  it('backgroundColor', () => {
    expect(
      styleFunctionSx({ theme, sx: { backgroundColor: 'primary.containedBg' } }),
    ).to.deep.equal({
      backgroundColor: 'var(--palette-primary-containedBg)',
    });
  });

  it('borderColor', () => {
    expect(styleFunctionSx({ theme, sx: { borderColor: 'primary.outlinedBorder' } })).to.deep.equal(
      {
        borderColor: 'var(--palette-primary-outlinedBorder)',
      },
    );
  });

  it('borderRadius', () => {
    expect(styleFunctionSx({ theme, sx: { borderRadius: 'md' } })).to.deep.equal({
      borderRadius: 'var(--radius-md)',
    });
  });

  it('boxShadow', () => {
    expect(styleFunctionSx({ theme, sx: { boxShadow: 'md' } })).to.deep.equal({
      boxShadow: 'var(--shadow-md)',
    });
  });

  it('fontFamily', () => {
    expect(styleFunctionSx({ theme, sx: { fontFamily: 'display' } })).to.deep.equal({
      fontFamily: 'var(--fontFamily-display)',
    });
  });

  it('fontSize', () => {
    expect(styleFunctionSx({ theme, sx: { fontSize: 'md' } })).to.deep.equal({
      fontSize: 'var(--fontSize-md)',
    });
  });

  it('fontWeight', () => {
    expect(styleFunctionSx({ theme, sx: { fontWeight: 'md' } })).to.deep.equal({
      fontWeight: 'var(--fontWeight-md)',
    });
  });

  it('letterSpacing', () => {
    expect(styleFunctionSx({ theme, sx: { letterSpacing: 'md' } })).to.deep.equal({
      letterSpacing: 'var(--letterSpacing-md)',
    });
  });

  it('lineHeight', () => {
    expect(styleFunctionSx({ theme, sx: { lineHeight: 'md' } })).to.deep.equal({
      lineHeight: 'var(--lineHeight-md)',
    });
  });

  it('should handle reponsive styles', () => {
    expect(
      styleFunctionSx({ theme, sx: { fontSize: { xs: 'sm', md: 'md', xl: 'xl' } } }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        fontSize: 'var(--fontSize-sm)',
      },
      '@media (min-width:900px)': {
        fontSize: 'var(--fontSize-md)',
      },
      '@media (min-width:1536px)': {
        fontSize: 'var(--fontSize-xl)',
      },
    });
  });
});

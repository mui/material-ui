import { describe, it, expect } from 'vitest';
import createTheme from '@mui/system/createTheme';
import sizing from './sizing';

describe('sizing', () => {
  it('sizing', () => {
    const output = sizing({
      height: 10,
    });
    expect(output).to.deep.equal({
      height: 10,
    });
  });

  it('should work with 0', () => {
    const output = sizing({
      maxWidth: 0,
    });
    expect(output).to.deep.equal({
      maxWidth: 0,
    });
  });

  describe('maxWidth', () => {
    it('should work with custom units', () => {
      const theme = createTheme({
        breakpoints: {
          unit: 'rem',
          values: {
            xs: 10,
          },
        },
      });

      const output = sizing({
        maxWidth: 'xs',
        theme,
      });

      expect(output).to.deep.equal({
        maxWidth: '10rem',
      });
    });

    it('should use the default breakpoints without a theme', () => {
      const output = sizing({
        maxWidth: 'sm',
      });

      expect(output).to.deep.equal({
        maxWidth: 600,
      });
    });

    it('should use px when the theme breakpoints have no unit', () => {
      const output = sizing({
        maxWidth: 'md',
        theme: {
          breakpoints: {
            values: {
              md: 900,
            },
          },
        },
      });

      expect(output).to.deep.equal({
        maxWidth: 900,
      });
    });
  });
});

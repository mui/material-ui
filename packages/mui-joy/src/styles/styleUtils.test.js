import { expect } from 'chai';
import { resolveSxValue } from './styleUtils';
import defaultTheme from './defaultTheme';

describe('getThemeValue', () => {
  it('return undefined if no sx', () => {
    expect(resolveSxValue({ theme: defaultTheme, ownerState: {} }, [])).to.deep.equal({});
  });

  describe('border-radius', () => {
    it('return correct value if shorthand is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { borderRadius: 'md' } } }, [
          'borderRadius',
        ]),
      ).to.deep.equal({ borderRadius: defaultTheme.vars.radius.md });
    });

    it('return correct value if number is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { borderRadius: 20 } } }, [
          'borderRadius',
        ]),
      ).to.deep.equal({ borderRadius: '20px' });
    });

    it('return correct value if css value is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { borderRadius: '1rem' } } }, [
          'borderRadius',
        ]),
      ).to.deep.equal({ borderRadius: '1rem' });
    });

    it('works with sx as a function', () => {
      expect(
        resolveSxValue(
          { theme: defaultTheme, ownerState: { sx: () => ({ borderRadius: 'sm' }) } },
          ['borderRadius'],
        ),
      ).to.deep.equal({ borderRadius: defaultTheme.vars.radius.sm });
    });

    it('works with sx as an array', () => {
      expect(
        resolveSxValue(
          {
            theme: defaultTheme,
            ownerState: { sx: [{ borderRadius: 'sm' }, () => ({ borderRadius: '12px' })] },
          },
          ['borderRadius'],
        ),
      ).to.deep.equal({ borderRadius: '12px' });
    });
  });

  describe('padding', () => {
    it('return correct value if shorthand is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { p: 2 } } }, ['p']),
      ).to.deep.equal({ p: 'calc(2 * var(--joy-spacing, 8px))' });
    });

    it('return correct value if number is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { padding: 2 } } }, ['padding']),
      ).to.deep.equal({ padding: 'calc(2 * var(--joy-spacing, 8px))' });
    });

    it('return correct value if css value is provided', () => {
      expect(
        resolveSxValue({ theme: defaultTheme, ownerState: { sx: { padding: '1rem' } } }, [
          'padding',
        ]),
      ).to.deep.equal({ padding: '1rem' });
    });
  });
});

import { expect } from 'chai';
import { resolveSxValue } from './styleUtils';
import defaultTheme from './defaultTheme';

describe('getThemeValue', () => {
  it('return undefined if no sx', () => {
    expect(resolveSxValue({ theme: defaultTheme, ownerState: {} })).to.equal(undefined);
  });

  describe('border-radius', () => {
    it('return correct value if shorthand is provided', () => {
      expect(
        resolveSxValue(
          { theme: defaultTheme, ownerState: { sx: { borderRadius: 'md' } } },
          'borderRadius',
        ),
      ).to.equal(defaultTheme.vars.radius.md);
    });

    it('return correct value if number is provided', () => {
      expect(
        resolveSxValue(
          { theme: defaultTheme, ownerState: { sx: { borderRadius: 20 } } },
          'borderRadius',
        ),
      ).to.equal('20px');
    });

    it('return correct value if css value is provided', () => {
      expect(
        resolveSxValue(
          { theme: defaultTheme, ownerState: { sx: { borderRadius: '1rem' } } },
          'borderRadius',
        ),
      ).to.equal('1rem');
    });

    it('works with sx as a function', () => {
      expect(
        resolveSxValue(
          { theme: defaultTheme, ownerState: { sx: () => ({ borderRadius: 'sm' }) } },
          'borderRadius',
        ),
      ).to.equal(defaultTheme.vars.radius.sm);
    });

    it('works with sx as an array', () => {
      expect(
        resolveSxValue(
          {
            theme: defaultTheme,
            ownerState: { sx: [{ borderRadius: 'sm' }, () => ({ borderRadius: '12px' })] },
          },
          'borderRadius',
        ),
      ).to.equal('12px');
    });
  });
});

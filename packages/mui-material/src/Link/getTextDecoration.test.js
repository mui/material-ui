import { expect } from 'chai';
import { createTheme, experimental_extendTheme as extendTheme } from '../styles';
import getTextDecoration from './getTextDecoration';

describe('getTextDecoration', () => {
  describe('without theme.vars', () => {
    const theme = createTheme();
    it('deprecated color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: 'primary' } })).to.equal(
        'rgba(25, 118, 210, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'textPrimary' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'secondary' } })).to.equal(
        'rgba(156, 39, 176, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'textSecondary' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'error' } })).to.equal(
        'rgba(211, 47, 47, 0.4)',
      );
    });

    it('system color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: 'primary.main' } })).to.equal(
        'rgba(25, 118, 210, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'text.primary' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'secondary.main' } })).to.equal(
        'rgba(156, 39, 176, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'text.secondary' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'error.main' } })).to.equal(
        'rgba(211, 47, 47, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'grey.500' } })).to.equal(
        'rgba(158, 158, 158, 0.4)',
      );
    });

    it('valid CSS color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: '#000' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'rgb(1, 1, 1)' } })).to.equal(
        'rgba(1, 1, 1, 0.4)',
      );
      expect(() => getTextDecoration({ theme, ownerState: { color: 'yellow' } })).to.throw();
    });
  });

  describe('CSS variables', () => {
    const theme = extendTheme();
    theme.palette = theme.colorSchemes.light.palette;
    theme.vars = {
      palette: {
        primary: {
          main: 'var(--palette-primary-main)',
        },
        secondary: {
          main: 'var(--palette-secondary-main)',
        },
        text: {
          primary: 'var(--palette-text-primary)',
          secondary: 'var(--palette-text-secondary)',
        },
        error: {
          main: 'var(--palette-error-main)',
        },
      },
    };
    // in the application, the value will be CSS variable: `rgba(var(--the-color-channel) / 0.4)`
    it('deprecated color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: 'primary' } })).to.equal(
        'rgba(var(--palette-primary-main) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'textPrimary' } })).to.equal(
        'rgba(var(--palette-text-primary) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'secondary' } })).to.equal(
        'rgba(var(--palette-secondary-main) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'textSecondary' } })).to.equal(
        'rgba(var(--palette-text-secondary) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'error' } })).to.equal(
        'rgba(var(--palette-error-main) / 0.4)',
      );
    });

    it('system color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: 'primary.main' } })).to.equal(
        'rgba(var(--palette-primary-main) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'text.primary' } })).to.equal(
        'rgba(var(--palette-text-primary) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'secondary.main' } })).to.equal(
        'rgba(var(--palette-secondary-main) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'text.secondary' } })).to.equal(
        'rgba(var(--palette-text-secondary) / 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'error.main' } })).to.equal(
        'rgba(var(--palette-error-main) / 0.4)',
      );

      // it fallback to use `theme.palette.grey.500` with alpha() if it could not find channel color
      expect(getTextDecoration({ theme, ownerState: { color: 'grey.500' } })).to.equal(
        'rgba(158, 158, 158, 0.4)',
      );
    });

    it('valid CSS color', () => {
      expect(getTextDecoration({ theme, ownerState: { color: '#000' } })).to.equal(
        'rgba(0, 0, 0, 0.4)',
      );
      expect(getTextDecoration({ theme, ownerState: { color: 'rgb(1, 1, 1)' } })).to.equal(
        'rgba(1, 1, 1, 0.4)',
      );
      expect(() => getTextDecoration({ theme, ownerState: { color: 'yellow' } })).to.throw();
    });
  });
});

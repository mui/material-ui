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
    theme.vars = theme.colorSchemes.light;
    theme.vars.palette.primary.mainChannel = 'var(--palette-primary-main)';
    theme.vars.palette.secondary.mainChannel = 'var(--palette-secondary-main)';
    theme.vars.palette.text.primaryChannel = 'var(--palette-text-primary)';
    theme.vars.palette.text.secondaryChannel = 'var(--palette-text-secondary)';
    theme.vars.palette.error.mainChannel = 'var(--palette-error-main)';
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

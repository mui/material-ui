import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import { applyDensity, DENSITY_KEYS } from './densityScale';

describe('densityScale', () => {
  describe('applyDensity on a static theme', () => {
    test('theme.spacing resolves scale keys to raw px off the 8px unit', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('xx-small')).to.equal('4px');
      expect(theme.spacing('small')).to.equal('12px');
      const steps = Object.fromEntries(DENSITY_KEYS.map((key) => [key, theme.spacing(key)]));
      expect(steps).to.deep.equal({
        'xx-small': '4px',
        'x-small': '8px',
        small: '12px',
        medium: '16px',
        large: '24px',
        'x-large': '32px',
        'xx-large': '48px',
      });
    });

    test('negated keys resolve to negative px; numbers and raw CSS stay untouched', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('-x-small')).to.equal('-8px');
      expect(theme.spacing(2)).to.equal('16px');
      expect(theme.spacing('small', 2)).to.equal('12px 16px');
      expect(theme.spacing('auto')).to.equal('auto');
      expect(theme.spacing(1, 'auto')).to.equal('8px auto');
    });

    test('does not add a density node and emits no vars', () => {
      const theme = applyDensity(createTheme());

      expect('density' in theme).to.equal(false);
      expect('scaling' in theme).to.equal(false);
      expect('vars' in theme).to.equal(false);
    });

    test('scale overrides replace a step wholesale (number = px)', () => {
      const theme = applyDensity(createTheme(), {
        small: 6,
        large: 40,
      });

      expect(theme.spacing('small')).to.equal('6px');
      expect(theme.spacing('-small')).to.equal('-6px');
      expect(theme.spacing('large')).to.equal('40px');
      expect(theme.spacing('medium')).to.equal('16px');
    });

    test('does not mutate the input theme and owns a fresh components object', () => {
      const input = createTheme({
        components: { MuiButton: { defaultProps: { disableRipple: true } } },
      });
      const theme = applyDensity(input);

      expect(input.spacing(2)).to.equal('16px');
      expect(input.spacing('small')).to.equal('small');
      expect(theme.components).to.not.equal(input.components);
      expect(theme.components.MuiButton).to.deep.equal({
        defaultProps: { disableRipple: true },
      });
    });
  });

  describe('applyDensity on a CSS-vars theme', () => {
    test('theme.spacing resolves scale keys to step var refs', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small)');
      expect(theme.spacing('-x-small')).to.equal('calc(var(--mui-spacing-x-small) * -1)');
      expect(theme.spacing('small', 2)).to.equal(
        'var(--mui-spacing-small) calc(2 * var(--mui-spacing, 8px))',
      );
    });

    test('numeric args keep the theme spacing output — the dial lives in the var value', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
      // Explicit string args are author-written CSS — pass through untouched.
      expect(theme.spacing(1, 'auto')).to.equal('var(--mui-spacing, 8px) auto');
    });

    test('every scale key resolves to its step var ref', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      DENSITY_KEYS.forEach((key) => {
        expect(theme.spacing(key)).to.equal(`var(--mui-spacing-${key})`);
      });
    });

    test('does not touch theme.vars — same object, no extra keys', () => {
      const input = createTheme({ cssVariables: true });
      const theme = applyDensity(input);

      expect(theme.vars).to.equal(input.vars);
      expect('density' in theme.vars).to.equal(false);
      expect('scaling' in theme.vars).to.equal(false);
    });

    test('generateStyleSheets appends the step block LAST', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(rootVars['--mui-spacing-medium']).to.equal('calc(2 * var(--mui-spacing, 8px))');
      expect(rootVars['--mui-spacing-small']).to.equal('calc(1.5 * var(--mui-spacing, 8px))');
    });

    test('scale overrides land as the step var VALUE on a vars theme', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), {
        small: 6,
      });
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(rootVars['--mui-spacing-small']).to.equal('6px');
      // keyed spacing still returns the REF — runtime re-mapping keeps working
      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small)');
    });

    test('respects a custom cssVarPrefix', () => {
      const theme = applyDensity(createTheme({ cssVariables: { cssVarPrefix: 'app' } }));

      expect(theme.spacing('small')).to.equal('var(--app-spacing-small)');
      expect(theme.spacing(1)).to.equal('var(--app-spacing, 8px)');
    });
  });
});

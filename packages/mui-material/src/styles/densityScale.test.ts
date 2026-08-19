import { expect } from 'chai';
import createTheme from './createTheme';
import { applyDensity, DENSITY_KEYS, DensityMultipliers, DensityScale } from './densityScale';

// `applyDensity` is the presets' private core — the public Theme/ThemeVars types
// don't declare its `scaling`/`vars.density` additions, so tests read through these.
type WithScaling = { scaling?: number };
type DensityVars = { density: DensityScale; scaling: string };

// The high-density ladder: steps × 8px → 2/4/8/12/16/24/32.
const multipliers: DensityMultipliers = {
  'xx-small': 0.25,
  'x-small': 0.5,
  small: 1,
  medium: 1.5,
  large: 2,
  'x-large': 3,
  'xx-large': 4,
  'touch-target': 3.5,
};

describe('densityScale', () => {
  describe('applyDensity on a static theme', () => {
    test('exposes raw px steps on theme.density off the 8px spacing unit', () => {
      const theme = applyDensity(createTheme(), multipliers);

      expect(theme.density).to.deep.equal({
        'xx-small': '2px',
        'x-small': '4px',
        small: '8px',
        medium: '12px',
        large: '16px',
        'x-large': '24px',
        'xx-large': '32px',
        'touch-target': '28px',
      });
    });

    test('records scaling on the theme but emits no vars', () => {
      const theme = applyDensity(createTheme(), multipliers, { scaling: 1.2 });

      expect((theme as WithScaling).scaling).to.equal(1.2);
      expect('vars' in theme).to.equal(false);
    });

    test('defaults scaling to 1 and does not intercept theme.spacing', () => {
      const input = createTheme();
      const theme = applyDensity(input, multipliers);

      expect((theme as WithScaling).scaling).to.equal(1);
      expect(theme.spacing).to.equal(input.spacing);
      expect(theme.spacing(2)).to.equal('16px');
    });

    test('does not mutate the input theme and owns a fresh components object', () => {
      const input = createTheme({
        components: { MuiButton: { defaultProps: { disableRipple: true } } },
      });
      const theme = applyDensity(input, multipliers);

      expect('density' in input).to.equal(false);
      expect((input as WithScaling).scaling).to.equal(undefined);
      expect(theme.components).to.not.equal(input.components);
      expect(theme.components.MuiButton).to.deep.equal({
        defaultProps: { disableRipple: true },
      });
    });
  });

  describe('applyDensity on a CSS-vars theme', () => {
    test('intercepts theme.spacing so numeric args ride the scaling dial', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), multipliers);

      expect(theme.spacing(2)).to.equal(
        'calc(calc(2 * var(--mui-spacing, 8px)) * var(--mui-scaling))',
      );
      // Explicit string args are author-written CSS — pass through untouched.
      expect(theme.spacing(1, 'auto')).to.equal(
        'calc(var(--mui-spacing, 8px) * var(--mui-scaling)) auto',
      );
    });

    test('theme.density steps carry the scaled spacing calc', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), multipliers);

      expect(theme.density.small).to.equal('calc(var(--mui-spacing, 8px) * var(--mui-scaling))');
      expect(theme.density['x-large']).to.equal(
        'calc(calc(3 * var(--mui-spacing, 8px)) * var(--mui-scaling))',
      );
    });

    test('exposes var refs on theme.vars.density and theme.vars.scaling', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), multipliers);

      const vars = theme.vars as unknown as DensityVars;
      DENSITY_KEYS.forEach((key) => {
        expect(vars.density[key]).to.equal(`var(--mui-density-${key})`);
      });
      expect(vars.scaling).to.equal('var(--mui-scaling)');
    });

    test('generateThemeVars keeps density and scaling after a provider rebuild', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), multipliers);
      const vars = theme.generateThemeVars() as unknown as DensityVars & { palette: unknown };

      expect(vars.density['xx-small']).to.equal('var(--mui-density-xx-small)');
      expect(vars.scaling).to.equal('var(--mui-scaling)');
      // The theme's own vars channel survives the wrap.
      expect(vars.palette).to.not.equal(undefined);
    });

    test('generateStyleSheets appends a root block with the dial, steps and radius', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), multipliers, {
        scaling: 0.9,
      });
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(rootVars['--mui-scaling']).to.equal('0.9');
      expect(rootVars['--mui-density-medium']).to.equal(
        'calc(calc(1.5 * var(--mui-spacing, 8px)) * var(--mui-scaling))',
      );
      // Default shape.borderRadius (4) rides the dial.
      expect(rootVars['--mui-shape-borderRadius']).to.equal('calc(4px * var(--mui-scaling))');
    });

    test('wraps variant fontSize and unit-carrying lineHeight, skips unitless ratios', () => {
      const theme = applyDensity(
        createTheme({
          cssVariables: true,
          typography: { subtitle1: { fontSize: 14, lineHeight: '20px' } },
        }),
        multipliers,
      );

      const h1 = theme.typography.h1 as { fontSize: string; lineHeight: number };
      expect(h1.fontSize).to.equal('calc(6rem * var(--mui-scaling))');
      // Unitless ratio already scales with font-size — stays a raw number.
      expect(h1.lineHeight).to.equal(createTheme().typography.h1.lineHeight);

      const subtitle1 = theme.typography.subtitle1 as { fontSize: string; lineHeight: string };
      expect(subtitle1.fontSize).to.equal('calc(14px * var(--mui-scaling))');
      expect(subtitle1.lineHeight).to.equal('calc(20px * var(--mui-scaling))');

      // Scalar typography leaves feed JS math and must stay raw.
      expect(theme.typography.fontSize).to.equal(14);
      expect(theme.typography.pxToRem(16)).to.equal('1rem');
    });

    test('respects a custom cssVarPrefix', () => {
      const theme = applyDensity(
        createTheme({ cssVariables: { cssVarPrefix: 'app' } }),
        multipliers,
      );

      expect((theme.vars as unknown as DensityVars).density.small).to.equal(
        'var(--app-density-small)',
      );
      expect(theme.spacing(1)).to.equal('calc(var(--app-spacing, 8px) * var(--app-scaling))');
    });
  });
});

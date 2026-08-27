import { describe, test, expect, vi } from 'vitest';
import createTheme from './createTheme';
import enhanceDensity from './enhanceDensity';

// Covers only what enhanceDensity itself owns — the ONE shipped ladder, the
// scale-override recipe path, and the component-emission hookup. The
// keyed-spacing mechanics (var refs, negation, vars channel) live in
// densityScale.test.ts against applyDensity.

describe('enhanceDensity', () => {
  test('ships the one canonical ladder (static px)', () => {
    const theme = enhanceDensity(createTheme());

    expect(theme.spacing('small')).to.equal('12px');
    expect(theme.spacing('touch-target')).to.equal('32px');
    expect(theme.spacing('xx-large')).to.equal('48px');
  });

  test('a full ladder override re-scales every step (the docs-recipe path)', () => {
    const compact = enhanceDensity(createTheme(), {
      'xx-small': 2,
      'x-small': 4,
      small: 8,
      medium: 12,
      large: 16,
      'x-large': 24,
      'xx-large': 32,
      'touch-target': 24,
    });

    expect(compact.spacing('small')).to.equal('8px');
    expect(compact.spacing('touch-target')).to.equal('24px');
    expect(compact.spacing('xx-large')).to.equal('32px');
  });

  test('a partial override keeps the canonical ladder elsewhere', () => {
    const theme = enhanceDensity(createTheme(), { 'touch-target': 40 });

    expect(theme.spacing('touch-target')).to.equal('40px');
    expect(theme.spacing('small')).to.equal('12px');
  });

  test('emits the steps as a last sheet block, off the theme spacing var', () => {
    const input = createTheme({ cssVariables: true });
    const theme = enhanceDensity(input);
    const sheets = theme.generateStyleSheets();
    const stepVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

    expect(stepVars['--mui-spacing-medium']).to.equal('calc(2 * var(--mui-spacing, 8px))');
    // no vars-node additions — consistent with density having none
    expect(theme.vars).to.equal(input.vars);
  });

  describe('spacing theme option forms', () => {
    const lastSheets = (theme: ReturnType<typeof enhanceDensity>) => {
      const sheets = theme.generateStyleSheets();
      return { stepVars: sheets[sheets.length - 1][':root'] as Record<string, string> };
    };

    test('number: steps ride the unit proportionally', () => {
      const theme = enhanceDensity(createTheme({ spacing: 4 }));
      expect(theme.spacing('small')).to.equal('6px');
      expect(theme.spacing('touch-target')).to.equal('16px');
      expect(theme.spacing(2)).to.equal('8px');
    });

    test('string: steps stay calc() on the unit', () => {
      const staticTheme = enhanceDensity(createTheme({ spacing: '0.5rem' }));
      expect(staticTheme.spacing('medium')).to.equal('calc(2 * 0.5rem)');

      const { stepVars } = lastSheets(
        enhanceDensity(createTheme({ cssVariables: true, spacing: '0.5rem' })),
      );
      expect(stepVars['--mui-spacing-small']).to.equal('calc(1.5 * var(--mui-spacing, 0.5rem))');
    });

    test('function: multipliers flow through the transform', () => {
      const spacing = (factor: number) => `${0.25 * factor}rem`;
      const staticTheme = enhanceDensity(createTheme({ spacing }));
      expect(staticTheme.spacing('small')).to.equal('0.375rem');
      expect(staticTheme.spacing('-small')).to.equal('-0.375rem');

      const { stepVars } = lastSheets(enhanceDensity(createTheme({ cssVariables: true, spacing })));
      expect(stepVars['--mui-spacing-touch-target']).to.equal('1rem');
    });

    test('array: fractional multipliers have no index — canonical px fallback', () => {
      // Component emissions make fractional spacing() calls, which array
      // spacing warns about upstream (same as `sx={{ p: 0.5 }}` would).
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const spacing = [0, 4, 8, 16, 32, 64, 128, 256];
      const staticTheme = enhanceDensity(createTheme({ spacing }));
      expect(staticTheme.spacing('small')).to.equal('12px');
      expect(staticTheme.spacing('-small')).to.equal('-12px');
      expect(staticTheme.spacing(2)).to.equal('8px'); // plain array lookups untouched

      const { stepVars } = lastSheets(enhanceDensity(createTheme({ cssVariables: true, spacing })));
      expect(stepVars['--mui-spacing-small']).to.equal('12px');
      expect(stepVars['--mui-spacing-medium']).to.equal('16px');
      consoleError.mockRestore();
    });
  });

  test('leaves the type ramp untouched', () => {
    const base = createTheme({ cssVariables: true });
    const theme = enhanceDensity(createTheme({ cssVariables: true }));

    expect(theme.typography.h1.fontSize).to.equal(base.typography.h1.fontSize);
    expect(theme.typography.body1.lineHeight).to.equal(base.typography.body1.lineHeight);
    expect(theme.typography.fontSize).to.equal(base.typography.fontSize);
  });

  test('applies the component emissions', () => {
    const theme = enhanceDensity(createTheme());

    // one shallow probe — applySharedDensity ran and wrote styleOverrides
    expect(theme.components.MuiButton?.styleOverrides?.root).to.not.equal(undefined);
  });
});

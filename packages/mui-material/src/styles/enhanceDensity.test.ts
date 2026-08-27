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

  test('scaling plumbing: dial at 1, scaled unit + radius, vars untouched, steps last', () => {
    const input = createTheme({ cssVariables: true });
    const theme = enhanceDensity(input);
    const sheets = theme.generateStyleSheets();
    const dialVars = sheets[sheets.length - 2][':root'] as Record<string, string>;
    const stepVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

    expect(dialVars['--mui-scaling']).to.equal('1');
    expect(dialVars['--mui-spacing']).to.equal('calc(8px * var(--mui-scaling))');
    expect(dialVars['--mui-shape-borderRadius']).to.equal('calc(4px * var(--mui-scaling))');
    expect(stepVars['--mui-spacing-medium']).to.equal('calc(2 * var(--mui-spacing, 8px))');
    // no vars-node additions — consistent with density having none
    expect(theme.vars).to.equal(input.vars);
  });

  describe('spacing theme option forms', () => {
    const lastSheets = (theme: ReturnType<typeof enhanceDensity>) => {
      const sheets = theme.generateStyleSheets();
      return {
        dialVars: sheets[sheets.length - 2][':root'] as Record<string, string>,
        stepVars: sheets[sheets.length - 1][':root'] as Record<string, string>,
      };
    };

    test('number: steps ride the unit proportionally, dial re-emit carries it', () => {
      const theme = enhanceDensity(createTheme({ spacing: 4 }));
      expect(theme.spacing('small')).to.equal('6px');
      expect(theme.spacing('touch-target')).to.equal('16px');
      expect(theme.spacing(2)).to.equal('8px');

      const { dialVars } = lastSheets(
        enhanceDensity(createTheme({ cssVariables: true, spacing: 4 })),
      );
      expect(dialVars['--mui-spacing']).to.equal('calc(4px * var(--mui-scaling))');
    });

    test('string: steps stay calc() on the unit, dial re-emit carries it', () => {
      const staticTheme = enhanceDensity(createTheme({ spacing: '0.5rem' }));
      expect(staticTheme.spacing('medium')).to.equal('calc(2 * 0.5rem)');

      const { dialVars, stepVars } = lastSheets(
        enhanceDensity(createTheme({ cssVariables: true, spacing: '0.5rem' })),
      );
      expect(dialVars['--mui-spacing']).to.equal('calc(0.5rem * var(--mui-scaling))');
      expect(stepVars['--mui-spacing-small']).to.equal('calc(1.5 * var(--mui-spacing, 0.5rem))');
    });

    test('function: multipliers flow through the transform, no unit re-emit', () => {
      const spacing = (factor: number) => `${0.25 * factor}rem`;
      const staticTheme = enhanceDensity(createTheme({ spacing }));
      expect(staticTheme.spacing('small')).to.equal('0.375rem');
      expect(staticTheme.spacing('-small')).to.equal('-0.375rem');

      const { dialVars, stepVars } = lastSheets(
        enhanceDensity(createTheme({ cssVariables: true, spacing })),
      );
      expect(dialVars).to.not.have.property('--mui-spacing');
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

      const { dialVars, stepVars } = lastSheets(
        enhanceDensity(createTheme({ cssVariables: true, spacing })),
      );
      expect(dialVars).to.not.have.property('--mui-spacing');
      expect(stepVars['--mui-spacing-small']).to.equal('12px');
      expect(stepVars['--mui-spacing-medium']).to.equal('16px');
      consoleError.mockRestore();
    });
  });

  test('wraps variant fontSize and unit-carrying lineHeight, skips unitless ratios', () => {
    const theme = enhanceDensity(
      createTheme({
        cssVariables: true,
        typography: { subtitle1: { fontSize: 14, lineHeight: '20px' } },
      }),
    );

    const h1 = theme.typography.h1 as { fontSize: string; lineHeight: number };
    expect(h1.fontSize).to.equal('calc(6rem * var(--mui-scaling))');
    expect(h1.lineHeight).to.equal(createTheme().typography.h1.lineHeight);

    const subtitle1 = theme.typography.subtitle1 as { fontSize: string; lineHeight: string };
    expect(subtitle1.fontSize).to.equal('calc(14px * var(--mui-scaling))');
    expect(subtitle1.lineHeight).to.equal('calc(20px * var(--mui-scaling))');

    // Scalar typography leaves feed JS math and must stay raw.
    expect(theme.typography.fontSize).to.equal(14);
    expect(theme.typography.pxToRem(16)).to.equal('1rem');
  });

  test('keyword typography values (the inherit variant) stay untouched', () => {
    const theme = enhanceDensity(createTheme({ cssVariables: true }));
    const inherit = (theme.typography as any).inherit;

    expect(inherit.fontSize).to.equal('inherit');
    expect(inherit.lineHeight).to.equal('inherit');
  });

  test('a variant carrying only a string lineHeight is still wrapped', () => {
    const theme = enhanceDensity(
      createTheme({ cssVariables: true, typography: { poster: { lineHeight: '20px' } } as any }),
    );

    expect((theme.typography as any).poster.lineHeight).to.equal('calc(20px * var(--mui-scaling))');
    expect((theme.typography as any).poster.fontSize).to.equal(undefined);
  });

  test('applies the component emissions', () => {
    const theme = enhanceDensity(createTheme());

    // one shallow probe — applySharedDensity ran and wrote styleOverrides
    expect(theme.components.MuiButton?.styleOverrides?.root).to.not.equal(undefined);
  });
});

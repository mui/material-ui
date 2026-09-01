import { describe, test, expect, vi } from 'vitest';
import createTheme from './createTheme';
import enhanceDensity from './enhanceDensity';

// Covers only what enhanceDensity itself owns — the ONE shipped ladder, the
// scale-override recipe path, and the component-emission hookup. The
// keyed-spacing mechanics (var refs, negation, vars channel) live in
// densityScale.test.ts against applyDensity.

/** The interactive box as emitted onto a control — it is a plain px constant, so
 * it is only observable through the component styles. */
const controlBox = (theme: ReturnType<typeof enhanceDensity>) =>
  ((theme.components as any).MuiCheckbox.styleOverrides.root as any[])[1]['--_touchSize'];

/** The style a component emits for one variant, matched on its props. */
const variantStyle = (
  theme: ReturnType<typeof enhanceDensity>,
  component: string,
  props: Record<string, string>,
  slot = 'root',
) => {
  const layers = (theme.components as any)[component].styleOverrides[slot] as any[];
  for (const layer of layers) {
    const match = layer?.variants?.find((variant: any) =>
      Object.entries(props).every(([key, value]) => variant.props?.[key] === value),
    );
    if (match) {
      return match.style;
    }
  }
  return undefined;
};

const sizeStyle = (theme: ReturnType<typeof enhanceDensity>, component: string, size: string) =>
  variantStyle(theme, component, { size });

/** Same for the icon glyph, read off the same control. */
const iconBox = (theme: ReturnType<typeof enhanceDensity>) =>
  ((theme.components as any).MuiCheckbox.styleOverrides.root as any[])[1]['--_iconSize'];

describe('enhanceDensity', () => {
  test('ships the one canonical ladder (static px)', () => {
    const theme = enhanceDensity(createTheme());

    expect(theme.spacing('small')).to.equal('12px');
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
    expect(compact.spacing('xx-large')).to.equal('32px');
    expect(controlBox(compact)).to.equal('24px');
  });

  test('a partial override keeps the canonical ladder elsewhere', () => {
    const theme = enhanceDensity(createTheme(), { 'touch-target': 40 });

    expect(controlBox(theme)).to.equal('40px');
    expect(iconBox(theme)).to.equal('16px');
    expect(theme.spacing('small')).to.equal('12px');
  });

  test('every size steps off the interactive box, not the ladder', () => {
    const theme = enhanceDensity(createTheme());

    expect(sizeStyle(theme, 'MuiButton', 'small').height).to.equal('calc(32px - 8px)');
    expect(sizeStyle(theme, 'MuiButton', 'medium').height).to.equal('32px');
    expect(sizeStyle(theme, 'MuiButton', 'large').height).to.equal('calc(32px + 12px)');
  });

  test('a touch-target override carries small and large with it', () => {
    const theme = enhanceDensity(createTheme(), { 'touch-target': 44 });

    // the whole ramp moves; before, small and large sat on fixed ladder steps
    expect(sizeStyle(theme, 'MuiButton', 'small').height).to.equal('calc(44px - 8px)');
    expect(sizeStyle(theme, 'MuiButton', 'large').height).to.equal('calc(44px + 12px)');
    expect(sizeStyle(theme, 'MuiIconButton', 'small').width).to.equal('calc(44px - 8px)');
    expect(sizeStyle(theme, 'MuiToggleButton', 'large')['--_size']).to.equal('calc(44px + 12px)');
  });

  test('Chip holds its own small, one step nearer the box', () => {
    const theme = enhanceDensity(createTheme());

    // 28px, which no shared derivation reaches — see the block comment
    expect(sizeStyle(theme, 'MuiChip', 'small')['--_height']).to.equal('calc(32px - 4px)');
  });

  test('the icon ramp steps off the glyph constant', () => {
    const theme = enhanceDensity(createTheme());
    const svgIcon = (fontSize: string) => variantStyle(theme, 'MuiSvgIcon', { fontSize }).fontSize;

    // 14 / 16 / 20 — the values the ladder used to spell out directly
    expect(svgIcon('small')).to.equal('calc(16px - 2px)');
    expect(svgIcon('medium')).to.equal('16px');
    expect(svgIcon('large')).to.equal('calc(16px + 4px)');
  });

  test('an icon-target override carries the whole ramp', () => {
    const theme = enhanceDensity(createTheme(), { 'icon-target': 20 });

    expect(variantStyle(theme, 'MuiSvgIcon', { fontSize: 'small' }).fontSize).to.equal(
      'calc(20px - 2px)',
    );
    expect(variantStyle(theme, 'MuiSvgIcon', { fontSize: 'large' }).fontSize).to.equal(
      'calc(20px + 4px)',
    );
    // a control's own glyph follows too
    expect(sizeStyle(theme, 'MuiCheckbox', 'small')['--_iconSize']).to.equal('calc(20px - 4px)');
  });

  test('a control size variant reaches the box through its own vars', () => {
    const theme = enhanceDensity(createTheme());
    const base = ((theme.components as any).MuiCheckbox.styleOverrides.root as any[])[1];

    // the variant only rewrites the vars, so the base must consume them
    expect(base.width).to.equal('var(--_touchSize)');
    expect(base['& svg'].fontSize).to.equal('var(--_iconSize)');
    expect(sizeStyle(theme, 'MuiCheckbox', 'small')['--_touchSize']).to.equal('calc(32px - 8px)');
  });

  test('the icon glyph is its own sizing constant', () => {
    expect(iconBox(enhanceDensity(createTheme()))).to.equal('16px');

    const theme = enhanceDensity(createTheme(), { 'icon-target': 20 });
    expect(iconBox(theme)).to.equal('20px');
    // moving the glyph leaves the box it sits in alone
    expect(controlBox(theme)).to.equal('32px');
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
      expect(stepVars['--mui-spacing-x-large']).to.equal('1rem');
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

  describe('sx spacing props', () => {
    const sx = (theme: ReturnType<typeof enhanceDensity>, input: Record<string, unknown>) =>
      (theme as any).unstable_sx(input);

    test('resolves step names, on a static theme and through the vars channel', () => {
      const staticTheme = enhanceDensity(createTheme());
      expect(sx(staticTheme, { p: 'small' })).to.deep.equal({ padding: '12px' });
      expect(sx(staticTheme, { mx: '-small' })).to.deep.equal({
        marginLeft: '-12px',
        marginRight: '-12px',
      });
      expect(sx(staticTheme, { gap: 'x-large' })).to.deep.equal({ gap: '32px' });

      // On a CSS variables theme the sx transformer is built from
      // `theme.vars.spacing`, which can't resolve names — the step must still win.
      const varsTheme = enhanceDensity(createTheme({ cssVariables: true }));
      expect(sx(varsTheme, { p: 'small' })).to.deep.equal({
        padding: 'var(--mui-spacing-small)',
      });
      expect(sx(varsTheme, { gap: '-medium' })).to.deep.equal({
        gap: 'calc(var(--mui-spacing-medium) * -1)',
      });
    });

    test('steps resolve inside responsive values', () => {
      const theme = enhanceDensity(createTheme());

      expect(sx(theme, { p: { xs: 'small', md: 'large' } })).to.deep.equal({
        '@media (min-width:0px)': { padding: '12px' },
        '@media (min-width:900px)': { padding: '24px' },
      });
    });

    test('raw CSS and multipliers are untouched', () => {
      const theme = enhanceDensity(createTheme({ cssVariables: true }));

      expect(sx(theme, { m: 'auto' })).to.deep.equal({ margin: 'auto' });
      expect(sx(theme, { p: '2rem' })).to.deep.equal({ padding: '2rem' });
      expect(sx(theme, { p: 2 })).to.deep.equal({
        padding: 'calc(2 * var(--mui-spacing, 8px))',
      });
      expect(sx(theme, { p: 0 })).to.deep.equal({ padding: 0 });
    });

    test('a theme without the enhancer is unaffected', () => {
      const plain = createTheme({ cssVariables: true });

      // no registered scale — the name stays a raw (invalid) CSS string, exactly
      // as it does today
      expect((plain as any).unstable_sx({ p: 'small' })).to.deep.equal({ padding: 'small' });
      expect((plain as any).unstable_sx({ p: 2 })).to.deep.equal({
        padding: 'calc(2 * var(--mui-spacing, 8px))',
      });
    });
  });

  test('leaves the type ramp untouched', () => {
    const base = createTheme({ cssVariables: true });
    const theme = enhanceDensity(createTheme({ cssVariables: true }));

    expect(theme.typography.h1.fontSize).to.equal(base.typography.h1.fontSize);
    expect(theme.typography.body1.lineHeight).to.equal(base.typography.body1.lineHeight);
    expect(theme.typography.fontSize).to.equal(base.typography.fontSize);
  });

  test('the interactive box is a sizing constant, not a spacing key', () => {
    const theme = enhanceDensity(createTheme({ cssVariables: true }));
    const sheets = theme.generateStyleSheets();
    const stepVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

    // emitted literally, even on a vars theme — no variable to override
    expect(controlBox(theme)).to.equal('32px');
    expect(stepVars).to.not.have.property('--mui-spacing-touch-target');

    // and it never became a spacing key: both channels pass it through as raw CSS
    expect(theme.spacing('touch-target')).to.equal('touch-target');
    expect((theme as any).unstable_sx({ m: 'touch-target' })).to.deep.equal({
      margin: 'touch-target',
    });
  });

  test('the icon glyph is a sizing constant too', () => {
    const theme = enhanceDensity(createTheme({ cssVariables: true }), { 'icon-target': 20 });
    const sheets = theme.generateStyleSheets();
    const stepVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

    expect(iconBox(theme)).to.equal('20px');
    expect(stepVars).to.not.have.property('--mui-spacing-icon-target');
    expect(theme.spacing('icon-target')).to.equal('icon-target');
    expect((theme as any).unstable_sx({ m: 'icon-target' })).to.deep.equal({
      margin: 'icon-target',
    });
  });

  test('applies the component emissions', () => {
    const theme = enhanceDensity(createTheme());

    // one shallow probe — applySharedDensity ran and wrote styleOverrides
    expect(theme.components.MuiButton?.styleOverrides?.root).to.not.equal(undefined);
  });
});

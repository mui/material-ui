import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import { applyDensity, DEFAULT_STEP_PX, DENSITY_KEYS } from './densityScale';

describe('densityScale', () => {
  describe('applyDensity on a static theme', () => {
    test('theme.spacing resolves scale keys to raw px off the 8px unit', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('xxSmall')).to.equal('4px');
      expect(theme.spacing('small')).to.equal('12px');
      const steps = Object.fromEntries(DENSITY_KEYS.map((key) => [key, theme.spacing(key)]));
      expect(steps).to.deep.equal({
        xxSmall: '4px',
        xSmall: '8px',
        small: '12px',
        medium: '16px',
        large: '24px',
        xLarge: '32px',
        xxLarge: '48px',
      });
    });

    test('negated keys resolve to negative px; numbers and raw CSS stay untouched', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('-xSmall')).to.equal('-8px');
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

    test('the sizing constants land on the theme as resolved lengths', () => {
      const theme = applyDensity(createTheme());

      // `(theme.vars || theme)` falls through to the theme on a static one.
      expect(theme.touchTarget).to.equal('32px');
      expect(theme.iconSize).to.equal('16px');
      // still not spacing keys
      expect(theme.spacing('touchTarget')).to.equal('touchTarget');
      expect(theme.spacing('iconSize')).to.equal('iconSize');
    });

    test('the resolved scale is readable in px numbers, overrides included', () => {
      expect(applyDensity(createTheme()).unstable_densityScale).to.deep.equal({
        spacing: DEFAULT_STEP_PX,
        touchTarget: 32,
        iconSize: 16,
      });
      const dense = applyDensity(createTheme(), {
        spacing: { small: 8, large: 20 },
        touchTarget: 24,
      });
      expect(dense.unstable_densityScale.spacing.small).to.equal(8);
      expect(dense.unstable_densityScale.spacing.large).to.equal(20);
      expect(dense.unstable_densityScale.spacing.medium).to.equal(16);
      expect(dense.unstable_densityScale.touchTarget).to.equal(24);
      expect(dense.unstable_densityScale.iconSize).to.equal(16);
      expect('unstable_densityScale' in createTheme()).to.equal(false);
    });

    test('a sizing override moves the theme node with it', () => {
      const theme = applyDensity(createTheme(), { touchTarget: 24, iconSize: 12 });

      expect(theme.touchTarget).to.equal('24px');
      expect(theme.iconSize).to.equal('12px');
    });

    test('scale overrides replace a step wholesale (number = px)', () => {
      const theme = applyDensity(createTheme(), {
        spacing: { small: 6, large: 40 },
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

      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small, 12px)');
      expect(theme.spacing('-xSmall')).to.equal('calc(var(--mui-spacing-xSmall, 8px) * -1)');
      expect(theme.spacing('small', 2)).to.equal(
        'var(--mui-spacing-small, 12px) calc(2 * var(--mui-spacing, 8px))',
      );
    });

    test('numeric args keep the theme spacing output — the dial lives in the var value', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
      // Explicit string args are author-written CSS — pass through untouched.
      expect(theme.spacing(1, 'auto')).to.equal('var(--mui-spacing, 8px) auto');
    });

    test('every scale key resolves to its step var ref, with the px as fallback', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      DENSITY_KEYS.forEach((key) => {
        expect(theme.spacing(key)).to.equal(`var(--mui-spacing-${key}, ${DEFAULT_STEP_PX[key]}px)`);
      });
    });

    test('the steps do not ride the spacing unit — a unit override leaves them in place', () => {
      // `spacing: 4` halves every plain number; the named steps are absolute
      // and keep their px, so a CSS-level `--mui-spacing` override cannot move
      // them either (the definitions carry no reference to it).
      const theme = applyDensity(createTheme({ cssVariables: true, spacing: 4 }));
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 4px))');
      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small, 12px)');
      expect(rootVars['--mui-spacing-small']).to.equal('12px');
      expect(Object.values(rootVars).some((value) => value.includes('--mui-spacing,'))).to.equal(
        false,
      );
    });

    test('the generateSpacing rebuild keeps the scale keys — the CssVarsProvider path', () => {
      // On mount, CssVarsProvider replaces `theme.spacing` with
      // `theme.generateSpacing()` (createCssVarsProvider). The rebuilt function
      // must still resolve steps and advertise `keys`, or every mounted
      // `sx={{ p: 'small' }}` emits the raw name.
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const rebuilt = (theme as any).generateSpacing() as typeof theme.spacing;

      expect(rebuilt('small')).to.equal('var(--mui-spacing-small, 12px)');
      expect(rebuilt(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
      expect((rebuilt as any).keys.has('small')).to.equal(true);
      expect((rebuilt as any).mui).to.equal(true);
    });

    test('adds only the sizing constants to theme.vars, as refs', () => {
      const input = createTheme({ cssVariables: true });
      const theme = applyDensity(input);

      // `(theme.vars || theme)` picks the vars node here, so it has to carry a
      // usable length: the reference, with the resolved px as its fallback.
      expect(theme.vars!.touchTarget).to.equal('var(--mui-touchTarget, 32px)');
      expect(theme.vars!.iconSize).to.equal('var(--mui-iconSize, 16px)');
      // the plain node keeps the resolved length for JS readers
      expect(theme.touchTarget).to.equal('32px');
      // the steps stay off the vars node, and `vars.spacing` is untouched
      expect(theme.vars!.spacing).to.equal(input.vars.spacing);
      expect('density' in theme.vars!).to.equal(false);
      expect('scaling' in theme.vars!).to.equal(false);
      expect('xxSmall' in theme.vars!).to.equal(false);
      expect(Object.keys(theme.vars!).filter((key) => !(key in input.vars))).to.deep.equal([
        'touchTarget',
        'iconSize',
      ]);
    });

    test('the generateThemeVars rebuild keeps the sizing constants — the CssVarsProvider path', () => {
      // On mount, CssVarsProvider replaces `theme.vars` with
      // `theme.generateThemeVars()` (createCssVarsProvider). Without wrapping
      // the generator too, both constants vanish from `theme.vars` at render.
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const rebuilt = theme.generateThemeVars!();

      expect(rebuilt.touchTarget).to.equal('var(--mui-touchTarget, 32px)');
      expect(rebuilt.iconSize).to.equal('var(--mui-iconSize, 16px)');
      // the rest of the node still comes from the generator, which writes bare
      // refs rather than the fallback-carrying ones `theme.vars` holds
      expect(rebuilt.spacing).to.equal('var(--mui-spacing)');
    });

    test('a sizing override carries into both the node and the ref fallback', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), { touchTarget: 24 });

      expect(theme.touchTarget).to.equal('24px');
      expect(theme.vars!.touchTarget).to.equal('var(--mui-touchTarget, 24px)');
    });

    test('generateStyleSheets appends the step block LAST', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(rootVars['--mui-spacing-medium']).to.equal('16px');
      expect(rootVars['--mui-spacing-small']).to.equal('12px');
    });

    test('scale overrides land as the step var VALUE on a vars theme', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), {
        spacing: { small: 6 },
      });
      const sheets = theme.generateStyleSheets();
      const rootVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

      expect(rootVars['--mui-spacing-small']).to.equal('6px');
      // keyed spacing still returns the REF — runtime re-mapping keeps working
      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small, 6px)');
    });

    test('respects a custom cssVarPrefix', () => {
      const theme = applyDensity(createTheme({ cssVariables: { cssVarPrefix: 'app' } }));

      expect(theme.spacing('small')).to.equal('var(--app-spacing-small, 12px)');
      expect(theme.spacing(1)).to.equal('var(--app-spacing, 8px)');
      expect(theme.vars!.touchTarget).to.equal('var(--app-touchTarget, 32px)');
    });
  });
});

import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import { applyDensity, DEFAULT_STEP_PX, DENSITY_KEYS } from './densityScale';

const rootVars = (theme: ReturnType<typeof applyDensity>) => {
  const sheets = theme.generateStyleSheets();
  return sheets[sheets.length - 1][':root'] as Record<string, string>;
};

describe('densityScale', () => {
  describe('applyDensity on a static theme', () => {
    test('theme.spacing resolves every step to px', () => {
      const theme = applyDensity(createTheme());

      expect(
        Object.fromEntries(DENSITY_KEYS.map((key) => [key, theme.spacing(key)])),
      ).to.deep.equal({
        xxSmall: '4px',
        xSmall: '8px',
        small: '12px',
        medium: '16px',
        large: '24px',
        xLarge: '32px',
        xxLarge: '48px',
      });
    });

    test('negated steps resolve to negative px; numbers and raw CSS stay untouched', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('-xSmall')).to.equal('-8px');
      expect(theme.spacing(2)).to.equal('16px');
      expect(theme.spacing('small', 2)).to.equal('12px 16px');
      expect(theme.spacing('auto')).to.equal('auto');
      expect(theme.spacing(1, 'auto')).to.equal('8px auto');
    });

    test('the sizing constants land on the theme as lengths, not as spacing names', () => {
      const theme = applyDensity(createTheme());

      expect(theme.touchTarget).to.equal('32px');
      expect(theme.iconSize).to.equal('16px');
      expect(theme.spacing('touchTarget')).to.equal('touchTarget');
      expect(theme.spacing('iconSize')).to.equal('iconSize');
      expect('vars' in theme).to.equal(false);
    });

    test('the resolved scale is readable in px numbers, overrides included', () => {
      expect(applyDensity(createTheme()).unstable_densityScale).to.deep.equal({
        spacing: DEFAULT_STEP_PX,
        touchTarget: 32,
        iconSize: 16,
      });
      expect(
        applyDensity(createTheme(), { spacing: { small: 8, large: 20 }, touchTarget: 24 })
          .unstable_densityScale,
      ).to.deep.equal({
        spacing: { ...DEFAULT_STEP_PX, small: 8, large: 20 },
        touchTarget: 24,
        iconSize: 16,
      });
      expect('unstable_densityScale' in createTheme()).to.equal(false);
    });

    test('overrides replace a step or a sizing constant and keep the rest', () => {
      const theme = applyDensity(createTheme(), {
        spacing: { small: 6, large: 40 },
        touchTarget: 24,
        iconSize: 12,
      });

      expect(theme.spacing('small')).to.equal('6px');
      expect(theme.spacing('-small')).to.equal('-6px');
      expect(theme.spacing('large')).to.equal('40px');
      expect(theme.spacing('medium')).to.equal('16px');
      expect(theme.touchTarget).to.equal('24px');
      expect(theme.iconSize).to.equal('12px');
    });

    test('every spacing option form keeps the steps in px and its own meaning for numbers', () => {
      const forms: Record<string, any> = {
        number: 4,
        rem: '0.5rem',
        function: (factor: number) => `${0.25 * factor}rem`,
        array: [0, 4, 8, 16, 32, 64],
      };
      const read = (spacing: any) => {
        const theme = applyDensity(createTheme({ spacing }));
        return [theme.spacing('small'), theme.spacing('-small'), theme.spacing(2)];
      };

      expect(
        Object.fromEntries(Object.entries(forms).map(([name, form]) => [name, read(form)])),
      ).to.deep.equal({
        number: ['12px', '-12px', '8px'],
        rem: ['12px', '-12px', 'calc(2 * 0.5rem)'],
        function: ['12px', '-12px', '0.5rem'],
        array: ['12px', '-12px', '8px'],
      });
      expect(
        applyDensity(createTheme({ spacing: [0, 4, 8, 16] }), { spacing: { small: 10 } }).spacing(
          'small',
        ),
      ).to.equal('10px');
    });

    test('does not mutate the input theme and owns a fresh components object', () => {
      const input = createTheme({
        components: { MuiButton: { defaultProps: { disableRipple: true } } },
      });
      const theme = applyDensity(input);

      expect(input.spacing(2)).to.equal('16px');
      expect(input.spacing('small')).to.equal('small');
      expect(theme.components).to.not.equal(input.components);
      expect(theme.components.MuiButton).to.deep.equal({ defaultProps: { disableRipple: true } });
    });
  });

  describe('applyDensity on a CSS variables theme', () => {
    test('theme.spacing resolves every step to its variable, with the px as fallback', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      DENSITY_KEYS.forEach((key) => {
        expect(theme.spacing(key)).to.equal(`var(--mui-spacing-${key}, ${DEFAULT_STEP_PX[key]}px)`);
      });
      expect(theme.spacing('-xSmall')).to.equal('calc(var(--mui-spacing-xSmall, 8px) * -1)');
      expect(theme.spacing('small', 2)).to.equal(
        'var(--mui-spacing-small, 12px) calc(2 * var(--mui-spacing, 8px))',
      );
      expect(theme.spacing(1, 'auto')).to.equal('var(--mui-spacing, 8px) auto');
    });

    test('the last style sheet defines the steps and sizing constants in px', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), { spacing: { small: 6 } });

      expect(rootVars(theme)).to.include({
        '--mui-spacing-small': '6px',
        '--mui-spacing-medium': '16px',
        '--mui-touchTarget': '32px',
        '--mui-iconSize': '16px',
      });
      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small, 6px)');
    });

    test('the step definitions stay px whatever the spacing unit', () => {
      ([4, '0.5rem', [0, 4, 8, 16, 32, 64]] as any[]).forEach((spacing) => {
        const vars = rootVars(applyDensity(createTheme({ cssVariables: true, spacing })));
        expect(vars['--mui-spacing-small']).to.equal('12px');
        expect(Object.values(vars).some((value) => value.includes('--mui-spacing,'))).to.equal(
          false,
        );
      });
    });

    test('adds only the sizing constants to theme.vars, as references', () => {
      const input = createTheme({ cssVariables: true });
      const theme = applyDensity(input, { touchTarget: 24 });

      expect(theme.vars!.touchTarget).to.equal('var(--mui-touchTarget, 24px)');
      expect(theme.vars!.iconSize).to.equal('var(--mui-iconSize, 16px)');
      expect(theme.touchTarget).to.equal('24px');
      expect(theme.vars!.spacing).to.equal(input.vars.spacing);
      expect(Object.keys(theme.vars!).filter((key) => !(key in input.vars))).to.deep.equal([
        'touchTarget',
        'iconSize',
      ]);
    });

    test('the rebuilds CssVarsProvider runs on mount keep the steps and sizing constants', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const spacing = (theme as any).generateSpacing() as typeof theme.spacing;
      const vars = theme.generateThemeVars!() as NonNullable<typeof theme.vars>;

      expect(spacing('small')).to.equal('var(--mui-spacing-small, 12px)');
      expect(spacing(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
      expect((spacing as any).keys.has('small')).to.equal(true);
      expect(vars.touchTarget).to.equal('var(--mui-touchTarget, 32px)');
      expect(vars.iconSize).to.equal('var(--mui-iconSize, 16px)');
      expect(vars.spacing).to.equal('var(--mui-spacing)');
    });

    test('respects cssVarPrefix, including an empty one', () => {
      const app = applyDensity(createTheme({ cssVariables: { cssVarPrefix: 'app' } }));
      const bare = applyDensity(createTheme({ cssVariables: { cssVarPrefix: '' } }));

      expect(app.spacing('small')).to.equal('var(--app-spacing-small, 12px)');
      expect(app.spacing(1)).to.equal('var(--app-spacing, 8px)');
      expect(app.vars!.touchTarget).to.equal('var(--app-touchTarget, 32px)');
      expect(bare.spacing('small')).to.equal('var(--spacing-small, 12px)');
      expect(bare.vars!.touchTarget).to.equal('var(--touchTarget, 32px)');
      expect(rootVars(bare)).to.include({ '--spacing-small': '12px', '--touchTarget': '32px' });
      expect(Object.keys(rootVars(bare)).some((name) => name.startsWith('---'))).to.equal(false);
    });
  });
});

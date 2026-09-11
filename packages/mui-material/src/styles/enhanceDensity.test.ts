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
  ((theme.components as any).MuiCheckbox.styleOverrides.root as any[]).find(
    (layer) => layer?.height !== undefined,
  ).height;

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
  ((theme.components as any).MuiCheckbox.styleOverrides.root as any[]).find(
    (layer) => layer?.['& svg'] !== undefined,
  )['& svg'].fontSize;

describe('enhanceDensity', () => {
  test('ships the one canonical ladder (static px)', () => {
    const theme = enhanceDensity(createTheme());

    expect(theme.spacing('small')).to.equal('12px');
    expect(theme.spacing('xxLarge')).to.equal('48px');
  });

  test('a full ladder override re-scales every step (the docs-recipe path)', () => {
    const compact = enhanceDensity(createTheme(), {
      xxSmall: 2,
      xSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      xLarge: 24,
      xxLarge: 32,
      touchTarget: 24,
    });

    expect(compact.spacing('small')).to.equal('8px');
    expect(compact.spacing('xxLarge')).to.equal('32px');
    expect(controlBox(compact)).to.equal('24px');
  });

  test('a partial override keeps the canonical ladder elsewhere', () => {
    const theme = enhanceDensity(createTheme(), { touchTarget: 40 });

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

  test('a touchTarget override carries small and large with it', () => {
    const theme = enhanceDensity(createTheme(), { touchTarget: 44 });

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

  test('an iconSize override carries the whole ramp', () => {
    const theme = enhanceDensity(createTheme(), { iconSize: 20 });

    expect(variantStyle(theme, 'MuiSvgIcon', { fontSize: 'small' }).fontSize).to.equal(
      'calc(20px - 2px)',
    );
    expect(variantStyle(theme, 'MuiSvgIcon', { fontSize: 'large' }).fontSize).to.equal(
      'calc(20px + 4px)',
    );
    // a control's own glyph follows too
    expect(sizeStyle(theme, 'MuiCheckbox', 'small')['& svg'].fontSize).to.equal('calc(20px - 2px)');
  });

  test('a control size variant sets the box it changes', () => {
    const small = sizeStyle(enhanceDensity(createTheme()), 'MuiCheckbox', 'small');

    // written straight onto the variant — nothing indirects through a var
    expect(small.width).to.equal('calc(32px - 8px)');
    expect(small.height).to.equal('calc(32px - 8px)');
    expect(small['& svg'].fontSize).to.equal('calc(16px - 2px)');
  });

  test('the icon glyph is its own sizing constant', () => {
    expect(iconBox(enhanceDensity(createTheme()))).to.equal('16px');

    const theme = enhanceDensity(createTheme(), { iconSize: 20 });
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
      expect(stepVars['--mui-spacing-xLarge']).to.equal('1rem');
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
      expect(sx(staticTheme, { gap: 'xLarge' })).to.deep.equal({ gap: '32px' });

      // On a CSS variables theme the sx transformer is built from
      // `theme.vars.spacing`, which can't resolve names — the step must still win.
      const varsTheme = enhanceDensity(createTheme({ cssVariables: true }));
      expect(sx(varsTheme, { p: 'small' })).to.deep.equal({
        padding: 'var(--mui-spacing-small, calc(1.5 * var(--mui-spacing, 8px)))',
      });
      expect(sx(varsTheme, { gap: '-medium' })).to.deep.equal({
        gap: 'calc(var(--mui-spacing-medium, calc(2 * var(--mui-spacing, 8px))) * -1)',
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
    expect(stepVars).to.not.have.property('--mui-spacing-touchTarget');

    // and it never became a spacing key: both channels pass it through as raw CSS
    expect(theme.spacing('touchTarget')).to.equal('touchTarget');
    expect((theme as any).unstable_sx({ m: 'touchTarget' })).to.deep.equal({
      margin: 'touchTarget',
    });
  });

  test('the icon glyph is a sizing constant too', () => {
    const theme = enhanceDensity(createTheme({ cssVariables: true }), { iconSize: 20 });
    const sheets = theme.generateStyleSheets();
    const stepVars = sheets[sheets.length - 1][':root'] as Record<string, string>;

    expect(iconBox(theme)).to.equal('20px');
    expect(stepVars).to.not.have.property('--mui-spacing-iconSize');
    expect(theme.spacing('iconSize')).to.equal('iconSize');
    expect((theme as any).unstable_sx({ m: 'iconSize' })).to.deep.equal({
      margin: 'iconSize',
    });
  });

  test('applies the component emissions', () => {
    const theme = enhanceDensity(createTheme());

    // one shallow probe — applySharedDensity ran and wrote styleOverrides
    expect(theme.components.MuiButton?.styleOverrides?.root).to.not.equal(undefined);
  });

  test('a user styleOverride on the incoming theme stays the winning layer', () => {
    const theme = enhanceDensity(
      createTheme({
        components: {
          MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
        },
      }),
    );

    const layers = (theme.components as any).MuiButton.styleOverrides.root as any[];
    // density emitted at least one layer, and the user's object is last —
    // the style engine applies layers in order, so last wins
    expect(layers.length).to.be.greaterThan(1);
    expect(layers[layers.length - 1]).to.deep.equal({ textTransform: 'none' });
  });

  test('theme.mixins stays untouched — the enhancement only writes components', () => {
    const input = createTheme();
    const theme = enhanceDensity(input);

    expect((theme as any).mixins).to.deep.equal((input as any).mixins);
  });

  test('Chip icon size rides the ROOT variants — the icon slot cannot expand them', () => {
    const theme = enhanceDensity(createTheme());
    const layers = (theme.components as any).MuiChip.styleOverrides.root as any[];
    const iconVariant = layers
      .flatMap((layer) => layer?.variants ?? [])
      .find(
        (variant: any) => variant.props?.size === 'medium' && variant.style?.['& .MuiChip-icon'],
      );

    expect(iconVariant.style['& .MuiChip-icon']).to.deep.equal({ fontSize: '16px' });
    // and no dead variants remain on the icon slot itself
    const iconLayers = (theme.components as any).MuiChip.styleOverrides.icon as any[];
    iconLayers.forEach((layer) => expect(layer?.variants).to.equal(undefined));
  });

  test('the InputBase gap holds without a FormControl — medium sits on the root', () => {
    const theme = enhanceDensity(createTheme());
    const layers = (theme.components as any).MuiInputBase.styleOverrides.root as any[];
    const base = layers.find((layer) => layer?.gap !== undefined);

    // a standalone input has no `size` in its ownerState, so only a plain
    // root value reaches it
    expect(base.gap).to.equal('8px');
    expect(variantStyle(theme, 'MuiInputBase', { size: 'small' }).gap).to.equal('4px');
  });

  test('the checkbox pull-in follows the label placement', () => {
    const theme = enhanceDensity(createTheme());
    const layers = (theme.components as any).MuiCheckbox.styleOverrides.root as any[];
    const base = layers.find((layer) => layer?.height !== undefined);

    expect(base['.MuiFormControlLabel-labelPlacementEnd:has(&)']).to.deep.equal({
      marginLeft: 'calc((32px - 16px) / -2)',
    });
    expect(base['.MuiFormControlLabel-labelPlacementStart:has(&)']).to.deep.equal({
      marginRight: 'calc((32px - 16px) / -2)',
    });
    // top/bottom placements keep master margins — no unconditional pull
    expect(base['.MuiFormControlLabel-root:has(&)']).to.equal(undefined);
  });

  test('the pagination radius only asserts the circular shape', () => {
    const theme = enhanceDensity(createTheme());
    const layers = (theme.components as any).MuiPaginationItem.styleOverrides.root as any[];

    layers.forEach((layer) => expect(layer?.borderRadius).to.equal(undefined));
    expect(variantStyle(theme, 'MuiPaginationItem', { shape: 'circular' })).to.deep.equal({
      borderRadius: '50%',
    });
  });

  test('the slider mark label offset is horizontal-only', () => {
    const theme = enhanceDensity(createTheme());
    const layers = (theme.components as any).MuiSlider.styleOverrides.markLabel as any[];

    layers.forEach((layer) => expect(layer?.top).to.equal(undefined));
    expect(
      variantStyle(theme, 'MuiSlider', { orientation: 'horizontal' }, 'markLabel'),
    ).to.deep.equal({ top: '32px' });
  });

  test('list padding respects a subheader; the secondary action respects disableGutters', () => {
    const theme = enhanceDensity(createTheme());

    const listLayers = (theme.components as any).MuiList.styleOverrides.root as any[];
    const listVariants = listLayers.find((layer) => layer?.variants)?.variants as any[];
    const plain = listVariants.find((variant) =>
      variant.props({ ownerState: { disablePadding: false, subheader: null } }),
    );
    const withSubheader = listVariants.find((variant) =>
      variant.props({ ownerState: { disablePadding: false, subheader: {} } }),
    );
    expect(plain.style).to.deep.equal({ paddingBlock: '8px' });
    // only pads below — master's subheader `paddingTop: 0` stays
    expect(withSubheader.style).to.deep.equal({ paddingBottom: '8px' });

    expect(
      variantStyle(theme, 'MuiListItemSecondaryAction', { disableGutters: false } as any),
    ).to.deep.equal({ right: '12px' });
  });

  test('array spacing is refused: warns once and returns the theme unenhanced', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const base = createTheme({ spacing: [0, 4, 8, 16, 32, 64] });
    const theme = enhanceDensity(base, { small: 10 });

    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError.mock.calls[0][0]).to.include('does not support an array `theme.spacing`');

    // the very same theme comes back — not a copy of it
    expect(theme).to.equal(base);
    expect(theme.spacing).to.equal(base.spacing);
    expect(theme.spacing(1)).to.equal('4px');
    // the scale never registered, so a step name passes through as raw CSS
    expect(theme.spacing('small' as any)).to.equal('small');
    consoleError.mockRestore();
  });

  test('array spacing on a vars theme emits no step variables', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const theme = enhanceDensity(
      createTheme({ cssVariables: true, spacing: [0, 4, 8, 16, 32, 64] }),
    );
    const sheets = (theme as any).generateStyleSheets();
    const emitted: string[] = [];
    sheets.forEach((sheet: Record<string, Record<string, string>>) => {
      Object.values(sheet).forEach((decls) => emitted.push(...Object.keys(decls ?? {})));
    });

    expect(emitted.filter((name) => /^--mui-spacing-[a-zA-Z]/.test(name))).to.deep.equal([]);
    consoleError.mockRestore();
  });

  test('a user slotProps default merges with the density slot defaults', () => {
    const theme = enhanceDensity(
      createTheme({
        components: {
          MuiAlert: { defaultProps: { slotProps: { icon: { title: 'user' } } } },
        },
      }),
    );

    const slotProps = (theme.components as any).MuiAlert.defaultProps.slotProps;
    expect(slotProps.icon).to.deep.equal({ title: 'user' });
    // the density-provided slot default survives alongside it
    expect(Object.keys(slotProps).length).to.be.greaterThan(1);
  });

  test('the mounted spacing rebuild still resolves sx steps', () => {
    // CssVarsProvider swaps `theme.spacing` for `theme.generateSpacing()` on
    // mount — mimic that swap and run the sx transform against it.
    const theme = enhanceDensity(createTheme({ cssVariables: true }));
    const mounted = { ...theme, spacing: (theme as any).generateSpacing() };

    expect((mounted as any).unstable_sx({ p: 'small' })).to.deep.equal({
      padding: 'var(--mui-spacing-small, calc(1.5 * var(--mui-spacing, 8px)))',
    });
  });
});

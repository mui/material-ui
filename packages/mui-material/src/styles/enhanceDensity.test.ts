import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import enhanceDensity from './enhanceDensity';

const sx = (theme: ReturnType<typeof createTheme>, input: Record<string, unknown>) =>
  (theme as any).unstable_sx(input);

describe('enhanceDensity', () => {
  test('ships the default steps', () => {
    const theme = enhanceDensity(createTheme());

    expect(theme.spacing('small')).to.equal('12px');
    expect(theme.spacing('xxLarge')).to.equal('48px');
  });

  test('leaves the type ramp untouched', () => {
    const base = createTheme();
    const theme = enhanceDensity(createTheme());

    expect(JSON.stringify(theme.typography)).to.equal(JSON.stringify(base.typography));
  });

  test('a user styleOverride on the incoming theme renders after the density styles', () => {
    const theme = enhanceDensity(
      createTheme({
        components: { MuiButton: { styleOverrides: { root: { textTransform: 'none' } } } },
      }),
    );
    const layers = (theme.components as any).MuiButton.styleOverrides.root as any[];

    expect(layers.length).to.be.greaterThan(1);
    expect(layers[layers.length - 1]).to.deep.equal({ textTransform: 'none' });
  });

  test('a user slotProps default merges with the density slot defaults', () => {
    const theme = enhanceDensity(
      createTheme({
        components: { MuiAlert: { defaultProps: { slotProps: { icon: { title: 'user' } } } } },
      }),
    );
    const slotProps = (theme.components as any).MuiAlert.defaultProps.slotProps;

    expect(slotProps.icon).to.deep.equal({ title: 'user' });
    expect(Object.keys(slotProps).length).to.be.greaterThan(1);
  });

  test('an rtl theme flips the inline offsets the transforms read', () => {
    const style = (direction: 'ltr' | 'rtl') => {
      const components = enhanceDensity(createTheme({ direction })).components as any;
      return JSON.stringify([
        components.MuiOutlinedInput.styleOverrides.root,
        components.MuiSwitch.styleOverrides.switchBase,
      ]);
    };

    expect(style('ltr')).to.include('"--_inlinePad":"14px"');
    expect(style('rtl')).to.include('"--_inlinePad":"-14px"');
    expect(style('ltr')).to.include('translateX(calc(1 * (var(--_width)');
    expect(style('rtl')).to.include('translateX(calc(-1 * (var(--_width)');
  });

  describe('sx spacing props', () => {
    test('resolve step names on a static theme', () => {
      const theme = enhanceDensity(createTheme());

      expect(sx(theme, { p: 'small' })).to.deep.equal({ padding: '12px' });
      expect(sx(theme, { mx: '-small' })).to.deep.equal({
        marginLeft: '-12px',
        marginRight: '-12px',
      });
      expect(sx(theme, { gap: 'xLarge' })).to.deep.equal({ gap: '32px' });
    });

    test('resolve step names on a CSS variables theme, before and after CssVarsProvider mounts', () => {
      const theme = enhanceDensity(createTheme({ cssVariables: true }));
      const mounted = { ...theme, spacing: (theme as any).generateSpacing() };

      expect(sx(theme, { p: 'small' })).to.deep.equal({
        padding: 'var(--mui-spacing-small, 12px)',
      });
      expect(sx(theme, { gap: '-medium' })).to.deep.equal({
        gap: 'calc(var(--mui-spacing-medium, 16px) * -1)',
      });
      expect(sx(mounted as any, { p: 'small' })).to.deep.equal({
        padding: 'var(--mui-spacing-small, 12px)',
      });
    });

    test('resolve step names inside responsive values', () => {
      const theme = enhanceDensity(createTheme());

      expect(sx(theme, { p: { xs: 'small', md: 'large' } })).to.deep.equal({
        '@media (min-width:0px)': { padding: '12px' },
        '@media (min-width:900px)': { padding: '24px' },
      });
    });

    test('leave raw CSS, multipliers and the sizing names untouched', () => {
      const theme = enhanceDensity(createTheme({ cssVariables: true }));

      expect(sx(theme, { m: 'auto' })).to.deep.equal({ margin: 'auto' });
      expect(sx(theme, { p: '2rem' })).to.deep.equal({ padding: '2rem' });
      expect(sx(theme, { p: 2 })).to.deep.equal({ padding: 'calc(2 * var(--mui-spacing, 8px))' });
      expect(sx(theme, { p: 0 })).to.deep.equal({ padding: 0 });
      expect(sx(theme, { m: 'touchTarget' })).to.deep.equal({ margin: 'touchTarget' });
      expect(sx(theme, { m: 'iconSize' })).to.deep.equal({ margin: 'iconSize' });
    });

    test('a theme without the enhancer is unaffected', () => {
      const plain = createTheme({ cssVariables: true });

      expect(sx(plain, { p: 'small' })).to.deep.equal({ padding: 'small' });
      expect(sx(plain, { p: 2 })).to.deep.equal({ padding: 'calc(2 * var(--mui-spacing, 8px))' });
    });
  });
});

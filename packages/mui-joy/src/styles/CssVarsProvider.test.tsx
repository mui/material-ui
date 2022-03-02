import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import { CssVarsProvider, useTheme } from '@mui/joy/styles';

describe('[Joy] CssVarsProvider', () => {
  let originalMatchmedia: typeof window.matchMedia;
  const { render } = createRenderer();
  const storage: Record<string, string> = {};
  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key: string) => storage[key],
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () =>
      ({
        addListener: () => {},
        removeListener: () => {},
      } as unknown as MediaQueryList);
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describe('All CSS vars', () => {
    it('palette', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="palette-primary">{JSON.stringify(theme.vars.palette.primary)}</div>
            <div data-testid="palette-neutral">{JSON.stringify(theme.vars.palette.neutral)}</div>
            <div data-testid="palette-danger">{JSON.stringify(theme.vars.palette.danger)}</div>
            <div data-testid="palette-info">{JSON.stringify(theme.vars.palette.info)}</div>
            <div data-testid="palette-success">{JSON.stringify(theme.vars.palette.success)}</div>
            <div data-testid="palette-warning">{JSON.stringify(theme.vars.palette.warning)}</div>
            <div data-testid="palette-text">{JSON.stringify(theme.vars.palette.text)}</div>
            <div data-testid="palette-background">
              {JSON.stringify(theme.vars.palette.background)}
            </div>
            <div data-testid="palette-focusVisible">
              {JSON.stringify(theme.vars.palette.focusVisible)}
            </div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('palette-primary').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-primary-50)',
          100: 'var(--joy-palette-primary-100)',
          200: 'var(--joy-palette-primary-200)',
          300: 'var(--joy-palette-primary-300)',
          400: 'var(--joy-palette-primary-400)',
          500: 'var(--joy-palette-primary-500)',
          600: 'var(--joy-palette-primary-600)',
          700: 'var(--joy-palette-primary-700)',
          800: 'var(--joy-palette-primary-800)',
          900: 'var(--joy-palette-primary-900)',
          textColor: 'var(--joy-palette-primary-textColor)',
          textHoverBg: 'var(--joy-palette-primary-textHoverBg)',
          textActiveBg: 'var(--joy-palette-primary-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-primary-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-primary-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-primary-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-primary-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-primary-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-primary-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-primary-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-primary-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-primary-lightColor)',
          lightBg: 'var(--joy-palette-primary-lightBg)',
          lightHoverBg: 'var(--joy-palette-primary-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-primary-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-primary-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-primary-lightDisabledBg)',
          containedColor: 'var(--joy-palette-primary-containedColor)',
          containedBg: 'var(--joy-palette-primary-containedBg)',
          containedHoverBg: 'var(--joy-palette-primary-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-primary-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-primary-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-primary-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-primary-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-primary-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-primary-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-neutral').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-neutral-50)',
          100: 'var(--joy-palette-neutral-100)',
          200: 'var(--joy-palette-neutral-200)',
          300: 'var(--joy-palette-neutral-300)',
          400: 'var(--joy-palette-neutral-400)',
          500: 'var(--joy-palette-neutral-500)',
          600: 'var(--joy-palette-neutral-600)',
          700: 'var(--joy-palette-neutral-700)',
          800: 'var(--joy-palette-neutral-800)',
          900: 'var(--joy-palette-neutral-900)',
          textColor: 'var(--joy-palette-neutral-textColor)',
          textHoverBg: 'var(--joy-palette-neutral-textHoverBg)',
          textActiveBg: 'var(--joy-palette-neutral-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-neutral-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-neutral-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-neutral-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-neutral-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-neutral-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-neutral-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-neutral-lightColor)',
          lightBg: 'var(--joy-palette-neutral-lightBg)',
          lightHoverBg: 'var(--joy-palette-neutral-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-neutral-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-neutral-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-neutral-lightDisabledBg)',
          containedColor: 'var(--joy-palette-neutral-containedColor)',
          containedBg: 'var(--joy-palette-neutral-containedBg)',
          containedHoverBg: 'var(--joy-palette-neutral-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-neutral-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-neutral-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-neutral-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-neutral-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-neutral-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-neutral-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-danger').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-danger-50)',
          100: 'var(--joy-palette-danger-100)',
          200: 'var(--joy-palette-danger-200)',
          300: 'var(--joy-palette-danger-300)',
          400: 'var(--joy-palette-danger-400)',
          500: 'var(--joy-palette-danger-500)',
          600: 'var(--joy-palette-danger-600)',
          700: 'var(--joy-palette-danger-700)',
          800: 'var(--joy-palette-danger-800)',
          900: 'var(--joy-palette-danger-900)',
          textColor: 'var(--joy-palette-danger-textColor)',
          textHoverBg: 'var(--joy-palette-danger-textHoverBg)',
          textActiveBg: 'var(--joy-palette-danger-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-danger-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-danger-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-danger-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-danger-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-danger-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-danger-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-danger-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-danger-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-danger-lightColor)',
          lightBg: 'var(--joy-palette-danger-lightBg)',
          lightHoverBg: 'var(--joy-palette-danger-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-danger-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-danger-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-danger-lightDisabledBg)',
          containedColor: 'var(--joy-palette-danger-containedColor)',
          containedBg: 'var(--joy-palette-danger-containedBg)',
          containedHoverBg: 'var(--joy-palette-danger-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-danger-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-danger-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-danger-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-danger-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-danger-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-danger-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-info').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-info-50)',
          100: 'var(--joy-palette-info-100)',
          200: 'var(--joy-palette-info-200)',
          300: 'var(--joy-palette-info-300)',
          400: 'var(--joy-palette-info-400)',
          500: 'var(--joy-palette-info-500)',
          600: 'var(--joy-palette-info-600)',
          700: 'var(--joy-palette-info-700)',
          800: 'var(--joy-palette-info-800)',
          900: 'var(--joy-palette-info-900)',
          textColor: 'var(--joy-palette-info-textColor)',
          textHoverBg: 'var(--joy-palette-info-textHoverBg)',
          textActiveBg: 'var(--joy-palette-info-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-info-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-info-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-info-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-info-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-info-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-info-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-info-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-info-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-info-lightColor)',
          lightBg: 'var(--joy-palette-info-lightBg)',
          lightHoverBg: 'var(--joy-palette-info-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-info-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-info-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-info-lightDisabledBg)',
          containedColor: 'var(--joy-palette-info-containedColor)',
          containedBg: 'var(--joy-palette-info-containedBg)',
          containedHoverBg: 'var(--joy-palette-info-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-info-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-info-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-info-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-info-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-info-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-info-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-success').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-success-50)',
          100: 'var(--joy-palette-success-100)',
          200: 'var(--joy-palette-success-200)',
          300: 'var(--joy-palette-success-300)',
          400: 'var(--joy-palette-success-400)',
          500: 'var(--joy-palette-success-500)',
          600: 'var(--joy-palette-success-600)',
          700: 'var(--joy-palette-success-700)',
          800: 'var(--joy-palette-success-800)',
          900: 'var(--joy-palette-success-900)',
          textColor: 'var(--joy-palette-success-textColor)',
          textHoverBg: 'var(--joy-palette-success-textHoverBg)',
          textActiveBg: 'var(--joy-palette-success-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-success-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-success-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-success-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-success-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-success-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-success-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-success-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-success-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-success-lightColor)',
          lightBg: 'var(--joy-palette-success-lightBg)',
          lightHoverBg: 'var(--joy-palette-success-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-success-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-success-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-success-lightDisabledBg)',
          containedColor: 'var(--joy-palette-success-containedColor)',
          containedBg: 'var(--joy-palette-success-containedBg)',
          containedHoverBg: 'var(--joy-palette-success-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-success-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-success-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-success-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-success-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-success-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-success-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-warning').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-warning-50)',
          100: 'var(--joy-palette-warning-100)',
          200: 'var(--joy-palette-warning-200)',
          300: 'var(--joy-palette-warning-300)',
          400: 'var(--joy-palette-warning-400)',
          500: 'var(--joy-palette-warning-500)',
          600: 'var(--joy-palette-warning-600)',
          700: 'var(--joy-palette-warning-700)',
          800: 'var(--joy-palette-warning-800)',
          900: 'var(--joy-palette-warning-900)',
          textColor: 'var(--joy-palette-warning-textColor)',
          textHoverBg: 'var(--joy-palette-warning-textHoverBg)',
          textActiveBg: 'var(--joy-palette-warning-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-warning-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-warning-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-warning-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-warning-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-warning-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-warning-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-warning-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-warning-outlinedDisabledBorder)',
          lightColor: 'var(--joy-palette-warning-lightColor)',
          lightBg: 'var(--joy-palette-warning-lightBg)',
          lightHoverBg: 'var(--joy-palette-warning-lightHoverBg)',
          lightActiveBg: 'var(--joy-palette-warning-lightActiveBg)',
          lightDisabledColor: 'var(--joy-palette-warning-lightDisabledColor)',
          lightDisabledBg: 'var(--joy-palette-warning-lightDisabledBg)',
          containedColor: 'var(--joy-palette-warning-containedColor)',
          containedBg: 'var(--joy-palette-warning-containedBg)',
          containedHoverBg: 'var(--joy-palette-warning-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-warning-containedActiveBg)',
          containedDisabledColor: 'var(--joy-palette-warning-containedDisabledColor)',
          containedDisabledBg: 'var(--joy-palette-warning-containedDisabledBg)',
          overrideTextPrimary: 'var(--joy-palette-warning-overrideTextPrimary)',
          overrideTextSecondary: 'var(--joy-palette-warning-overrideTextSecondary)',
          overrideTextTertiary: 'var(--joy-palette-warning-overrideTextTertiary)',
        }),
      );
      expect(screen.getByTestId('palette-text').textContent).to.equal(
        JSON.stringify({
          primary: 'var(--joy-palette-text-primary)',
          secondary: 'var(--joy-palette-text-secondary)',
          tertiary: 'var(--joy-palette-text-tertiary)',
        }),
      );
      expect(screen.getByTestId('palette-background').textContent).to.equal(
        JSON.stringify({
          body: 'var(--joy-palette-background-body)',
          level1: 'var(--joy-palette-background-level1)',
          level2: 'var(--joy-palette-background-level2)',
          level3: 'var(--joy-palette-background-level3)',
        }),
      );
      expect(screen.getByTestId('palette-focusVisible').textContent).to.equal(
        '"var(--joy-palette-focusVisible)"',
      );
    });

    it('font', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="font-size">{JSON.stringify(theme.vars.fontSize)}</div>
            <div data-testid="font-family">{JSON.stringify(theme.vars.fontFamily)}</div>
            <div data-testid="font-weight">{JSON.stringify(theme.vars.fontWeight)}</div>
            <div data-testid="line-height">{JSON.stringify(theme.vars.lineHeight)}</div>
            <div data-testid="letter-spacing">{JSON.stringify(theme.vars.letterSpacing)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('font-size').textContent).to.equal(
        JSON.stringify({
          xs: 'var(--joy-fontSize-xs)',
          sm: 'var(--joy-fontSize-sm)',
          md: 'var(--joy-fontSize-md)',
          lg: 'var(--joy-fontSize-lg)',
          xl: 'var(--joy-fontSize-xl)',
          xl2: 'var(--joy-fontSize-xl2)',
          xl3: 'var(--joy-fontSize-xl3)',
          xl4: 'var(--joy-fontSize-xl4)',
          xl5: 'var(--joy-fontSize-xl5)',
          xl6: 'var(--joy-fontSize-xl6)',
        }),
      );
      expect(screen.getByTestId('font-family').textContent).to.equal(
        JSON.stringify({
          body: 'var(--joy-fontFamily-body)',
          display: 'var(--joy-fontFamily-display)',
          code: 'var(--joy-fontFamily-code)',
          fallback: 'var(--joy-fontFamily-fallback)',
        }),
      );
      expect(screen.getByTestId('font-weight').textContent).to.equal(
        JSON.stringify({
          xs: 'var(--joy-fontWeight-xs)',
          sm: 'var(--joy-fontWeight-sm)',
          md: 'var(--joy-fontWeight-md)',
          lg: 'var(--joy-fontWeight-lg)',
          xl: 'var(--joy-fontWeight-xl)',
        }),
      );
      expect(screen.getByTestId('line-height').textContent).to.equal(
        JSON.stringify({
          sm: 'var(--joy-lineHeight-sm)',
          md: 'var(--joy-lineHeight-md)',
          lg: 'var(--joy-lineHeight-lg)',
        }),
      );
      expect(screen.getByTestId('letter-spacing').textContent).to.equal(
        JSON.stringify({
          sm: 'var(--joy-letterSpacing-sm)',
          md: 'var(--joy-letterSpacing-md)',
          lg: 'var(--joy-letterSpacing-lg)',
        }),
      );
    });

    it('shape', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="radius">{JSON.stringify(theme.vars.radius)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('radius').textContent).to.equal(
        JSON.stringify({
          xs: 'var(--joy-radius-xs)',
          sm: 'var(--joy-radius-sm)',
          md: 'var(--joy-radius-md)',
          lg: 'var(--joy-radius-lg)',
          xl: 'var(--joy-radius-xl)',
        }),
      );
    });

    it('shadow ring & channel', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="shadow-ring">{theme.vars.shadowRing}</div>
            <div data-testid="shadow-channel">{theme.vars.shadowChannel}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('shadow-ring').textContent).to.equal('var(--joy-shadowRing)');
      expect(screen.getByTestId('shadow-channel').textContent).to.equal('var(--joy-shadowChannel)');
    });
  });

  describe('Focus', () => {
    it('contain expected focus', function test() {
      const Text = () => {
        const theme = useTheme();
        return <div>{Object.keys(theme.focus).join(',')}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('default');
    });
  });

  describe('Typography', () => {
    it('contain expected typography', function test() {
      const Text = () => {
        const theme = useTheme();
        return <div>{Object.keys(theme.typography).join(',')}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('h1,h2,h3,h4,h5,h6,body1,body2,body3');
    });
  });

  describe('Variant', () => {
    it('contain expected variants', function test() {
      const Text = () => {
        const theme = useTheme();
        return <div>{Object.keys(theme.variants).join(',')}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal(
        [
          'text',
          'textHover',
          'textActive',
          'textDisabled',
          'outlined',
          'outlinedHover',
          'outlinedActive',
          'outlinedDisabled',
          'light',
          'lightHover',
          'lightActive',
          'lightDisabled',
          'contained',
          'containedHover',
          'containedActive',
          'containedDisabled',
          'textOverrides',
          'outlinedOverrides',
          'lightOverrides',
          'containedOverrides',
        ].join(','),
      );
    });
  });

  describe('Spacing', () => {
    it('provides spacing utility', function test() {
      const Text = () => {
        const theme = useTheme();
        return <div>{theme.spacing(2)}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('16px');
    });
  });

  describe('Breakpoints', () => {
    it('provides breakpoint utilities', function test() {
      const Text = () => {
        const theme = useTheme();
        return <div>{theme.breakpoints.up('sm')}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('@media (min-width:600px)');
    });
  });

  describe('Skipped vars', () => {
    it('should not contain `variants` in theme.vars', () => {
      const Consumer = () => {
        const theme = useTheme();
        // @ts-expect-error
        return <div>{theme.vars.variants ? 'variants' : ''}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('variants');
    });

    it('should not contain `typography` in theme.vars', () => {
      const Consumer = () => {
        const theme = useTheme();
        // @ts-expect-error
        return <div>{theme.vars.typography ? 'typography' : ''}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('typography');
    });

    it('should not contain `focus` in theme.vars', () => {
      const Consumer = () => {
        const theme = useTheme();
        // @ts-expect-error
        return <div>{theme.vars.focus ? 'focus' : ''}</div>;
      };

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('focus');
    });
  });
});

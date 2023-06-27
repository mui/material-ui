import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import { CssVarsProvider, extendTheme, useTheme, shouldSkipGeneratingVar } from '@mui/joy/styles';

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

  describe('shouldSkipGeneratingVar', () => {
    it('skip typography', () => {
      expect(shouldSkipGeneratingVar(['typography'])).to.equal(true);
    });

    it('skip variants', () => {
      expect(shouldSkipGeneratingVar(['variants'])).to.equal(true);
    });

    it('skip breakpoints', () => {
      expect(shouldSkipGeneratingVar(['breakpoints'])).to.equal(true);
    });

    it('skip focus', () => {
      expect(shouldSkipGeneratingVar(['focus'])).to.equal(true);
      expect(shouldSkipGeneratingVar(['focus', 'selector'])).to.equal(true);
      expect(shouldSkipGeneratingVar(['focus', 'thickness'])).to.equal(false);
    });
  });

  describe('All CSS vars', () => {
    it('palette', () => {
      function Vars() {
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
      }

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
          plainColor: 'var(--joy-palette-primary-plainColor)',
          plainHoverBg: 'var(--joy-palette-primary-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-primary-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-primary-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-primary-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-primary-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-primary-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-primary-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-primary-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-primary-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-primary-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-primary-softColor)',
          softBg: 'var(--joy-palette-primary-softBg)',
          softHoverBg: 'var(--joy-palette-primary-softHoverBg)',
          softActiveBg: 'var(--joy-palette-primary-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-primary-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-primary-softDisabledBg)',
          solidColor: 'var(--joy-palette-primary-solidColor)',
          solidBg: 'var(--joy-palette-primary-solidBg)',
          solidHoverBg: 'var(--joy-palette-primary-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-primary-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-primary-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-primary-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-primary-mainChannel)',
          lightChannel: 'var(--joy-palette-primary-lightChannel)',
          darkChannel: 'var(--joy-palette-primary-darkChannel)',
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
          plainColor: 'var(--joy-palette-neutral-plainColor)',
          plainHoverColor: 'var(--joy-palette-neutral-plainHoverColor)',
          plainHoverBg: 'var(--joy-palette-neutral-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-neutral-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-neutral-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-neutral-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-neutral-outlinedBorder)',
          outlinedHoverColor: 'var(--joy-palette-neutral-outlinedHoverColor)',
          outlinedHoverBg: 'var(--joy-palette-neutral-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-neutral-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-neutral-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-neutral-softColor)',
          softBg: 'var(--joy-palette-neutral-softBg)',
          softHoverColor: 'var(--joy-palette-neutral-softHoverColor)',
          softHoverBg: 'var(--joy-palette-neutral-softHoverBg)',
          softActiveBg: 'var(--joy-palette-neutral-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-neutral-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-neutral-softDisabledBg)',
          solidColor: 'var(--joy-palette-neutral-solidColor)',
          solidBg: 'var(--joy-palette-neutral-solidBg)',
          solidHoverBg: 'var(--joy-palette-neutral-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-neutral-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-neutral-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-neutral-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-neutral-mainChannel)',
          lightChannel: 'var(--joy-palette-neutral-lightChannel)',
          darkChannel: 'var(--joy-palette-neutral-darkChannel)',
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
          plainColor: 'var(--joy-palette-danger-plainColor)',
          plainHoverBg: 'var(--joy-palette-danger-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-danger-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-danger-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-danger-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-danger-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-danger-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-danger-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-danger-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-danger-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-danger-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-danger-softColor)',
          softBg: 'var(--joy-palette-danger-softBg)',
          softHoverBg: 'var(--joy-palette-danger-softHoverBg)',
          softActiveBg: 'var(--joy-palette-danger-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-danger-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-danger-softDisabledBg)',
          solidColor: 'var(--joy-palette-danger-solidColor)',
          solidBg: 'var(--joy-palette-danger-solidBg)',
          solidHoverBg: 'var(--joy-palette-danger-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-danger-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-danger-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-danger-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-danger-mainChannel)',
          lightChannel: 'var(--joy-palette-danger-lightChannel)',
          darkChannel: 'var(--joy-palette-danger-darkChannel)',
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
          plainColor: 'var(--joy-palette-info-plainColor)',
          plainHoverBg: 'var(--joy-palette-info-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-info-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-info-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-info-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-info-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-info-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-info-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-info-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-info-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-info-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-info-softColor)',
          softBg: 'var(--joy-palette-info-softBg)',
          softHoverBg: 'var(--joy-palette-info-softHoverBg)',
          softActiveBg: 'var(--joy-palette-info-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-info-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-info-softDisabledBg)',
          solidColor: 'var(--joy-palette-info-solidColor)',
          solidBg: 'var(--joy-palette-info-solidBg)',
          solidHoverBg: 'var(--joy-palette-info-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-info-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-info-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-info-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-info-mainChannel)',
          lightChannel: 'var(--joy-palette-info-lightChannel)',
          darkChannel: 'var(--joy-palette-info-darkChannel)',
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
          plainColor: 'var(--joy-palette-success-plainColor)',
          plainHoverBg: 'var(--joy-palette-success-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-success-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-success-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-success-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-success-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-success-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-success-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-success-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-success-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-success-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-success-softColor)',
          softBg: 'var(--joy-palette-success-softBg)',
          softHoverBg: 'var(--joy-palette-success-softHoverBg)',
          softActiveBg: 'var(--joy-palette-success-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-success-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-success-softDisabledBg)',
          solidColor: 'var(--joy-palette-success-solidColor)',
          solidBg: 'var(--joy-palette-success-solidBg)',
          solidHoverBg: 'var(--joy-palette-success-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-success-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-success-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-success-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-success-mainChannel)',
          lightChannel: 'var(--joy-palette-success-lightChannel)',
          darkChannel: 'var(--joy-palette-success-darkChannel)',
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
          plainColor: 'var(--joy-palette-warning-plainColor)',
          plainHoverBg: 'var(--joy-palette-warning-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-warning-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-warning-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-warning-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-warning-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-warning-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-warning-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-warning-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-warning-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-warning-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-warning-softColor)',
          softBg: 'var(--joy-palette-warning-softBg)',
          softHoverBg: 'var(--joy-palette-warning-softHoverBg)',
          softActiveBg: 'var(--joy-palette-warning-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-warning-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-warning-softDisabledBg)',
          solidColor: 'var(--joy-palette-warning-solidColor)',
          solidBg: 'var(--joy-palette-warning-solidBg)',
          solidHoverBg: 'var(--joy-palette-warning-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-warning-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-warning-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-warning-solidDisabledBg)',
          mainChannel: 'var(--joy-palette-warning-mainChannel)',
          lightChannel: 'var(--joy-palette-warning-lightChannel)',
          darkChannel: 'var(--joy-palette-warning-darkChannel)',
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
          surface: 'var(--joy-palette-background-surface)',
          popup: 'var(--joy-palette-background-popup)',
          level1: 'var(--joy-palette-background-level1)',
          level2: 'var(--joy-palette-background-level2)',
          level3: 'var(--joy-palette-background-level3)',
          tooltip: 'var(--joy-palette-background-tooltip)',
          backdrop: 'var(--joy-palette-background-backdrop)',
        }),
      );
      expect(screen.getByTestId('palette-focusVisible').textContent).to.equal(
        '"var(--joy-palette-focusVisible)"',
      );
    });

    it('font', () => {
      function Vars() {
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
      }

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('font-size').textContent).to.equal(
        JSON.stringify({
          xs3: 'var(--joy-fontSize-xs3)',
          xs2: 'var(--joy-fontSize-xs2)',
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
          xl7: 'var(--joy-fontSize-xl7)',
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
          xl2: 'var(--joy-fontWeight-xl2)',
          xl3: 'var(--joy-fontWeight-xl3)',
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
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="radius">{JSON.stringify(theme.vars.radius)}</div>
          </div>
        );
      }

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
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="shadow-ring">{theme.vars.shadowRing}</div>
            <div data-testid="shadow-channel">{theme.vars.shadowChannel}</div>
          </div>
        );
      }

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('shadow-ring').textContent).to.equal('var(--joy-shadowRing)');
      expect(screen.getByTestId('shadow-channel').textContent).to.equal('var(--joy-shadowChannel)');
    });

    it('zIndex', () => {
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="zIndex-badge">{theme.vars.zIndex.badge}</div>
            <div data-testid="zIndex-table">{theme.vars.zIndex.table}</div>
            <div data-testid="zIndex-popup">{theme.vars.zIndex.popup}</div>
            <div data-testid="zIndex-modal">{theme.vars.zIndex.modal}</div>
            <div data-testid="zIndex-tooltip">{theme.vars.zIndex.tooltip}</div>
          </div>
        );
      }

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('zIndex-badge').textContent).to.equal('var(--joy-zIndex-badge)');
      expect(screen.getByTestId('zIndex-table').textContent).to.equal('var(--joy-zIndex-table)');
      expect(screen.getByTestId('zIndex-popup').textContent).to.equal('var(--joy-zIndex-popup)');
      expect(screen.getByTestId('zIndex-modal').textContent).to.equal('var(--joy-zIndex-modal)');
      expect(screen.getByTestId('zIndex-tooltip').textContent).to.equal(
        'var(--joy-zIndex-tooltip)',
      );
    });
  });

  describe('Color Inversion', () => {
    it('should be customizable', () => {
      function Text() {
        const theme = useTheme();
        return <div>{theme.colorInversion.solid.primary['--variant-plain'] as string}</div>;
      }

      const { container } = render(
        <CssVarsProvider
          theme={extendTheme({
            colorInversion: {
              solid: {
                primary: {
                  '--variant-plain': 'black',
                },
              },
            },
          })}
        >
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('black');
    });

    it('should be customizable with a callback', () => {
      function Text() {
        const theme = useTheme();
        return (
          <div>
            {
              (theme.colorInversion.soft.primary['[data-joy-color-scheme="dark"] &'] as any)[
                '--variant-plain'
              ]
            }
          </div>
        );
      }

      const { container } = render(
        <CssVarsProvider
          theme={extendTheme({
            colorInversion: (theme) => ({
              soft: {
                primary: {
                  [theme.getColorSchemeSelector('dark')]: {
                    '--variant-plain': 'red',
                  },
                },
              },
            }),
          })}
        >
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('red');
    });
  });

  describe('Focus', () => {
    it('contain expected focus', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{Object.keys(theme.focus).join(',')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('thickness,selector,default');
    });
  });

  describe('Typography', () => {
    it('contain expected typography', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{Object.keys(theme.typography).join(',')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal(
        'display1,display2,h1,h2,h3,h4,h5,h6,body1,body2,body3,body4,body5',
      );
    });
  });

  describe('Variant', () => {
    it('contain expected variants', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{Object.keys(theme.variants).join(',')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal(
        [
          'plain',
          'plainHover',
          'plainActive',
          'plainDisabled',
          'outlined',
          'outlinedHover',
          'outlinedActive',
          'outlinedDisabled',
          'soft',
          'softHover',
          'softActive',
          'softDisabled',
          'solid',
          'solidHover',
          'solidActive',
          'solidDisabled',
        ].join(','),
      );
    });

    it('contain expected colorInversion', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{Object.keys(theme.colorInversion).join(',')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal(['soft', 'solid'].join(','));
    });
  });

  describe('Spacing', () => {
    it('provides spacing utility', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{theme.spacing(2)}</div>;
      }

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
      function Text() {
        const theme = useTheme();
        return <div>{theme.breakpoints.up('sm')}</div>;
      }

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
      function Consumer() {
        const theme = useTheme();
        // @ts-expect-error
        return <div>{theme.vars.variants ? 'variants' : ''}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('variants');
    });

    it('should not contain `typography` in theme.vars', () => {
      function Consumer() {
        const theme = useTheme();
        // @ts-expect-error
        return <div>{theme.vars.typography ? 'typography' : ''}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('typography');
    });

    it('should contain only `focus.thickness` in theme.vars', () => {
      function Consumer() {
        const theme = useTheme();
        return <div>{JSON.stringify(theme.vars.focus)}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal(
        JSON.stringify({ focus: { thickness: '2px' } }),
      );
    });
  });
});

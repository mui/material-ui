import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { CssVarsProvider, useTheme, shouldSkipGeneratingVar } from '@mui/joy/styles';

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
        // Keep mocking legacy methods because @mui/material v5 still uses them
        addListener: () => {},
        addEventListener: () => {},
        removeListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describe('shouldSkipGeneratingVar', () => {
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
          outlinedActiveBg: 'var(--joy-palette-primary-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-primary-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-primary-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-primary-softColor)',
          softBg: 'var(--joy-palette-primary-softBg)',
          softHoverBg: 'var(--joy-palette-primary-softHoverBg)',
          softActiveColor: 'var(--joy-palette-primary-softActiveColor)',
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
          plainHoverBg: 'var(--joy-palette-neutral-plainHoverBg)',
          plainActiveBg: 'var(--joy-palette-neutral-plainActiveBg)',
          plainDisabledColor: 'var(--joy-palette-neutral-plainDisabledColor)',
          outlinedColor: 'var(--joy-palette-neutral-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-neutral-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-neutral-outlinedHoverBg)',
          outlinedActiveBg: 'var(--joy-palette-neutral-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-neutral-softColor)',
          softBg: 'var(--joy-palette-neutral-softBg)',
          softHoverBg: 'var(--joy-palette-neutral-softHoverBg)',
          softActiveColor: 'var(--joy-palette-neutral-softActiveColor)',
          softActiveBg: 'var(--joy-palette-neutral-softActiveBg)',
          softDisabledColor: 'var(--joy-palette-neutral-softDisabledColor)',
          softDisabledBg: 'var(--joy-palette-neutral-softDisabledBg)',
          solidColor: 'var(--joy-palette-neutral-solidColor)',
          solidBg: 'var(--joy-palette-neutral-solidBg)',
          solidHoverBg: 'var(--joy-palette-neutral-solidHoverBg)',
          solidActiveBg: 'var(--joy-palette-neutral-solidActiveBg)',
          solidDisabledColor: 'var(--joy-palette-neutral-solidDisabledColor)',
          solidDisabledBg: 'var(--joy-palette-neutral-solidDisabledBg)',
          plainHoverColor: 'var(--joy-palette-neutral-plainHoverColor)',
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
          outlinedActiveBg: 'var(--joy-palette-danger-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-danger-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-danger-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-danger-softColor)',
          softBg: 'var(--joy-palette-danger-softBg)',
          softHoverBg: 'var(--joy-palette-danger-softHoverBg)',
          softActiveColor: 'var(--joy-palette-danger-softActiveColor)',
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
          outlinedActiveBg: 'var(--joy-palette-success-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-success-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-success-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-success-softColor)',
          softBg: 'var(--joy-palette-success-softBg)',
          softHoverBg: 'var(--joy-palette-success-softHoverBg)',
          softActiveColor: 'var(--joy-palette-success-softActiveColor)',
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
          outlinedActiveBg: 'var(--joy-palette-warning-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-warning-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-warning-outlinedDisabledBorder)',
          softColor: 'var(--joy-palette-warning-softColor)',
          softBg: 'var(--joy-palette-warning-softBg)',
          softHoverBg: 'var(--joy-palette-warning-softHoverBg)',
          softActiveColor: 'var(--joy-palette-warning-softActiveColor)',
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
          icon: 'var(--joy-palette-text-icon)',
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
          xs: 'var(--joy-fontSize-xs)',
          sm: 'var(--joy-fontSize-sm)',
          md: 'var(--joy-fontSize-md)',
          lg: 'var(--joy-fontSize-lg)',
          xl: 'var(--joy-fontSize-xl)',
          xl2: 'var(--joy-fontSize-xl2)',
          xl3: 'var(--joy-fontSize-xl3)',
          xl4: 'var(--joy-fontSize-xl4)',
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
          sm: 'var(--joy-fontWeight-sm)',
          md: 'var(--joy-fontWeight-md)',
          lg: 'var(--joy-fontWeight-lg)',
          xl: 'var(--joy-fontWeight-xl)',
        }),
      );
      expect(screen.getByTestId('line-height').textContent).to.equal(
        JSON.stringify({
          xs: 'var(--joy-lineHeight-xs)',
          sm: 'var(--joy-lineHeight-sm)',
          md: 'var(--joy-lineHeight-md)',
          lg: 'var(--joy-lineHeight-lg)',
          xl: 'var(--joy-lineHeight-xl)',
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
        'h1,h2,h3,h4,title-lg,title-md,title-sm,body-lg,body-md,body-sm,body-xs',
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

      expect(container.firstChild?.textContent).to.equal('calc(2 * var(--joy-spacing))');
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

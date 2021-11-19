import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import { styled, CssVarsProvider, useTheme } from '@mui/joy/styles';
import defaultTheme from './defaultTheme';

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
            <div data-testid="palette-brand">{JSON.stringify(theme.vars.palette.brand)}</div>
            <div data-testid="palette-neutral">{JSON.stringify(theme.vars.palette.neutral)}</div>
            <div data-testid="palette-letter">{JSON.stringify(theme.vars.palette.letter)}</div>
            <div data-testid="palette-surface">{JSON.stringify(theme.vars.palette.surface)}</div>
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

      expect(screen.getByTestId('palette-brand').textContent).to.equal(
        JSON.stringify({
          50: 'var(--joy-palette-brand-50)',
          100: 'var(--joy-palette-brand-100)',
          200: 'var(--joy-palette-brand-200)',
          300: 'var(--joy-palette-brand-300)',
          400: 'var(--joy-palette-brand-400)',
          500: 'var(--joy-palette-brand-500)',
          600: 'var(--joy-palette-brand-600)',
          700: 'var(--joy-palette-brand-700)',
          800: 'var(--joy-palette-brand-800)',
          900: 'var(--joy-palette-brand-900)',
          textColor: 'var(--joy-palette-brand-textColor)',
          textHoverBg: 'var(--joy-palette-brand-textHoverBg)',
          textActiveBg: 'var(--joy-palette-brand-textActiveBg)',
          textDisabledColor: 'var(--joy-palette-brand-textDisabledColor)',
          outlinedColor: 'var(--joy-palette-brand-outlinedColor)',
          outlinedBorder: 'var(--joy-palette-brand-outlinedBorder)',
          outlinedHoverBg: 'var(--joy-palette-brand-outlinedHoverBg)',
          outlinedHoverBorder: 'var(--joy-palette-brand-outlinedHoverBorder)',
          outlinedActiveBg: 'var(--joy-palette-brand-outlinedActiveBg)',
          outlinedDisabledColor: 'var(--joy-palette-brand-outlinedDisabledColor)',
          outlinedDisabledBorder: 'var(--joy-palette-brand-outlinedDisabledBorder)',
          filledColor: 'var(--joy-palette-brand-filledColor)',
          filledBg: 'var(--joy-palette-brand-filledBg)',
          filledHoverBg: 'var(--joy-palette-brand-filledHoverBg)',
          filledActiveBg: 'var(--joy-palette-brand-filledActiveBg)',
          filledDisabledColor: 'var(--joy-palette-brand-filledDisabledColor)',
          filledDisabledBg: 'var(--joy-palette-brand-filledDisabledBg)',
          containedColor: 'var(--joy-palette-brand-containedColor)',
          containedBg: 'var(--joy-palette-brand-containedBg)',
          containedHoverBg: 'var(--joy-palette-brand-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-brand-containedActiveBg)',
          containedDisabledBg: 'var(--joy-palette-brand-containedDisabledBg)',
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
          filledColor: 'var(--joy-palette-neutral-filledColor)',
          filledBg: 'var(--joy-palette-neutral-filledBg)',
          filledHoverBg: 'var(--joy-palette-neutral-filledHoverBg)',
          filledActiveBg: 'var(--joy-palette-neutral-filledActiveBg)',
          filledDisabledColor: 'var(--joy-palette-neutral-filledDisabledColor)',
          filledDisabledBg: 'var(--joy-palette-neutral-filledDisabledBg)',
          containedColor: 'var(--joy-palette-neutral-containedColor)',
          containedBg: 'var(--joy-palette-neutral-containedBg)',
          containedHoverBg: 'var(--joy-palette-neutral-containedHoverBg)',
          containedActiveBg: 'var(--joy-palette-neutral-containedActiveBg)',
          containedDisabledBg: 'var(--joy-palette-neutral-containedDisabledBg)',
        }),
      );
      expect(screen.getByTestId('palette-letter').textContent).to.equal(
        JSON.stringify({
          major: 'var(--joy-palette-letter-major)',
          minor: 'var(--joy-palette-letter-minor)',
          support: 'var(--joy-palette-letter-support)',
        }),
      );
      expect(screen.getByTestId('palette-surface').textContent).to.equal(
        JSON.stringify({
          default: 'var(--joy-palette-surface-default)',
          level1: 'var(--joy-palette-surface-level1)',
          level2: 'var(--joy-palette-surface-level2)',
          level3: 'var(--joy-palette-surface-level3)',
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
          default: 'var(--joy-fontFamily-default)',
          display: 'var(--joy-fontFamily-display)',
          code: 'var(--joy-fontFamily-code)',
          fallback: 'var(--joy-fontFamily-fallback)',
        }),
      );
      expect(screen.getByTestId('font-weight').textContent).to.equal(
        JSON.stringify({
          default: 'var(--joy-fontWeight-default)',
          xs: 'var(--joy-fontWeight-xs)',
          sm: 'var(--joy-fontWeight-sm)',
          md: 'var(--joy-fontWeight-md)',
          lg: 'var(--joy-fontWeight-lg)',
        }),
      );
      expect(screen.getByTestId('line-height').textContent).to.equal(
        JSON.stringify({
          default: 'var(--joy-lineHeight-default)',
          xs: 'var(--joy-lineHeight-xs)',
          sm: 'var(--joy-lineHeight-sm)',
          md: 'var(--joy-lineHeight-md)',
          lg: 'var(--joy-lineHeight-lg)',
        }),
      );
      expect(screen.getByTestId('letter-spacing').textContent).to.equal(
        JSON.stringify({
          default: 'var(--joy-letterSpacing-default)',
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
            <div data-testid="border-radius">{JSON.stringify(theme.vars.borderRadius)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('border-radius').textContent).to.equal(
        JSON.stringify({
          default: 'var(--joy-borderRadius-default)',
          xs: 'var(--joy-borderRadius-xs)',
          sm: 'var(--joy-borderRadius-sm)',
          md: 'var(--joy-borderRadius-md)',
          lg: 'var(--joy-borderRadius-lg)',
          xl: 'var(--joy-borderRadius-xl)',
        }),
      );
    });
  });

  describe('Typography', () => {
    it('generate expected font style', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const fontFamiliesAreNotQuoted = /Firefox/.test(window.navigator.userAgent);
      const fontWeight400IsNormal = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      const Text = styled('p')(({ theme }) => ({
        ...theme.typography.body,
      }));

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontSize: '16px',
        fontFamily: fontFamiliesAreNotQuoted
          ? defaultTheme.fontFamily.default
          : `"${defaultTheme.fontFamily.default}"`,
        fontWeight: fontWeight400IsNormal ? 'normal' : '400',
        lineHeight: '24px',
      });
    });
  });
});

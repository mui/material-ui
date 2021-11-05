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
            <div data-testid="palette">{JSON.stringify(theme.vars.palette)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('palette').textContent).to.equal(
        JSON.stringify({
          brand: {
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
          },
        }),
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
          md: 'var(--joy-fontSize-md)',
        }),
      );
      expect(screen.getByTestId('font-family').textContent).to.equal(
        JSON.stringify({
          sans: 'var(--joy-fontFamily-sans)',
          mono: 'var(--joy-fontFamily-mono)',
        }),
      );
      expect(screen.getByTestId('font-weight').textContent).to.equal(
        JSON.stringify({
          regular: 'var(--joy-fontWeight-regular)',
        }),
      );
      expect(screen.getByTestId('line-height').textContent).to.equal(
        JSON.stringify({
          normal: 'var(--joy-lineHeight-normal)',
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
          md: 'var(--joy-borderRadius-md)',
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
        ...theme.typography.body(theme),
      }));

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontSize: '16px',
        fontFamily: fontFamiliesAreNotQuoted
          ? defaultTheme.fontFamily.sans
          : `"${defaultTheme.fontFamily.sans}"`,
        fontWeight: fontWeight400IsNormal ? 'normal' : '400',
        lineHeight: '24px',
      });
    });
  });
});

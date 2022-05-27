import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import Box from '@mui/material/Box';
import { Experimental_CssVarsProvider as CssVarsProvider, useTheme } from '@mui/material/styles';

describe('[Material UI] CssVarsProvider', () => {
  let originalMatchmedia;
  const { render } = createRenderer();
  const storage = {};
  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key) => storage[key],
        setItem: (key, value) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
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
            <div data-testid="palette-secondary">
              {JSON.stringify(theme.vars.palette.secondary)}
            </div>
            <div data-testid="palette-error">{JSON.stringify(theme.vars.palette.error)}</div>
            <div data-testid="palette-info">{JSON.stringify(theme.vars.palette.info)}</div>
            <div data-testid="palette-success">{JSON.stringify(theme.vars.palette.success)}</div>
            <div data-testid="palette-warning">{JSON.stringify(theme.vars.palette.warning)}</div>
            <div data-testid="palette-text">{JSON.stringify(theme.vars.palette.text)}</div>
            <div data-testid="palette-background">
              {JSON.stringify(theme.vars.palette.background)}
            </div>
            <div data-testid="palette-divider">{JSON.stringify(theme.vars.palette.divider)}</div>
            <div data-testid="palette-action">{JSON.stringify(theme.vars.palette.action)}</div>
            <div data-testid="palette-common">{JSON.stringify(theme.vars.palette.common)}</div>
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
          main: 'var(--md-palette-primary-main)',
          light: 'var(--md-palette-primary-light)',
          dark: 'var(--md-palette-primary-dark)',
          contrastText: 'var(--md-palette-primary-contrastText)',
          mainChannel: 'var(--md-palette-primary-mainChannel)',
          lightChannel: 'var(--md-palette-primary-lightChannel)',
          darkChannel: 'var(--md-palette-primary-darkChannel)',
          contrastTextChannel: 'var(--md-palette-primary-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-secondary').textContent).to.equal(
        JSON.stringify({
          main: 'var(--md-palette-secondary-main)',
          light: 'var(--md-palette-secondary-light)',
          dark: 'var(--md-palette-secondary-dark)',
          contrastText: 'var(--md-palette-secondary-contrastText)',
          mainChannel: 'var(--md-palette-secondary-mainChannel)',
          lightChannel: 'var(--md-palette-secondary-lightChannel)',
          darkChannel: 'var(--md-palette-secondary-darkChannel)',
          contrastTextChannel: 'var(--md-palette-secondary-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-error').textContent).to.equal(
        JSON.stringify({
          main: 'var(--md-palette-error-main)',
          light: 'var(--md-palette-error-light)',
          dark: 'var(--md-palette-error-dark)',
          contrastText: 'var(--md-palette-error-contrastText)',
          mainChannel: 'var(--md-palette-error-mainChannel)',
          lightChannel: 'var(--md-palette-error-lightChannel)',
          darkChannel: 'var(--md-palette-error-darkChannel)',
          contrastTextChannel: 'var(--md-palette-error-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-warning').textContent).to.equal(
        JSON.stringify({
          main: 'var(--md-palette-warning-main)',
          light: 'var(--md-palette-warning-light)',
          dark: 'var(--md-palette-warning-dark)',
          contrastText: 'var(--md-palette-warning-contrastText)',
          mainChannel: 'var(--md-palette-warning-mainChannel)',
          lightChannel: 'var(--md-palette-warning-lightChannel)',
          darkChannel: 'var(--md-palette-warning-darkChannel)',
          contrastTextChannel: 'var(--md-palette-warning-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-info').textContent).to.equal(
        JSON.stringify({
          main: 'var(--md-palette-info-main)',
          light: 'var(--md-palette-info-light)',
          dark: 'var(--md-palette-info-dark)',
          contrastText: 'var(--md-palette-info-contrastText)',
          mainChannel: 'var(--md-palette-info-mainChannel)',
          lightChannel: 'var(--md-palette-info-lightChannel)',
          darkChannel: 'var(--md-palette-info-darkChannel)',
          contrastTextChannel: 'var(--md-palette-info-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-success').textContent).to.equal(
        JSON.stringify({
          main: 'var(--md-palette-success-main)',
          light: 'var(--md-palette-success-light)',
          dark: 'var(--md-palette-success-dark)',
          contrastText: 'var(--md-palette-success-contrastText)',
          mainChannel: 'var(--md-palette-success-mainChannel)',
          lightChannel: 'var(--md-palette-success-lightChannel)',
          darkChannel: 'var(--md-palette-success-darkChannel)',
          contrastTextChannel: 'var(--md-palette-success-contrastTextChannel)',
        }),
      );

      expect(screen.getByTestId('palette-text').textContent).to.equal(
        JSON.stringify({
          primary: 'var(--md-palette-text-primary)',
          secondary: 'var(--md-palette-text-secondary)',
          disabled: 'var(--md-palette-text-disabled)',
          primaryChannel: 'var(--md-palette-text-primaryChannel)',
          secondaryChannel: 'var(--md-palette-text-secondaryChannel)',
          icon: 'var(--md-palette-text-icon)',
        }),
      );
      expect(screen.getByTestId('palette-divider').textContent).to.equal(
        '"var(--md-palette-divider)"',
      );
      expect(screen.getByTestId('palette-background').textContent).to.equal(
        JSON.stringify({
          paper: 'var(--md-palette-background-paper)',
          default: 'var(--md-palette-background-default)',
        }),
      );
      expect(screen.getByTestId('palette-action').textContent).to.equal(
        JSON.stringify({
          active: 'var(--md-palette-action-active)',
          hover: 'var(--md-palette-action-hover)',
          hoverOpacity: 'var(--md-palette-action-hoverOpacity)',
          selected: 'var(--md-palette-action-selected)',
          selectedOpacity: 'var(--md-palette-action-selectedOpacity)',
          disabled: 'var(--md-palette-action-disabled)',
          disabledBackground: 'var(--md-palette-action-disabledBackground)',
          disabledOpacity: 'var(--md-palette-action-disabledOpacity)',
          focus: 'var(--md-palette-action-focus)',
          focusOpacity: 'var(--md-palette-action-focusOpacity)',
          activatedOpacity: 'var(--md-palette-action-activatedOpacity)',
          activeChannel: 'var(--md-palette-action-activeChannel)',
        }),
      );
      expect(screen.getByTestId('palette-common').textContent).to.equal(
        JSON.stringify({
          black: 'var(--md-palette-common-black)',
          white: 'var(--md-palette-common-white)',
          background: 'var(--md-palette-common-background)',
          onBackground: 'var(--md-palette-common-onBackground)',
          backgroundChannel: 'var(--md-palette-common-backgroundChannel)',
          onBackgroundChannel: 'var(--md-palette-common-onBackgroundChannel)',
        }),
      );
    });

    it('opacity', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="opacity">{JSON.stringify(theme.vars.opacity)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('opacity').textContent).to.equal(
        JSON.stringify({
          placeholder: 'var(--md-opacity-placeholder)',
          inputTouchBottomLine: 'var(--md-opacity-inputTouchBottomLine)',
        }),
      );
    });

    it('shape', () => {
      const Vars = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="shape">{JSON.stringify(theme.vars.shape)}</div>
          </div>
        );
      };

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('shape').textContent).to.equal(
        JSON.stringify({
          borderRadius: 'var(--md-shape-borderRadius)',
        }),
      );
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

      expect(container.firstChild?.textContent).to.equal(
        'htmlFontSize,pxToRem,fontFamily,fontSize,fontWeightLight,fontWeightRegular,fontWeightMedium,fontWeightBold,h1,h2,h3,h4,h5,h6,subtitle1,subtitle2,body1,body2,button,caption,overline',
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

  it("should use numeric values in system's spacing", function test() {
    if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const { getByTestId } = render(
      <CssVarsProvider enableColorScheme enableSystem>
        <Box
          data-testid="box-1"
          sx={{
            borderRadius: '50%',
          }}
        />
        <Box
          data-testid="box-2"
          sx={{
            borderRadius: 4,
          }}
        />
      </CssVarsProvider>,
    );

    expect(getByTestId('box-1')).toHaveComputedStyle({
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
    });
    expect(getByTestId('box-2')).toHaveComputedStyle({
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
    });
  });
});

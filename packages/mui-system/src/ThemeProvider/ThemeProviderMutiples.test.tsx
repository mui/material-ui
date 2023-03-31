/* eslint-disable no-restricted-imports */
import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from 'test/utils';
import { ThemeContext } from '@mui/styled-engine';
import * as material from '@mui/material';
import * as joy from '@mui/joy';

// simulate 3rd-party library like Theme-UI, Chakra-UI, or Mantine
interface LibTheme {
  palette: { brand: string };
  vars: { palette: { brand: string } };
}
function LibThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const theme = React.useMemo<LibTheme>(
    () => ({ palette: { brand: '#ff5252' }, vars: { palette: { brand: 'var(--palette-brand)' } } }),
    [],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

function LibComponent() {
  const theme = React.useContext(ThemeContext as React.Context<LibTheme>);
  return <div style={{ color: theme.palette.brand }} />;
}

const joyTheme = joy.extendTheme();

describe('Multiple nested theme providers', () => {
  const { render } = createRenderer();
  let originalMatchmedia: any;
  let storage: Record<string, string> = {};
  const createMatchMedia = (matches: boolean) => () => ({
    matches,
    addListener: () => {},
    removeListener: () => {},
  });

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;

    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: spy((key) => storage[key]),
        setItem: spy((key, value) => {
          storage[key] = value;
        }),
      },
      configurable: true,
    });

    // clear the localstorage
    storage = {};
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia;
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('[docs] Material UI + Joy UI', () => {
    expect(() =>
      render(
        <joy.CssVarsProvider theme={{ [joy.THEME_ID]: joyTheme }}>
          <material.ThemeProvider theme={material.createTheme()}>
            <joy.Button>Joy</joy.Button>
            <material.Button>Material</material.Button>
          </material.ThemeProvider>
        </joy.CssVarsProvider>,
      ),
    ).not.to.throw();
  });

  it('Material UI works with 3rd-party lib', () => {
    expect(() =>
      render(
        <LibThemeProvider>
          <material.ThemeProvider theme={{ [material.THEME_ID]: material.createTheme() }}>
            <material.Button>Material</material.Button>
            <LibComponent />{' '}
            {/* still able to render even though it is wrapped in Material UI ThemeProvider */}
          </material.ThemeProvider>
        </LibThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('Joy UI works with 3rd-party lib', () => {
    expect(() =>
      render(
        <LibThemeProvider>
          <joy.ThemeProvider theme={{ [joy.THEME_ID]: joyTheme }}>
            <joy.Button>Material</joy.Button>
            <LibComponent />{' '}
            {/* still able to render even though it is wrapped in Material UI ThemeProvider */}
          </joy.ThemeProvider>
        </LibThemeProvider>,
      ),
    ).not.to.throw();
  });
});

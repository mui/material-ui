import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
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

const joyTheme = joy.extendTheme({
  components: {
    JoyButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.text.primary,
          mixBlendMode: 'darken',
        }),
      },
    },
  },
});
const CustomJoy = joy.styled('div')(({ theme }) => ({
  fontSize: theme.vars.fontSize.md,
}));

const materialTheme = material.createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          mixBlendMode: 'darken',
        }),
      },
    },
  },
});
const CustomMaterial = material.styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

describe('Multiple nested theme providers', () => {
  const { render } = createRenderer();
  let originalMatchmedia: any;
  let storage: Record<string, string> = {};
  const createMatchMedia = (matches: boolean) => () => ({
    matches,
    // Keep mocking legacy methods because @mui/material v5 still uses them
    addListener: () => {},
    addEventListener: () => {},
    removeListener: () => {},
    removeEventListener: () => {},
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
    const { getByText } = render(
      <joy.CssVarsProvider theme={{ [joy.THEME_ID]: joyTheme }}>
        <material.ThemeProvider theme={materialTheme}>
          <joy.Button
            sx={(theme) => ({
              // test `sx`
              bgcolor: theme.vars.palette.neutral[100],
            })}
          >
            Joy
          </joy.Button>
          <material.Button
            sx={(theme) => ({
              bgcolor: theme.palette.secondary.light,
            })}
          >
            Material
          </material.Button>
        </material.ThemeProvider>
      </joy.CssVarsProvider>,
    );
    // these test if `useThemeProps` works with theme scoping
    expect(getByText('Joy')).to.have.class(joy.buttonClasses.variantOutlined);
    expect(getByText('Joy')).toHaveComputedStyle({ mixBlendMode: 'darken' });
    expect(getByText('Material')).to.have.class(material.buttonClasses.outlinedPrimary);
    expect(getByText('Material')).toHaveComputedStyle({ mixBlendMode: 'darken' });
  });

  it('Material UI works with 3rd-party lib', () => {
    const { getByText } = render(
      <LibThemeProvider>
        <material.ThemeProvider theme={{ [material.THEME_ID]: materialTheme }}>
          <material.Button>Material</material.Button>
          <CustomMaterial /> {/* styled() should work with theme scoping */}
          <LibComponent />{' '}
          {/* still able to render even though it is wrapped in Material UI ThemeProvider */}
        </material.ThemeProvider>
      </LibThemeProvider>,
    );
    expect(getByText('Material')).to.have.class(material.buttonClasses.outlinedPrimary);
  });

  it('Joy UI works with 3rd-party lib', () => {
    const { getByText } = render(
      <LibThemeProvider>
        <joy.ThemeProvider theme={{ [joy.THEME_ID]: joyTheme }}>
          <joy.Button>Joy</joy.Button>
          <CustomJoy /> {/* styled() should work with theme scoping */}
          <LibComponent />{' '}
          {/* still able to render even though it is wrapped in Material UI ThemeProvider */}
        </joy.ThemeProvider>
      </LibThemeProvider>,
    );
    expect(getByText('Joy')).to.have.class(joy.buttonClasses.variantOutlined);
  });
});

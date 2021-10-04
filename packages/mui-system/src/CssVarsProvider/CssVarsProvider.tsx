import * as React from 'react';
import { ThemeContext as StyledEngineThemeContext, GlobalStyles } from '@mui/styled-engine';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';

export const STORAGE_KEY = 'mui-color-scheme';

export interface ColorSchemeOverrides {
  light: true;
  dark: true;
}

type ColorScheme =
  | keyof {
      [P in keyof ColorSchemeOverrides as ColorSchemeOverrides[P] extends true
        ? P
        : never]: ColorSchemeOverrides[P];
    }
  | undefined;

interface ColorSchemeContextValue {
  allColorSchemes: Array<ColorScheme>;
  colorScheme: ColorScheme;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
}

const ColorSchemeContext = React.createContext<ColorSchemeContextValue | undefined>(undefined);

const resolveColorScheme = (key: string, fallback: ColorScheme) => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return (value || fallback) as ColorSchemeContextValue['colorScheme'];
};

export const useColorScheme = () => {
  const value = React.useContext(ColorSchemeContext);
  if (!value) {
    throw new Error('`useColorScheme` must be called under <CssVarsProvider />');
  }
  return value;
};

export interface CssVarsProviderProps<BaseTheme = {}, ColorSchema = {}> {
  baseTheme: BaseTheme;
  colorSchemes: Partial<Record<Exclude<ColorScheme, undefined>, ColorSchema>>;
  defaultColorScheme?: ColorScheme;
}

export default function CssVarsProvider<BaseTheme = {}, ColorSchema = {}>({
  children,
  baseTheme,
  colorSchemes,
  defaultColorScheme = 'light',
}: React.PropsWithChildren<CssVarsProviderProps<BaseTheme, ColorSchema>>) {
  const [colorScheme, setColorScheme] = React.useState<ColorSchemeContextValue['colorScheme']>(
    resolveColorScheme(STORAGE_KEY, 'light'),
  );

  React.useEffect(() => {
    if (colorScheme) {
      document.body.dataset.colorScheme = colorScheme;
      localStorage.setItem(STORAGE_KEY, colorScheme);
    }
  }, [colorScheme]);

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const storageColorScheme = event.newValue;
        if (storageColorScheme) {
          setColorScheme(storageColorScheme as ColorScheme);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setColorScheme]);

  const { css: rootCss, vars: rootVars } = cssVarsParser(baseTheme);

  let activeTheme = {
    ...baseTheme,
    ...colorSchemes[colorScheme || defaultColorScheme],
    vars: {},
  };

  activeTheme = { ...activeTheme, vars: rootVars };

  const styleSheet: Record<string, any> = {};

  Object.entries(colorSchemes).forEach(([key, scheme]) => {
    const { css, vars } = cssVarsParser(scheme);
    if (key === defaultColorScheme) {
      styleSheet[':root'] = deepmerge(rootCss, css);
    } else {
      styleSheet[`[data-color-scheme="${key}"]`] = css;
    }
    activeTheme = { ...activeTheme, vars: deepmerge(activeTheme.vars, vars) };
  });

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        allColorSchemes: Object.keys(colorSchemes) as Array<ColorScheme>,
      }}
    >
      <GlobalStyles styles={styleSheet} />
      <MuiThemeProvider theme={activeTheme}>
        <StyledEngineThemeContext.Provider value={activeTheme}>
          {children}
        </StyledEngineThemeContext.Provider>
      </MuiThemeProvider>
    </ColorSchemeContext.Provider>
  );
}

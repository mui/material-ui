import * as React from 'react';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import camelize from './camelize';
import cssVarsParser from './cssVarsParser';
import getInitColorSchemeScript from './getInitColorSchemeScript';

export interface ColorSchemeContextValue<ColorScheme extends string> {
  allColorSchemes: Array<ColorScheme>;
  colorScheme: ColorScheme | undefined;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme | undefined>>;
}

type PartialDeep<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? PartialDeep<T[K]> : T[K];
};

const resolveColorScheme = (key: string, fallback: string) => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return value || fallback;
};

type MakeProps<
  ColorScheme extends string,
  ColorSchemeOverrides extends string,
  ColorSchemeTokens,
> = [ColorSchemeOverrides] extends [never]
  ? {
      colorSchemes?: PartialDeep<Record<ColorScheme, ColorSchemeTokens>>;
    }
  : {
      colorSchemes: PartialDeep<Record<ColorScheme, ColorSchemeTokens>> &
        Record<ColorSchemeOverrides, ColorSchemeTokens>;
    };

export default function createCssVarsProvider<
  BaseTokens extends Record<string, any>,
  ColorSchemeTokens extends Record<string, any>,
  ColorScheme extends string,
  ColorSchemeOverrides extends string = never,
  Theme extends Record<string, any> = BaseTokens & ColorSchemeTokens,
>(
  ThemeContext: React.Context<Theme | undefined>,
  options: {
    baseTheme: BaseTokens;
    colorSchemes: Record<ColorScheme, ColorSchemeTokens> &
      Partial<Record<ColorSchemeOverrides, ColorSchemeTokens>>;
    defaultColorScheme: ColorScheme;
  },
) {
  const { baseTheme, colorSchemes, defaultColorScheme: dsDefaultColorScheme } = options;
  const ColorSchemeContext = React.createContext<
    ColorSchemeContextValue<ColorScheme | ColorSchemeOverrides> | undefined
  >(undefined);

  const useColorScheme = () => {
    const value = React.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error('`useColorScheme` must be called under <CssVarsProvider />');
    }
    return value;
  };

  function CssVarsProvider({
    children,
    baseTheme: baseThemeProp,
    colorSchemes: colorSchemesProp,
    storageKey = 'mui-color-scheme',
    dataAttribute = 'color-scheme',
    defaultColorScheme = dsDefaultColorScheme,
  }: React.PropsWithChildren<
    MakeProps<ColorScheme, ColorSchemeOverrides, ColorSchemeTokens> & {
      defaultColorScheme?: ColorScheme;
      baseTheme?: PartialDeep<BaseTokens>;
      storageKey?: string;
      dataAttribute?: string;
    }
  >) {
    const dataAttributeCamel = camelize(dataAttribute);

    const [colorScheme, setColorScheme] = React.useState<
      ColorSchemeContextValue<ColorScheme | ColorSchemeOverrides>['colorScheme']
    >(resolveColorScheme(storageKey, 'light') as ColorScheme | undefined);

    React.useEffect(() => {
      if (colorScheme) {
        document.body.dataset[dataAttributeCamel] = colorScheme;
        localStorage.setItem(storageKey, colorScheme);
      }
    }, [colorScheme, dataAttributeCamel, storageKey]);

    // localStorage event handling
    React.useEffect(() => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) {
          const storageColorScheme = event.newValue;
          if (storageColorScheme) {
            setColorScheme(storageColorScheme as ColorScheme);
          }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, [setColorScheme, storageKey]);

    const mergedBaseTheme = deepmerge(baseTheme, baseThemeProp);

    const { css: rootCss, vars: rootVars } = cssVarsParser(mergedBaseTheme);

    let activeColorSchemeTokens = colorSchemes[colorScheme || defaultColorScheme];

    if (colorSchemesProp) {
      activeColorSchemeTokens = deepmerge(
        activeColorSchemeTokens,
        // @ts-ignore neglect this internal ts error, I have tried to fix this with typeguard but the code is more complex than this line below
        colorSchemesProp[colorScheme || defaultColorScheme],
      );
    }

    let activeTheme = {
      ...mergedBaseTheme,
      ...activeColorSchemeTokens,
      vars: {},
    } as Theme;

    activeTheme = { ...activeTheme, vars: rootVars };

    const styleSheet: Record<string, any> = {};

    const totalColorSchemes = { ...colorSchemes, ...colorSchemesProp };

    Object.entries(totalColorSchemes).forEach(([key, scheme]) => {
      const { css, vars } = cssVarsParser(scheme as Record<string, unknown>);
      if (key === defaultColorScheme) {
        styleSheet[':root'] = deepmerge(rootCss, css);
      } else {
        styleSheet[`[data-${dataAttribute}="${key}"]`] = css;
      }
      activeTheme = { ...activeTheme, vars: deepmerge(activeTheme.vars, vars) };
    });

    return (
      <ColorSchemeContext.Provider
        value={{
          colorScheme,
          setColorScheme,
          allColorSchemes: Object.keys(totalColorSchemes) as Array<
            ColorScheme | ColorSchemeOverrides
          >,
        }}
      >
        <GlobalStyles styles={styleSheet} />
        <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>
      </ColorSchemeContext.Provider>
    );
  }

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}

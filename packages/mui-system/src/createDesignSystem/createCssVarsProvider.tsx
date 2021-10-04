import * as React from 'react';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge, unstable_capitalize as capitalize } from '@mui/utils';
import cssVarsParser from '../CssVarsProvider/cssVarsParser';

interface ColorSchemeContextValue<ColorScheme extends string> {
  allColorSchemes: Array<ColorScheme>;
  colorScheme: ColorScheme | undefined;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme | undefined>>;
}

type NestedRecord<V = any> = {
  [k: string | number]: NestedRecord<V> | V;
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

const camelize = (str: string) =>
  str
    .split('-')
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('');

export default function createCssVarsProvider<ColorScheme extends string = 'light'>(
  ThemeProvider: React.ElementType,
) {
  const ColorSchemeContext = React.createContext<ColorSchemeContextValue<ColorScheme> | undefined>(
    undefined,
  );

  const useColorScheme = () => {
    const value = React.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error('`useColorScheme` must be called under <CssVarsProvider />');
    }
    return value;
  };

  function CssVarsProvider<BaseTokens = {}, ColorSchemeTokens = {}>({
    children,
    baseTheme,
    colorSchemes,
    storageKey = 'mui-color-scheme',
    dataAttribute = 'color-scheme',
    defaultColorScheme,
  }: React.PropsWithChildren<{
    defaultColorScheme: ColorScheme;
    baseTheme: BaseTokens;
    colorSchemes: Partial<Record<ColorScheme, ColorSchemeTokens>>;
    storageKey?: string;
    dataAttribute?: string;
  }>) {
    const dataAttributeCamel = camelize(dataAttribute);

    const [colorScheme, setColorScheme] = React.useState<
      ColorSchemeContextValue<ColorScheme>['colorScheme']
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

    const { css: rootCss, vars: rootVars } = cssVarsParser(baseTheme);

    let activeTheme: NestedRecord<string | number> = {
      ...baseTheme,
      ...colorSchemes[colorScheme || defaultColorScheme],
      vars: {},
    };

    activeTheme = { ...activeTheme, vars: rootVars };

    const styleSheet: Record<string, any> = {};

    Object.entries(colorSchemes).forEach(([key, scheme]) => {
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
          allColorSchemes: Object.keys(colorSchemes) as Array<ColorScheme>,
        }}
      >
        <GlobalStyles styles={styleSheet} />
        <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
      </ColorSchemeContext.Provider>
    );
  }

  function getInitColorSchemeScript({
    storageKey = 'mui-color-scheme',
    dataAttribute = 'color-scheme',
  }: {
    storageKey?: string;
    dataAttribute?: string;
  }) {
    return (
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function() { try {
          var colorScheme = localStorage.getItem('${storageKey}');
          if (colorScheme) {
            document.body.dataset.${camelize(dataAttribute)} = colorScheme;
          }
        } catch (e) {} })();`,
        }}
      />
    );
  }

  return { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
}

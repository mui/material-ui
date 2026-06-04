import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { ThemeProvider, createTheme, useTheme, enhanceHighContrast } from '@mui/material/styles';
import { ThemeOptionsContext, highDensity } from '../ThemeContext';
import { BrandingCssVarsProvider } from '../branding';
import { DemoIframe, IsolatedDemo } from '../DemoContent/DemoSandbox';

const defaultTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  motion: {
    reducedMotion: 'system',
  },
});

export function DemoPageThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const themeOptions = React.useContext(ThemeOptionsContext);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The ThemeProvider below generate default Material UI CSS variables and attach to html for all the demo on the page */}
      {/* This is more performant than generating variables in each demo. */}
      <ThemeProvider theme={defaultTheme} />
      {children}
    </BrandingCssVarsProvider>
  );
}

export function DemoInstanceThemeProvider({
  children,
  runtimeTheme,
}: React.PropsWithChildren<{ runtimeTheme: any }>) {
  const { dense, direction } = React.useContext(ThemeOptionsContext);
  const upperTheme = useTheme();
  const upperMode = upperTheme?.palette?.mode;

  const theme = React.useMemo(() => {
    const resultTheme = enhanceHighContrast(
      createTheme(
        {
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
          colorSchemes: {
            light: true,
            dark: true,
          },
          direction: direction as 'ltr' | 'rtl',
          motion: {
            reducedMotion: 'system',
          },
        },
        dense ? highDensity : {},
      ),
    );
    if (upperMode) {
      Object.assign(resultTheme, resultTheme.colorSchemes[upperMode]);
    }
    if (runtimeTheme && Object.prototype.toString.call(runtimeTheme) === '[object Object]') {
      try {
        return deepmerge(resultTheme, runtimeTheme);
      } catch {
        return resultTheme;
      }
    }
    return resultTheme;
  }, [runtimeTheme, dense, direction, upperMode]);

  return (
    /* - use a function to ensure that the upper theme (branding theme) is not spread to the demo theme */
    /* - a function will skip the CSS vars generation logic */
    <ThemeProvider theme={() => theme}>{children}</ThemeProvider>
  );
}

/**
 * Wraps a demo's rendered component with the appropriate theme context and,
 * when requested, an iframe sandbox.
 *
 * - When `isolated` is false (default), wraps in `DemoInstanceThemeProvider`
 *   so the demo sees a fresh Material UI theme rather than inheriting the
 *   page's branding theme.
 * - When `isolated` is true, wraps in `SystemThemeProvider` that exposes only
 *   `direction` and `vars` from the upper theme — cutting MUI / Joy UI theme
 *   inheritance so the demo can own its `ThemeProvider`. The demo element is
 *   then cloned with `cssVarPrefix` / `colorSchemeNode` / etc. for its own
 *   `CssVarsProvider`.
 * - When `iframe` is true, the demo renders inside a `DemoIframe` portal so it
 *   gets its own document, CSS cascade, viewport, and `window`. The theme React
 *   context above still reaches the portaled demo, while emotion styles and CSS
 *   variables are redirected into the iframe by `FramedDemo`.
 */
export function DemoComponentTheme({
  children,
  isolated,
  iframe,
  name,
}: {
  children: React.ReactNode;
  isolated?: boolean;
  iframe?: boolean;
  name: string;
}) {
  const [colorSchemeNode, setColorSchemeNode] = React.useState<HTMLDivElement | null>(null);

  if (isolated && React.isValidElement(children)) {
    return (
      <SystemThemeProvider
        theme={(upperTheme: { direction?: 'ltr' | 'rtl'; vars?: Record<string, unknown> }) => ({
          direction: upperTheme.direction, // required for internal ThemeProvider
          vars: upperTheme.vars, // required for styling the wrapper / iframe
        })}
      >
        {iframe ? (
          <DemoIframe name={name} isolated>
            {/* `IsolatedDemo` receives the iframe `window` via `FramedDemo`'s
                `cloneElement`, so its `CssVarsProvider` attaches to the iframe. */}
            <IsolatedDemo cssVarPrefix={name}>{children as React.ReactElement}</IsolatedDemo>
          </DemoIframe>
        ) : (
          <div ref={setColorSchemeNode}>
            <IsolatedDemo cssVarPrefix={name} colorSchemeNode={colorSchemeNode}>
              {children as React.ReactElement}
            </IsolatedDemo>
          </div>
        )}
      </SystemThemeProvider>
    );
  }

  return (
    <DemoInstanceThemeProvider runtimeTheme={undefined}>
      {iframe && React.isValidElement(children) ? (
        <DemoIframe name={name}>{children}</DemoIframe>
      ) : (
        children
      )}
    </DemoInstanceThemeProvider>
  );
}

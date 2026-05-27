import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { ThemeProvider, createTheme, useTheme, enhanceHighContrast } from '@mui/material/styles';
import { ThemeOptionsContext, highDensity } from '../ThemeContext';
import { BrandingCssVarsProvider } from '../branding';

const defaultTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
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

// Props injected via `cloneElement` into an isolated demo so its own
// `CssVarsProvider` attaches to the per-demo container instead of `<html>`.
interface IsolatedDemoProps {
  children: React.ReactElement;
  cssVarPrefix: string;
  colorSchemeNode: Element | null;
}

function IsolatedDemo({ children, cssVarPrefix, colorSchemeNode }: IsolatedDemoProps) {
  return React.cloneElement(children, {
    cssVarPrefix,
    colorSchemeNode,
    colorSchemeSelector: 'class',
    disableNestedContext: true,
    storageManager: null,
  } as Partial<unknown> & React.Attributes);
}

/**
 * Wraps a demo's rendered component with the appropriate theme context.
 *
 * - When `isolated` is false (default), wraps in `DemoInstanceThemeProvider`
 *   so the demo sees a fresh Material UI theme rather than inheriting the
 *   page's branding theme.
 * - When `isolated` is true, wraps in `SystemThemeProvider` that exposes only
 *   `direction` and `vars` from the upper theme — cutting MUI / Joy UI theme
 *   inheritance so the demo can own its `ThemeProvider`. The demo element is
 *   then cloned with `cssVarPrefix` / `colorSchemeNode` / etc. for its own
 *   `CssVarsProvider`.
 */
export function DemoComponentTheme({
  children,
  isolated,
  name,
}: {
  children: React.ReactNode;
  isolated?: boolean;
  name: string;
}) {
  const [colorSchemeNode, setColorSchemeNode] = React.useState<HTMLDivElement | null>(null);

  if (isolated && React.isValidElement(children)) {
    return (
      <SystemThemeProvider
        theme={(upperTheme: { direction?: 'ltr' | 'rtl'; vars?: Record<string, unknown> }) => ({
          direction: upperTheme.direction, // required for internal ThemeProvider
          vars: upperTheme.vars, // required for styling the wrapper
        })}
      >
        <div ref={setColorSchemeNode}>
          <IsolatedDemo cssVarPrefix={name} colorSchemeNode={colorSchemeNode}>
            {children as React.ReactElement}
          </IsolatedDemo>
        </div>
      </SystemThemeProvider>
    );
  }

  return <DemoInstanceThemeProvider runtimeTheme={undefined}>{children}</DemoInstanceThemeProvider>;
}

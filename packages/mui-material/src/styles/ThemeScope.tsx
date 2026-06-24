/**
 * @ignore - internal component.
 */
'use client';
import * as React from 'react';
import { useColorScheme } from './ThemeProviderWithVars';
import { CssColorSchemeContext } from './CssThemeProvider';

export interface ThemeScopeContextValue {
  className: string | undefined;
  colorScheme: string | undefined;
  colorSchemeAttribute: string;
}

export interface ThemeScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color-scheme attribute that matches the scoped theme's `colorSchemeSelector`.
   * @default 'data-mui-color-scheme'
   */
  colorSchemeAttribute?: string | undefined;
  /**
   * Overrides the active color scheme read from the nearest Material color-scheme provider.
   */
  colorScheme?: string | undefined;
}

export const ThemeScopeContext = React.createContext<ThemeScopeContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  ThemeScopeContext.displayName = 'ThemeScopeContext';
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ') || undefined;
}

function useActiveColorScheme(colorSchemeProp: string | undefined) {
  const cssColorScheme = React.useContext(CssColorSchemeContext);
  const varsColorScheme = useColorScheme();

  return colorSchemeProp ?? cssColorScheme?.colorScheme ?? varsColorScheme.colorScheme;
}

export function useThemeScopeProps(
  props: React.HTMLAttributes<HTMLElement> = {},
): React.HTMLAttributes<HTMLElement> {
  const scope = React.useContext(ThemeScopeContext);

  if (!scope) {
    return props;
  }

  // Apply the same scope to a portal root so CSS vars resolve there too.
  return {
    ...props,
    className: joinClassNames(scope.className, props.className),
    [scope.colorSchemeAttribute]: scope.colorScheme,
  } as React.HTMLAttributes<HTMLElement>;
}

export default function ThemeScope(props: ThemeScopeProps) {
  const {
    children,
    className,
    colorScheme: colorSchemeProp,
    colorSchemeAttribute = 'data-mui-color-scheme',
    ...other
  } = props;
  const colorScheme = useActiveColorScheme(colorSchemeProp);
  // This is the actual DOM boundary that matches the scoped theme selectors.
  const contextValue = React.useMemo(
    () => ({
      className,
      colorScheme,
      colorSchemeAttribute,
    }),
    [className, colorScheme, colorSchemeAttribute],
  );

  return (
    <ThemeScopeContext.Provider value={contextValue}>
      <div {...other} className={className} {...{ [colorSchemeAttribute]: colorScheme }}>
        {children}
      </div>
    </ThemeScopeContext.Provider>
  );
}

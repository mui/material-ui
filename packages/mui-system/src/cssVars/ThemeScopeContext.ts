'use client';
import * as React from 'react';

export interface ThemeScopeProps {
  /**
   * The class that sets the CSS theme variables of the closest scoped `ThemeProvider`,
   * followed by its color scheme class when its `colorSchemeSelector` is `'class'`.
   */
  className?: string | undefined;
  /**
   * Color scheme attributes, e.g. `data-mui-color-scheme`, when the `colorSchemeSelector` uses one.
   */
  [attribute: `data-${string}`]: string | undefined;
}

const ThemeScopeContext = React.createContext<ThemeScopeProps | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ThemeScopeContext.displayName = 'ThemeScopeContext';
}

const emptyProps: ThemeScopeProps = {};

/**
 * Returns the props that apply the closest scoped `ThemeProvider` to an element.
 * Portaled elements render outside the provider's element, so they need these props
 * to use its CSS theme variables. Returns an empty object outside scoped providers.
 */
export function useThemeScope(): ThemeScopeProps {
  return React.useContext(ThemeScopeContext) ?? emptyProps;
}

export default ThemeScopeContext;

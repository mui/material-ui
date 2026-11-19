'use client';
import * as React from 'react';

export interface ThemeScopeProps {
  /**
   * The class that sets the CSS theme variables of the closest `ThemeProvider`
   * that differ from the ones that portaled elements get from `:root`.
   */
  className?: string | undefined;
  /**
   * The attributes that mark the color scheme of the closest `isolated` `ThemeProvider`.
   */
  [attribute: `data-${string}`]: string | undefined;
}

const ThemeScopeContext = React.createContext<ThemeScopeProps | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ThemeScopeContext.displayName = 'ThemeScopeContext';
}

const emptyProps: ThemeScopeProps = {};

/**
 * Returns the props that apply the closest nested or isolated `ThemeProvider` to an element.
 * Portaled elements render outside the provider's element, so they need these props
 * to use its CSS theme variables and color scheme. Returns an empty object outside nested and isolated providers.
 */
export function useThemeScope(): ThemeScopeProps {
  return React.useContext(ThemeScopeContext) ?? emptyProps;
}

export default ThemeScopeContext;

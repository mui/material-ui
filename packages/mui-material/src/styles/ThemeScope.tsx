/**
 * @ignore - internal component.
 */
'use client';
import * as React from 'react';

// Providers render ThemeScope around nested themes. The div is the CSS-var
// boundary; the context lets portals copy that boundary onto their root.
export interface ThemeScopeContextValue {
  className: string | undefined;
  colorScheme: string | undefined;
  colorSchemeAttribute: string | null | undefined;
}

export interface ThemeScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color-scheme attribute that matches the scoped theme's `colorSchemeSelector`.
   * @default 'data-mui-color-scheme'
   */
  colorSchemeAttribute?: string | null | undefined;
  /**
   * The active color scheme stamped on the scoped root.
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

// Converts a simple scoped root selector, like `.foo`, into a className.
function getClassNameFromRootSelector(rootSelector: string | undefined) {
  const match = rootSelector?.match(/^\.([A-Za-z_-][A-Za-z0-9_-]*)$/);

  return match?.[1];
}

// Finds the data attribute used to stamp the active color scheme on the scope.
function getColorSchemeAttribute(colorSchemeSelector: string | undefined) {
  if (!colorSchemeSelector || colorSchemeSelector === 'media' || colorSchemeSelector === 'class') {
    return null;
  }

  if (colorSchemeSelector.startsWith('data-') && !colorSchemeSelector.includes('%s')) {
    return colorSchemeSelector;
  }

  const match = colorSchemeSelector.match(/\[([A-Za-z0-9_-]+)=["']?%s["']?\]/);

  return match?.[1] ?? null;
}

// Builds the props needed for the auto-rendered nested theme scope.
export function getThemeScopeProps(
  theme: { rootSelector?: string | undefined; colorSchemeSelector?: string | undefined },
  colorScheme: string | undefined,
): ThemeScopeProps | null {
  // PoC: auto-scope simple class roots that match the generated CSS selector.
  const className = getClassNameFromRootSelector(theme.rootSelector);

  if (!className) {
    return null;
  }

  return {
    className,
    colorScheme,
    colorSchemeAttribute: getColorSchemeAttribute(theme.colorSchemeSelector),
  };
}

// Reuses the current theme scope on portal roots rendered outside the scoped DOM subtree.
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
    ...(scope.colorSchemeAttribute ? { [scope.colorSchemeAttribute]: scope.colorScheme } : {}),
  } as React.HTMLAttributes<HTMLElement>;
}

export default function ThemeScope(props: ThemeScopeProps) {
  const {
    children,
    className,
    colorScheme: colorSchemeProp,
    colorSchemeAttribute: colorSchemeAttributeProp,
    ...other
  } = props;
  const colorSchemeAttribute =
    colorSchemeAttributeProp === undefined ? 'data-mui-color-scheme' : colorSchemeAttributeProp;
  // This is the actual DOM boundary that matches the scoped theme selectors.
  const contextValue = React.useMemo(
    () => ({
      className,
      colorScheme: colorSchemeProp,
      colorSchemeAttribute,
    }),
    [className, colorSchemeProp, colorSchemeAttribute],
  );

  return (
    <ThemeScopeContext.Provider value={contextValue}>
      <div
        {...other}
        className={className}
        {...(colorSchemeAttribute ? { [colorSchemeAttribute]: colorSchemeProp } : {})}
      >
        {children}
      </div>
    </ThemeScopeContext.Provider>
  );
}

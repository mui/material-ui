'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useCurrentColorScheme, { type Mode, type SystemMode } from './useCurrentColorScheme';
import type { StorageManager } from './localStorageManager';

// Inlined here so each color-scheme provider/hook gets the same string without
// duplicating it.
export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export interface UseColorSchemeSetupOptions<SupportedColorScheme extends string> {
  colorSchemes: Record<string, any>;
  colorSchemeSelector: string | undefined;
  defaultLightColorScheme: SupportedColorScheme;
  defaultDarkColorScheme: SupportedColorScheme;
  defaultMode?: Mode | undefined;
  modeStorageKey?: string | undefined;
  colorSchemeStorageKey?: string | undefined;
  /**
   * The DOM node that receives the color-scheme attribute (e.g. `<html>`).
   * Pass `null` to skip the DOM-attribute sync effect (e.g. for nested providers
   * that share the root provider's attribute).
   */
  colorSchemeNode?: HTMLElement | null | undefined;
  storageWindow?: Window | null | undefined;
  storageManager?: StorageManager | null | undefined;
  documentNode?: Document | null | undefined;
  disableTransitionOnChange?: boolean | undefined;
  noSsr?: boolean | undefined;
}

export interface UseColorSchemeSetupResult<SupportedColorScheme extends string> {
  allColorSchemes: SupportedColorScheme[];
  colorScheme: SupportedColorScheme | undefined;
  mode: Mode | undefined;
  systemMode: SystemMode | undefined;
  lightColorScheme: SupportedColorScheme;
  darkColorScheme: SupportedColorScheme;
  setMode: (mode: Mode | null) => void;
  setColorScheme: (
    colorScheme:
      | SupportedColorScheme
      | Partial<{ light: SupportedColorScheme | null; dark: SupportedColorScheme | null }>
      | null,
  ) => void;
}

/**
 * Encapsulates the color-scheme management logic shared between
 * `CssVarsProvider` (from `createCssVarsProvider`) and standalone
 * color-scheme hooks:
 *
 * 1. Reads/writes mode + colorScheme from `localStorage` via
 *    `useCurrentColorScheme`, including `'system'` (OS) preference handling.
 * 2. Syncs the active color scheme to a DOM attribute
 *    (e.g. `data-mui-color-scheme="dark"` on `<html>`) via `useEnhancedEffect`.
 * 3. Suppresses CSS transitions during color-scheme changes when
 *    `disableTransitionOnChange` is `true`.
 *
 * Each caller provides its own `Context` instance and puts the returned value
 * on it — this way Joy and Material (and any other design system) can have
 * independent contexts while sharing the same setup logic.
 *
 * Pass `colorSchemeNode: null` to suppress the DOM-attribute sync effect
 * (used by nested `CssVarsProvider`s that piggy-back on the root provider's
 * attribute).
 */
export default function useColorSchemeSetup<SupportedColorScheme extends string>(
  options: UseColorSchemeSetupOptions<SupportedColorScheme>,
): UseColorSchemeSetupResult<SupportedColorScheme> {
  const {
    colorSchemes,
    colorSchemeSelector,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    defaultMode = 'system',
    modeStorageKey,
    colorSchemeStorageKey,
    colorSchemeNode,
    storageWindow,
    storageManager,
    documentNode,
    disableTransitionOnChange = false,
    noSsr,
  } = options;

  const joinedColorSchemes = Object.keys(colorSchemes)
    .filter((k) => !!colorSchemes[k])
    .join(',');

  const allColorSchemes = React.useMemo(
    () => joinedColorSchemes.split(',').filter(Boolean) as SupportedColorScheme[],
    [joinedColorSchemes],
  );

  // 1. Persistent state: mode, colorScheme, and their setters.
  //    Handles localStorage, cross-tab sync, and SSR hydration.
  const {
    mode,
    setMode,
    systemMode,
    lightColorScheme,
    darkColorScheme,
    colorScheme,
    setColorScheme,
  } = useCurrentColorScheme({
    supportedColorSchemes: allColorSchemes,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey,
    colorSchemeStorageKey,
    defaultMode,
    storageManager,
    storageWindow,
    noSsr,
  });

  // 2. DOM attribute sync – apply e.g. `data-mui-color-scheme="dark"` to the
  //    colorSchemeNode. Skipped when `colorSchemeNode` is null (nested providers).
  useEnhancedEffect(() => {
    if (
      !colorScheme ||
      !colorSchemeNode ||
      !colorSchemeSelector ||
      colorSchemeSelector === 'media'
    ) {
      return;
    }

    let rule = colorSchemeSelector;
    if (colorSchemeSelector === 'class') {
      rule = '.%s';
    } else if (colorSchemeSelector === 'data') {
      rule = '[data-%s]';
    } else if (colorSchemeSelector.startsWith('data-') && !colorSchemeSelector.includes('%s')) {
      // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
      rule = `[${colorSchemeSelector}="%s"]`;
    }

    if (rule.startsWith('.')) {
      colorSchemeNode.classList.remove(
        ...allColorSchemes.map((scheme) => rule.substring(1).replace('%s', scheme)),
      );
      colorSchemeNode.classList.add(rule.substring(1).replace('%s', colorScheme));
    } else {
      const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/);
      if (matches) {
        const [attr, value] = matches[1].split('=');
        if (!value) {
          // For bare attributes like `data-theme-dark`, `data-theme-light`:
          // remove all scheme variants before adding the active one.
          allColorSchemes.forEach((scheme) => {
            colorSchemeNode!.removeAttribute(attr.replace(colorScheme, scheme));
          });
        }
        colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, '') : '');
      } else {
        colorSchemeNode.setAttribute(rule, colorScheme);
      }
    }
  }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);

  // 3. Transition suppression – inject `* { transition: none }` for 1 ms so
  //    the color-scheme switch is visually instant.
  //    credit: https://github.com/pacocoursey/next-themes
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (disableTransitionOnChange && hasMounted.current && documentNode) {
      const css = documentNode.createElement('style');
      css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
      documentNode.head.appendChild(css);
      // Force browser repaint so the no-transition style takes effect.
      window.getComputedStyle(documentNode.body);
      timer = setTimeout(() => {
        documentNode.head.removeChild(css);
      }, 1);
    }
    return () => clearTimeout(timer);
  }, [colorScheme, disableTransitionOnChange, documentNode]);

  React.useEffect(() => {
    hasMounted.current = true;
    return () => {
      hasMounted.current = false;
    };
  }, []);

  return {
    allColorSchemes,
    colorScheme,
    mode,
    systemMode,
    lightColorScheme,
    darkColorScheme,
    setMode,
    setColorScheme,
  };
}

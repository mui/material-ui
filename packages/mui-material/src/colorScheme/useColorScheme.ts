'use client';
import * as React from 'react';
import useColorSchemeSetup from '@mui/system/cssVars/useColorSchemeSetup';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface UseColorSchemeOptions {
  defaultMode?: Mode | undefined;
  defaultLightColorScheme?: string | undefined;
  defaultDarkColorScheme?: string | undefined;
  colorSchemeNode?: HTMLElement | null | undefined;
  storageWindow?: Window | null | undefined;
  modeStorageKey?: string | undefined;
  colorSchemeStorageKey?: string | undefined;
  disableTransitionOnChange?: boolean | undefined;
  noSsr?: boolean | undefined;
  documentNode?: Document | null | undefined;
}

export interface UseColorSchemeResult {
  allColorSchemes: string[];
  colorScheme: string | undefined;
  mode: Mode | undefined;
  systemMode: SystemMode | undefined;
  lightColorScheme: string;
  darkColorScheme: string;
  setMode: (mode: Mode | null) => void;
  setColorScheme: (
    colorScheme: string | null | Partial<{ light: string | null; dark: string | null }>,
  ) => void;
}

/**
 * Standalone color-scheme hook for static CSS themes.
 * It manages the same storage keys and DOM attribute as InitColorSchemeScript.
 */
export default function useColorScheme(options: UseColorSchemeOptions = {}): UseColorSchemeResult {
  const {
    defaultMode = 'system',
    defaultLightColorScheme = defaultConfig.defaultLightColorScheme,
    defaultDarkColorScheme = defaultConfig.defaultDarkColorScheme,
    colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
    documentNode = typeof document === 'undefined' ? undefined : document,
    storageWindow = typeof window === 'undefined' ? undefined : window,
    modeStorageKey = defaultConfig.modeStorageKey,
    colorSchemeStorageKey = defaultConfig.colorSchemeStorageKey,
    disableTransitionOnChange = false,
    noSsr = false,
  } = options;

  const colorSchemes = React.useMemo(
    () => ({
      [defaultLightColorScheme]: true,
      [defaultDarkColorScheme]: true,
    }),
    [defaultLightColorScheme, defaultDarkColorScheme],
  );

  return useColorSchemeSetup({
    colorSchemes,
    colorSchemeSelector: defaultConfig.attribute,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey,
    colorSchemeStorageKey,
    defaultMode,
    storageWindow,
    colorSchemeNode,
    documentNode,
    disableTransitionOnChange,
    noSsr,
  });
}

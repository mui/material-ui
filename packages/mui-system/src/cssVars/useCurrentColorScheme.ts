'use client';
import * as React from 'react';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';

export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface State<SupportedColorScheme extends string> {
  /**
   * User selected mode.
   * Note: on the server, mode is always undefined
   */
  mode: 'light' | 'dark' | 'system' | undefined;
  /**
   * Only valid if `mode: 'system'`, either 'light' | 'dark'.
   */
  systemMode: 'light' | 'dark' | undefined;
  /**
   * The color scheme for the light mode.
   */
  lightColorScheme: SupportedColorScheme;
  /**
   * The color scheme for the dark mode.
   */
  darkColorScheme: SupportedColorScheme;
}

export type Result<SupportedColorScheme extends string> = State<SupportedColorScheme> & {
  /**
   * The current application color scheme. It is always `undefined` on the server.
   */
  colorScheme: SupportedColorScheme | undefined;
  /**
   * `mode` is saved to internal state and localStorage
   * If `mode` is null, it will be reset to the defaultMode
   */
  setMode: (mode: Mode | null) => void;
  /**
   * `colorScheme` is saved to internal state and localStorage
   * If `colorScheme` is null, it will be reset to the defaultColorScheme (light | dark)
   */
  setColorScheme: (
    colorScheme:
      | SupportedColorScheme
      | Partial<{
          light: SupportedColorScheme | null;
          dark: SupportedColorScheme | null;
        }>
      | null,
  ) => void;
};

export function getSystemMode(mode: undefined | string): SystemMode | undefined {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    mode === 'system'
  ) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'dark';
    }
    return 'light';
  }
  return undefined;
}

function processState<T>(
  state: { mode: Mode | undefined; systemMode: SystemMode | undefined },
  callback: (mode: SystemMode) => T,
) {
  if (state.mode === 'light' || (state.mode === 'system' && state.systemMode === 'light')) {
    return callback('light');
  }
  if (state.mode === 'dark' || (state.mode === 'system' && state.systemMode === 'dark')) {
    return callback('dark');
  }
  return undefined;
}

export function getColorScheme<SupportedColorScheme extends string>(
  state: State<SupportedColorScheme>,
) {
  return processState(state, (mode) => {
    if (mode === 'light') {
      return state.lightColorScheme;
    }
    if (mode === 'dark') {
      return state.darkColorScheme;
    }
    return undefined;
  });
}

function initializeValue(key: string, defaultValue: string) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
    if (!value) {
      // the first time that user enters the site.
      localStorage.setItem(key, defaultValue);
    }
  } catch (e) {
    // Unsupported
  }
  return value || defaultValue;
}

interface UseCurrentColoSchemeOptions<SupportedColorScheme extends string> {
  defaultLightColorScheme: SupportedColorScheme;
  defaultDarkColorScheme: SupportedColorScheme;
  supportedColorSchemes: Array<SupportedColorScheme>;
  defaultMode?: Mode;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
  storageWindow?: Window | null;
}

export default function useCurrentColorScheme<SupportedColorScheme extends string>(
  options: UseCurrentColoSchemeOptions<SupportedColorScheme>,
): Result<SupportedColorScheme> {
  const {
    defaultMode = 'light',
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === 'undefined' ? undefined : window,
  } = options;

  const joinedColorSchemes = supportedColorSchemes.join(',');
  const isMultiSchemes = supportedColorSchemes.length > 1;

  const [state, setState] = React.useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(
      `${colorSchemeStorageKey}-light`,
      defaultLightColorScheme,
    );
    const darkColorScheme = initializeValue(
      `${colorSchemeStorageKey}-dark`,
      defaultDarkColorScheme,
    );
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme,
    } as State<SupportedColorScheme>;
  });
  // This could be improved with `React.useSyncExternalStore` in the future.
  const [, setHasMounted] = React.useState(false);
  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMultiSchemes) {
      setHasMounted(true); // to rerender the component after hydration
    }
    hasMounted.current = true;
  }, [isMultiSchemes]);

  const colorScheme = getColorScheme(state);

  const setMode: Result<SupportedColorScheme>['setMode'] = React.useCallback(
    (mode) => {
      setState((currentState) => {
        if (mode === currentState.mode) {
          // do nothing if mode does not change
          return currentState;
        }
        const newMode = mode ?? defaultMode;
        try {
          localStorage.setItem(modeStorageKey, newMode);
        } catch (e) {
          // Unsupported
        }
        return {
          ...currentState,
          mode: newMode,
          systemMode: getSystemMode(newMode),
        };
      });
    },
    [modeStorageKey, defaultMode],
  );

  const setColorScheme: Result<SupportedColorScheme>['setColorScheme'] = React.useCallback(
    (value) => {
      if (!value) {
        setState((currentState) => {
          try {
            localStorage.setItem(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
            localStorage.setItem(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
          } catch (e) {
            // Unsupported
          }
          return {
            ...currentState,
            lightColorScheme: defaultLightColorScheme,
            darkColorScheme: defaultDarkColorScheme,
          };
        });
      } else if (typeof value === 'string') {
        if (value && !joinedColorSchemes.includes(value)) {
          console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
        } else {
          setState((currentState) => {
            const newState = { ...currentState };
            processState(currentState, (mode) => {
              try {
                localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
              } catch (e) {
                // Unsupported
              }
              if (mode === 'light') {
                newState.lightColorScheme = value;
              }
              if (mode === 'dark') {
                newState.darkColorScheme = value;
              }
            });
            return newState;
          });
        }
      } else {
        setState((currentState) => {
          const newState = { ...currentState };
          const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
          const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;

          if (newLightColorScheme) {
            if (!joinedColorSchemes.includes(newLightColorScheme)) {
              console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
            } else {
              newState.lightColorScheme = newLightColorScheme;
              try {
                localStorage.setItem(`${colorSchemeStorageKey}-light`, newLightColorScheme);
              } catch (error) {
                // Unsupported
              }
            }
          }

          if (newDarkColorScheme) {
            if (!joinedColorSchemes.includes(newDarkColorScheme)) {
              console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
            } else {
              newState.darkColorScheme = newDarkColorScheme;
              try {
                localStorage.setItem(`${colorSchemeStorageKey}-dark`, newDarkColorScheme);
              } catch (error) {
                // Unsupported
              }
            }
          }

          return newState;
        });
      }
    },
    [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme],
  );

  const handleMediaQuery = React.useCallback(
    (event?: MediaQueryListEvent) => {
      if (state.mode === 'system') {
        setState((currentState) => {
          const systemMode = event?.matches ? 'dark' : 'light';

          // Early exit, nothing changed.
          if (currentState.systemMode === systemMode) {
            return currentState;
          }
          return { ...currentState, systemMode };
        });
      }
    },
    [state.mode],
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = React.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !isMultiSchemes) {
      return undefined;
    }
    const handler = (...args: any) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);

  // Handle when localStorage has changed
  React.useEffect(() => {
    if (storageWindow && isMultiSchemes) {
      const handleStorage = (event: StorageEvent) => {
        const value = event.newValue;
        if (
          typeof event.key === 'string' &&
          event.key.startsWith(colorSchemeStorageKey) &&
          (!value || joinedColorSchemes.match(value))
        ) {
          // If the key is deleted, value will be null then reset color scheme to the default one.
          if (event.key.endsWith('light')) {
            setColorScheme({ light: value as SupportedColorScheme | null });
          }
          if (event.key.endsWith('dark')) {
            setColorScheme({ dark: value as SupportedColorScheme | null });
          }
        }
        if (
          event.key === modeStorageKey &&
          (!value || ['light', 'dark', 'system'].includes(value))
        ) {
          setMode((value as Mode) || defaultMode);
        }
      };
      // For syncing color-scheme changes between iframes
      storageWindow.addEventListener('storage', handleStorage);
      return () => {
        storageWindow.removeEventListener('storage', handleStorage);
      };
    }
    return undefined;
  }, [
    setColorScheme,
    setMode,
    modeStorageKey,
    colorSchemeStorageKey,
    joinedColorSchemes,
    defaultMode,
    storageWindow,
    isMultiSchemes,
  ]);

  return {
    ...state,
    mode: hasMounted.current || !isMultiSchemes ? state.mode : undefined,
    systemMode: hasMounted.current || !isMultiSchemes ? state.systemMode : undefined,
    colorScheme: hasMounted.current || !isMultiSchemes ? colorScheme : undefined,
    setMode,
    setColorScheme,
  };
}

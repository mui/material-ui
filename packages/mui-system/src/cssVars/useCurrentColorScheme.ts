import * as React from 'react';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';

export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface State<SupportedColorScheme extends string> {
  /**
   * User selected mode.
   * Note: on the server, mode is always undefined
   */
  mode: Mode | undefined;
  /**
   * Only valid if `mode: 'system'`, either 'light' | 'dark'.
   */
  systemMode: SystemMode | undefined;
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
  if (typeof window !== 'undefined' && mode === 'system') {
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

  const colorScheme = getColorScheme(state);

  const setMode: Result<SupportedColorScheme>['setMode'] = React.useCallback(
    (mode) => {
      setState((currentState) => {
        const newMode = !mode ? defaultMode : mode;
        if (mode === currentState.mode) {
          return currentState;
        }
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
      if (!value || typeof value === 'string') {
        if (value && !joinedColorSchemes.includes(value)) {
          console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
        } else {
          setState((currentState) => {
            const newState = { ...currentState };
            if (!value) {
              // reset to default color scheme
              newState.lightColorScheme = defaultLightColorScheme;
              newState.darkColorScheme = defaultDarkColorScheme;
              return newState;
            }
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
      } else if (
        (value.light && !joinedColorSchemes.includes(value.light)) ||
        (value.dark && !joinedColorSchemes.includes(value.dark))
      ) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = { ...currentState };
          if (value.light || value.light === null) {
            newState.lightColorScheme =
              value.light === null ? defaultLightColorScheme : value.light;
          }
          if (value.dark || value.dark === null) {
            newState.darkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
          }
          return newState;
        });
        try {
          if (value.light) {
            localStorage.setItem(`${colorSchemeStorageKey}-light`, value.light);
          }
          if (value.dark) {
            localStorage.setItem(`${colorSchemeStorageKey}-dark`, value.dark);
          }
        } catch (e) {
          // Unsupported
        }
      }
    },
    [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme],
  );

  const handleMediaQuery = React.useCallback(
    (e?: MediaQueryListEvent) => {
      if (state.mode === 'system') {
        setState((currentState) => ({
          ...currentState,
          systemMode: e?.matches ? 'dark' : 'light',
        }));
      }
    },
    [state.mode],
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = React.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  React.useEffect(() => {
    const handler = (...args: any) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);

    return () => media.removeListener(handler);
  }, []);

  // Handle when localStorage has changed
  React.useEffect(() => {
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
      if (event.key === modeStorageKey && (!value || ['light', 'dark', 'system'].includes(value))) {
        setMode((value as Mode) || defaultMode);
      }
    };
    if (storageWindow) {
      // For syncing color-scheme changes between iframes
      storageWindow.addEventListener('storage', handleStorage);
      return () => storageWindow.removeEventListener('storage', handleStorage);
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
  ]);

  return {
    ...state,
    colorScheme,
    setMode,
    setColorScheme,
  };
}

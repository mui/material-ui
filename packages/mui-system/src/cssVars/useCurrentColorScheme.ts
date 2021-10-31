import * as React from 'react';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';

export type Mode = 'day' | 'night' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface State<SupportedColorScheme extends string> {
  /**
   * User selected mode.
   * Note: on the server, mode is always undefined
   */
  mode: Mode | undefined;
  /**
   * Only valid if `mode: 'system'`, either 'day' | 'night'.
   */
  systemMode: SystemMode | undefined;
  /**
   * The color scheme for the day mode.
   */
  dayColorScheme: SupportedColorScheme;
  /**
   * The color scheme for the night mode.
   */
  nightColorScheme: SupportedColorScheme;
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
   * If `colorScheme` is null, it will be reset to the defaultColorScheme (day | night)
   */
  setColorScheme: (
    colorScheme:
      | SupportedColorScheme
      | Partial<{
          dayColorScheme: SupportedColorScheme | null;
          nightColorScheme: SupportedColorScheme | null;
        }>
      | null,
  ) => void;
};

export function getSystemMode(mode: undefined | string): SystemMode | undefined {
  if (typeof window !== 'undefined' && mode === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'night';
    }
    return 'day';
  }
  return undefined;
}

function processState<T>(
  state: { mode: Mode | undefined; systemMode: SystemMode | undefined },
  callback: (mode: SystemMode) => T,
) {
  if (state.mode === 'day' || (state.mode === 'system' && state.systemMode === 'day')) {
    return callback('day');
  }
  if (state.mode === 'night' || (state.mode === 'system' && state.systemMode === 'night')) {
    return callback('night');
  }
  return undefined;
}

export function getColorScheme<SupportedColorScheme extends string>(
  state: State<SupportedColorScheme>,
) {
  return processState(state, (mode) => {
    if (mode === 'day') {
      return state.dayColorScheme;
    }
    if (mode === 'night') {
      return state.nightColorScheme;
    }
    return undefined;
  });
}

function resolveValue(key: string, defaultValue?: string) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return value || defaultValue;
}

export default function useCurrentColorScheme<SupportedColorScheme extends string>(options: {
  defaultDayColorScheme: SupportedColorScheme;
  defaultNightColorScheme: SupportedColorScheme;
  supportedColorSchemes: Array<SupportedColorScheme>;
  defaultMode?: Mode;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
}): Result<SupportedColorScheme> {
  const {
    defaultMode = 'day',
    defaultDayColorScheme,
    defaultNightColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  } = options;

  const joinedColorSchemes = supportedColorSchemes.join(',');

  const [state, setState] = React.useState(() => {
    const initialMode = resolveValue(modeStorageKey, defaultMode);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      dayColorScheme: resolveValue(`${colorSchemeStorageKey}-day`) || defaultDayColorScheme,
      nightColorScheme: resolveValue(`${colorSchemeStorageKey}-night`) || defaultNightColorScheme,
    } as State<SupportedColorScheme>;
  });

  const colorScheme = getColorScheme(state);

  const setMode = React.useCallback(
    (mode: Mode) => {
      setState((currentState) => {
        const newMode = !mode ? defaultMode : mode;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(modeStorageKey, newMode);
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
        if (value && !supportedColorSchemes.includes(value)) {
          console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
        } else {
          setState((currentState) => {
            const newState = { ...currentState };
            if (!value) {
              // reset to default color scheme
              newState.dayColorScheme = defaultDayColorScheme;
              newState.nightColorScheme = defaultNightColorScheme;
              return newState;
            }
            processState(currentState, (mode) => {
              localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
              if (mode === 'day') {
                newState.dayColorScheme = value;
              }
              if (mode === 'night') {
                newState.nightColorScheme = value;
              }
            });
            return newState;
          });
        }
      } else if (
        (value.dayColorScheme && !supportedColorSchemes.includes(value.dayColorScheme)) ||
        (value.nightColorScheme && !supportedColorSchemes.includes(value.nightColorScheme))
      ) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = { ...currentState };
          if (value.dayColorScheme || value.dayColorScheme === null) {
            newState.dayColorScheme =
              value.dayColorScheme === null ? defaultDayColorScheme : value.dayColorScheme;
          }
          if (value.nightColorScheme || value.nightColorScheme === null) {
            newState.nightColorScheme =
              value.nightColorScheme === null ? defaultNightColorScheme : value.nightColorScheme;
          }
          return newState;
        });
        if (value.dayColorScheme) {
          localStorage.setItem(`${colorSchemeStorageKey}-day`, value.dayColorScheme);
        }
        if (value.nightColorScheme) {
          localStorage.setItem(`${colorSchemeStorageKey}-night`, value.nightColorScheme);
        }
      }
    },
    [colorSchemeStorageKey, supportedColorSchemes, defaultDayColorScheme, defaultNightColorScheme],
  );

  const handleMediaQuery = React.useCallback(
    (e?) => {
      if (state.mode === 'system') {
        setState((currentState) => ({
          ...currentState,
          systemMode: e.matches ? 'night' : 'day',
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

  // Save mode, dayColorScheme & nightColorScheme to localStorage
  React.useEffect(() => {
    if (state.mode) {
      localStorage.setItem(modeStorageKey, state.mode);
    }
    processState(state, (mode) => {
      localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, state.dayColorScheme);
    });
  }, [state, colorSchemeStorageKey, modeStorageKey]);

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
        if (event.key.endsWith('day')) {
          setColorScheme({ dayColorScheme: value as SupportedColorScheme | null });
        }
        if (event.key.endsWith('night')) {
          setColorScheme({ nightColorScheme: value as SupportedColorScheme | null });
        }
      }
      if (event.key === modeStorageKey && (!value || ['day', 'night', 'system'].includes(value))) {
        setMode((value as Mode) || defaultMode);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [
    setColorScheme,
    setMode,
    modeStorageKey,
    colorSchemeStorageKey,
    joinedColorSchemes,
    defaultMode,
  ]);

  return {
    ...state,
    colorScheme,
    setMode,
    setColorScheme,
  };
}

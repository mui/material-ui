import * as React from 'react';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';

function getSystemMode(mode: undefined | string) {
  if (typeof window === 'undefined' || !mode) {
    return undefined;
  }
  if (mode === 'auto') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'night';
    }
    return 'day';
  }
  return mode;
}

type Mode = 'day' | 'night' | 'auto';

export default function useCurrentColorScheme<SupportedColorScheme extends string>(options: {
  defaultDayColorScheme: SupportedColorScheme;
  defaultNightColorScheme: SupportedColorScheme;
  supportedColorSchemes: Array<SupportedColorScheme>;
  defaultMode?: Mode;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
}) {
  const {
    defaultMode = 'day',
    defaultDayColorScheme,
    defaultNightColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  } = options;

  const resolveValue = (key: string, defaultValue: string) => {
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
  };

  const [state, setState] = React.useState(() => {
    const initialMode = resolveValue(modeStorageKey, defaultMode);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      dayColorScheme: resolveValue(`${colorSchemeStorageKey}-day`, defaultDayColorScheme),
      nightColorScheme: resolveValue(`${colorSchemeStorageKey}-night`, defaultNightColorScheme),
    };
  });

  const getColorScheme = () => {
    if (typeof window !== 'undefined') {
      // this scope runs on the client
      let value;
      try {
        value = localStorage.getItem(`${colorSchemeStorageKey}-${state.systemMode}`) || undefined;
        if (value && !supportedColorSchemes.includes(value as unknown as SupportedColorScheme)) {
          value = undefined;
        }
      } catch (e) {
        // Unsupported
      }
      if (state.systemMode === 'day') {
        return value || state.dayColorScheme;
      }
      if (state.systemMode === 'night') {
        return value || state.nightColorScheme;
      }
    }
    return undefined;
  };

  const colorScheme = getColorScheme();

  const setMode = React.useCallback(
    (mode: Mode) => {
      setState((currentState) => ({
        ...currentState,
        mode,
        systemMode: getSystemMode(mode),
      }));
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(modeStorageKey, mode);
      }
    },
    [modeStorageKey],
  );

  const setColorScheme = React.useCallback(
    (
      value:
        | SupportedColorScheme
        | { dayColorScheme: SupportedColorScheme; nightColorScheme: SupportedColorScheme },
    ) => {
      setState((currentState) =>
        typeof value === 'string'
          ? {
              ...currentState,
              ...(currentState.systemMode === 'day' && {
                dayColorScheme: value,
              }),
              ...(currentState.systemMode === 'night' && {
                nightColorScheme: value,
              }),
            }
          : {
              ...currentState,
              ...value,
            },
      );
      if (typeof value === 'string') {
        if (state.systemMode) {
          localStorage.setItem(`${colorSchemeStorageKey}-${state.systemMode}`, value);
        }
      } else {
        localStorage.setItem(`${colorSchemeStorageKey}-day`, value.dayColorScheme);
        localStorage.setItem(`${colorSchemeStorageKey}-night`, value.nightColorScheme);
      }
    },
    [colorSchemeStorageKey, state.systemMode],
  );

  const handleMediaQuery = React.useCallback(
    (e?) => {
      if (state.mode === 'auto') {
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

  return {
    ...state,
    colorScheme,
    setMode,
    setColorScheme,
  };
}

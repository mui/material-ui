import * as React from 'react';
import { getThemeProps, useThemeWithoutDefault as useTheme } from '@mui/system';
import useEnhancedEffect from '../utils/useEnhancedEffect';

/**
 * @deprecated Not used internally. Use `MediaQueryListEvent` from lib.dom.d.ts instead.
 */
export interface MuiMediaQueryListEvent {
  matches: boolean;
}

/**
 * @deprecated Not used internally. Use `MediaQueryList` from lib.dom.d.ts instead.
 */
export interface MuiMediaQueryList {
  matches: boolean;
  addListener: (listener: MuiMediaQueryListListener) => void;
  removeListener: (listener: MuiMediaQueryListListener) => void;
}

/**
 * @deprecated Not used internally. Use `(event: MediaQueryListEvent) => void` instead.
 */
export type MuiMediaQueryListListener = (event: MuiMediaQueryListEvent) => void;

export interface Options {
  defaultMatches?: boolean;
  matchMedia?: typeof window.matchMedia;
  /**
   * This option is kept for backwards compatibility and has no longer any effect.
   * It's previous behavior is now handled automatically.
   */
  // TODO: Deprecate for v6
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

function useMediaQueryOld(
  query: string,
  defaultMatches: boolean,
  matchMedia: typeof window.matchMedia | null,
  ssrMatchMedia: ((query: string) => { matches: boolean }) | null,
  noSsr: boolean | undefined,
): boolean {
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const [match, setMatch] = React.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia!(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  useEnhancedEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia!(query);
    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    // TODO: Use `addEventListener` once support for Safari < 14 is dropped
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  return match;
}

// eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814
const maybeReactUseSyncExternalStore: undefined | any = (React as any)['useSyncExternalStore' + ''];

function useMediaQueryNew(
  query: string,
  defaultMatches: boolean,
  matchMedia: typeof window.matchMedia | null,
  ssrMatchMedia: ((query: string) => { matches: boolean }) | null,
): boolean {
  const getDefaultSnapshot = React.useCallback(() => defaultMatches, [defaultMatches]);
  const getServerSnapshot = React.useMemo(() => {
    if (ssrMatchMedia !== null) {
      const { matches } = ssrMatchMedia(query);
      return () => matches;
    }
    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia]);
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (matchMedia === null) {
      return [getDefaultSnapshot, () => () => {}];
    }

    const mediaQueryList = matchMedia(query);

    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        // TODO: Use `addEventListener` once support for Safari < 14 is dropped
        mediaQueryList.addListener(notify);
        return () => {
          mediaQueryList.removeListener(notify);
        };
      },
    ];
  }, [getDefaultSnapshot, matchMedia, query]);
  const match = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return match;
}

export default function useMediaQuery<Theme = unknown>(
  queryInput: string | ((theme: Theme) => string),
  options: Options = {},
): boolean {
  const theme = useTheme<Theme>();
  // Wait for jsdom to support the match media feature.
  // All the browsers MUI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    ssrMatchMedia = null,
    noSsr,
  } = getThemeProps({ name: 'MuiUseMediaQuery', props: options, theme });

  if (process.env.NODE_ENV !== 'production') {
    if (typeof queryInput === 'function' && theme === null) {
      console.error(
        [
          'MUI: The `query` argument provided is invalid.',
          'You are providing a function without a theme in the context.',
          'One of the parent elements needs to use a ThemeProvider.',
        ].join('\n'),
      );
    }
  }

  let query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, '');

  // TODO: Drop `useMediaQueryOld` and use  `use-sync-external-store` shim in `useMediaQueryNew` once the package is stable
  const useMediaQueryImplementation =
    maybeReactUseSyncExternalStore !== undefined ? useMediaQueryNew : useMediaQueryOld;
  const match = useMediaQueryImplementation(
    query,
    defaultMatches,
    matchMedia,
    ssrMatchMedia,
    noSsr,
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({ query, match });
  }

  return match;
}

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
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
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
    noSsr = false,
    ssrMatchMedia = null,
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
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({ query, match });
  }

  return match;
}

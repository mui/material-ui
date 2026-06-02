'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import type { ReducedMotionMode } from '../styles/createMotion';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const REDUCED_MOTION_DURATION = 0;
const REDUCED_MOTION_DELAY = '0ms';

interface TransitionTiming {
  duration: string | number;
  delay: string | undefined;
}

interface MediaQueryState {
  enabled: boolean;
  matches: boolean | null;
}

/**
 * Subscribes to the OS reduced-motion media query only when the theme mode needs it.
 */
function useReducedMotionMediaQuery(enabled: boolean): boolean | null {
  const [queryState, setQueryState] = React.useState<MediaQueryState>(() => ({
    enabled,
    matches: enabled ? null : false,
  }));

  let matches = queryState.matches;
  if (queryState.enabled !== enabled) {
    matches = null;
    if (!enabled) {
      matches = false;
    }
  }

  useEnhancedEffect(() => {
    const setResolvedMatches = (nextMatches: boolean | null) => {
      setQueryState((previousState) => {
        if (previousState.enabled === enabled && previousState.matches === nextMatches) {
          return previousState;
        }

        return {
          enabled,
          matches: nextMatches,
        };
      });
    };

    if (!enabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setResolvedMatches(false);
      return undefined;
    }

    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    const update = () => {
      setResolvedMatches(mediaQueryList.matches);
    };

    update();
    mediaQueryList.addEventListener('change', update);

    return () => {
      mediaQueryList.removeEventListener('change', update);
    };
  }, [enabled]);

  return matches;
}

/**
 * Resolves whether a Material UI transition should reduce motion and provides
 * adjusted CSS transition timing for MUI-owned duration/delay values.
 */
export default function useReducedMotion(
  mode: ReducedMotionMode,
  disablePrefersReducedMotion: boolean | undefined,
) {
  const prefersReducedMotion = useReducedMotionMediaQuery(
    !disablePrefersReducedMotion && mode === 'system',
  );
  const shouldReduceMotion =
    !disablePrefersReducedMotion &&
    (mode === 'always' || (mode === 'system' && prefersReducedMotion !== false));

  return React.useMemo(
    () => ({
      shouldReduceMotion,
      getTransitionTiming(timing: TransitionTiming): TransitionTiming {
        if (!shouldReduceMotion) {
          return timing;
        }

        return {
          duration: REDUCED_MOTION_DURATION,
          delay: REDUCED_MOTION_DELAY,
        };
      },
    }),
    [shouldReduceMotion],
  );
}

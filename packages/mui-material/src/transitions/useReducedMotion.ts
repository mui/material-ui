'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import type { ReducedMotionMode } from '../styles/createTransitions';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const REDUCED_MOTION_DURATION = 0;
const REDUCED_MOTION_DELAY = '0ms';

interface TransitionTiming {
  duration: string | number;
  delay: string | undefined;
}

/**
 * Subscribes to the OS reduced-motion media query only when the theme mode needs it.
 */
function useReducedMotionMediaQuery(enabled: boolean): boolean {
  const getMatches = React.useCallback(
    () =>
      enabled &&
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia(MEDIA_QUERY).matches,
    [enabled],
  );

  const [matches, setMatches] = React.useState(getMatches);

  useEnhancedEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    const update = () => {
      setMatches(mediaQueryList.matches);
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
  const prefersReducedMotion = useReducedMotionMediaQuery(mode === 'system');
  const shouldReduceMotion =
    !disablePrefersReducedMotion &&
    (mode === 'always' || (mode === 'system' && prefersReducedMotion));

  return {
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
  };
}

'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { shouldReduceMotion } from '../transitions/transitionUtils';

export interface UseAutoPlayParams {
  /** Whether auto-play is enabled */
  enabled: boolean;
  /** Interval between advances in ms */
  interval: number;
  /** Callback when timer fires */
  onTick: () => void;
  /** Pause on mouse hover (default: true) */
  pauseOnHover?: boolean;
  /** Pause on focus within (default: true) */
  pauseOnFocus?: boolean;
}

export interface UseAutoPlayReturn {
  /** Whether currently playing (not paused) */
  isPlaying: boolean;
  /** Pause auto-play */
  pause: () => void;
  /** Resume auto-play */
  resume: () => void;
  /** Event handlers to attach to carousel root */
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

export function useAutoPlay(params: UseAutoPlayParams): UseAutoPlayReturn {
  const {
    enabled,
    interval,
    onTick,
    pauseOnHover = true,
    pauseOnFocus = true,
  } = params;

  // Don't auto-play if user prefers reduced motion
  const reducedMotion = typeof window !== 'undefined' && shouldReduceMotion();
  const effectiveEnabled = enabled && !reducedMotion;

  const [isPaused, setIsPaused] = React.useState(false);

  const pause = useEventCallback(() => setIsPaused(true));
  const resume = useEventCallback(() => setIsPaused(false));

  // Timer effect
  React.useEffect(() => {
    if (!effectiveEnabled || isPaused) return;

    const id = setInterval(onTick, interval);
    return () => clearInterval(id);
  }, [effectiveEnabled, isPaused, interval, onTick]);

  // Pause when tab is hidden
  React.useEffect(() => {
    if (!effectiveEnabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [effectiveEnabled]);

  const handlers = {
    onMouseEnter: pauseOnHover ? pause : () => {},
    onMouseLeave: pauseOnHover ? resume : () => {},
    onFocus: pauseOnFocus ? pause : () => {},
    onBlur: pauseOnFocus ? resume : () => {},
  };

  return {
    isPlaying: effectiveEnabled && !isPaused,
    pause,
    resume,
    handlers,
  };
}

export default useAutoPlay;

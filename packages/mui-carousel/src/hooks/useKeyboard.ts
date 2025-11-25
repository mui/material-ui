'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import {
  getActionForKey,
  isNavigationKey,
  hasModifierKey,
} from '../utils/keyboardHelpers';

export interface UseKeyboardParameters {
  /** Callback to navigate to the next slide */
  onNext: () => void;
  /** Callback to navigate to the previous slide */
  onPrevious: () => void;
  /** Callback to navigate to the first slide */
  onFirst: () => void;
  /** Callback to navigate to the last slide */
  onLast: () => void;
  /** Callback to pause auto-play */
  onPause: () => void;
  /** Callback to navigate to a specific slide by index */
  onGoToSlide: (index: number) => void;
  /** Whether keyboard navigation is disabled */
  disabled?: boolean;
  /** Total number of slides */
  slideCount: number;
  /** Whether the layout is right-to-left */
  rtl?: boolean;
}

export interface UseKeyboardReturn {
  /** Event handlers to attach to the carousel root */
  handlers: {
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
}

/**
 * Hook for keyboard navigation in the carousel.
 *
 * Handles:
 * - Arrow keys for next/previous (RTL-aware)
 * - Home/End for first/last slide
 * - Escape to pause auto-play
 * - Number keys 1-9 for direct slide access
 *
 * Events bubble from child elements, so keyboard navigation works
 * when any element within the carousel has focus.
 */
export function useKeyboard(parameters: UseKeyboardParameters): UseKeyboardReturn {
  const {
    onNext,
    onPrevious,
    onFirst,
    onLast,
    onPause,
    onGoToSlide,
    disabled = false,
    slideCount,
    rtl = false,
  } = parameters;

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    // Skip if disabled
    if (disabled) {
      return;
    }

    // Skip if not a navigation key
    if (!isNavigationKey(event.key)) {
      return;
    }

    // Skip if modifier keys are pressed (Ctrl+Arrow, etc.)
    if (hasModifierKey(event)) {
      return;
    }

    // Get the action for this key
    const action = getActionForKey(event.key, rtl, slideCount);
    if (action === null) {
      return;
    }

    // Prevent default to avoid page scrolling
    event.preventDefault();

    // Execute the action
    if (action === 'next') {
      onNext();
    } else if (action === 'previous') {
      onPrevious();
    } else if (action === 'first') {
      onFirst();
    } else if (action === 'last') {
      onLast();
    } else if (action === 'pause') {
      onPause();
    } else if (typeof action === 'object' && action.type === 'goToSlide') {
      onGoToSlide(action.index);
    }
  });

  return {
    handlers: {
      onKeyDown: handleKeyDown,
    },
  };
}

export default useKeyboard;

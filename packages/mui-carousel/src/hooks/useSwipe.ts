'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { isInteractiveElement } from '../utils/carouselHelpers';
import {
  calculateDistance,
  calculateVelocity,
  getSwipeDirection,
  isValidSwipe,
  MIN_SWIPE_DISTANCE,
  SWIPE_VELOCITY_THRESHOLD,
} from '../utils/gestureHelpers';

export interface UseSwipeParams {
  /** Callback fired when a valid left swipe is detected */
  onSwipeLeft?: () => void;
  /** Callback fired when a valid right swipe is detected */
  onSwipeRight?: () => void;
  /** If true, swipe detection is disabled */
  disabled?: boolean;
  /** Minimum distance (in pixels) required for a swipe (default: 50) */
  threshold?: number;
  /** Minimum velocity (px/ms) for a fast flick (default: 0.3) */
  velocityThreshold?: number;
}

export interface UseSwipeReturn {
  /** Event handlers to spread onto the target element */
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
  /** Whether a swipe gesture is currently in progress */
  swiping: boolean;
  /** Current horizontal offset during drag (for visual feedback) */
  swipeOffset: number;
}

interface PointerState {
  pointerId: number | null;
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  direction: 'horizontal' | 'vertical' | 'none' | null;
}

/**
 * Hook for detecting swipe/drag gestures using Pointer Events API.
 * Supports both touch and mouse interactions with unified handling.
 *
 * @param params - Configuration for swipe detection
 * @returns Event handlers and current swipe state
 */
export function useSwipe(params: UseSwipeParams): UseSwipeReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    disabled = false,
    threshold = MIN_SWIPE_DISTANCE,
    velocityThreshold = SWIPE_VELOCITY_THRESHOLD,
  } = params;

  const [swiping, setSwiping] = React.useState(false);
  const [swipeOffset, setSwipeOffset] = React.useState(0);

  // Use ref to track pointer state without causing re-renders
  const pointerStateRef = React.useRef<PointerState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    direction: null,
  });

  // Reset state to initial values
  const resetState = useEventCallback(() => {
    pointerStateRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      startTime: 0,
      currentX: 0,
      currentY: 0,
      direction: null,
    };
    setSwiping(false);
    setSwipeOffset(0);
  });

  // Handle pointer down - start tracking
  const handlePointerDown = useEventCallback((event: React.PointerEvent) => {
    if (disabled) {
      return;
    }

    // Check for defaultMuiPrevented pattern
    if ((event as any).defaultMuiPrevented) {
      return;
    }

    // Don't capture if clicking on interactive elements
    if (isInteractiveElement(event.target as Element)) {
      return;
    }

    // Only handle primary pointer (left mouse button, first touch)
    if (event.button !== 0 && event.pointerType === 'mouse') {
      return;
    }

    const target = event.currentTarget as HTMLElement;

    // Capture pointer events to this element
    target.setPointerCapture(event.pointerId);

    // Initialize pointer state
    pointerStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: Date.now(),
      currentX: event.clientX,
      currentY: event.clientY,
      direction: null,
    };

    setSwiping(true);
  });

  // Handle pointer move - track movement
  const handlePointerMove = useEventCallback((event: React.PointerEvent) => {
    const state = pointerStateRef.current;

    // Only track if we have an active pointer
    if (state.pointerId !== event.pointerId) {
      return;
    }

    if (disabled) {
      return;
    }

    // Update current position
    state.currentX = event.clientX;
    state.currentY = event.clientY;

    const deltaX = state.currentX - state.startX;
    const deltaY = state.currentY - state.startY;

    // Determine direction on first significant movement
    if (state.direction === null) {
      const direction = getSwipeDirection(deltaX, deltaY);
      if (direction !== 'none') {
        state.direction = direction;
      }
    }

    // If horizontal swipe, prevent default to stop scrolling
    if (state.direction === 'horizontal') {
      event.preventDefault();
      // Update offset for visual feedback
      setSwipeOffset(deltaX);
    } else if (state.direction === 'vertical') {
      // Allow vertical scrolling by not preventing default
      resetState();
    }
  });

  // Handle pointer up - evaluate swipe
  const handlePointerUp = useEventCallback((event: React.PointerEvent) => {
    const state = pointerStateRef.current;

    // Only process if this is our tracked pointer
    if (state.pointerId !== event.pointerId) {
      return;
    }

    if (disabled) {
      resetState();
      return;
    }

    const target = event.currentTarget as HTMLElement;
    target.releasePointerCapture(event.pointerId);

    // Calculate final gesture metrics
    const distance = calculateDistance(state.startX, state.currentX);
    const duration = Date.now() - state.startTime;
    const velocity = calculateVelocity(distance, duration);

    // Check if this is a valid swipe
    if (
      state.direction === 'horizontal' &&
      isValidSwipe(distance, velocity, threshold, velocityThreshold)
    ) {
      // Determine swipe direction and call appropriate callback
      if (distance < 0) {
        // Swiped left (moved finger/mouse to the left)
        onSwipeLeft?.();
      } else {
        // Swiped right (moved finger/mouse to the right)
        onSwipeRight?.();
      }
    }

    resetState();
  });

  // Handle pointer cancel - reset state
  const handlePointerCancel = useEventCallback((event: React.PointerEvent) => {
    const state = pointerStateRef.current;

    // Only process if this is our tracked pointer
    if (state.pointerId !== event.pointerId) {
      return;
    }

    const target = event.currentTarget as HTMLElement;
    target.releasePointerCapture(event.pointerId);

    resetState();
  });

  return {
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
    swiping,
    swipeOffset,
  };
}

export default useSwipe;

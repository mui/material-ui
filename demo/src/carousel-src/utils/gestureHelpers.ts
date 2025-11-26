/**
 * Gesture-related helper functions for swipe and drag detection.
 * Pure functions that handle gesture calculations and validation.
 */

import { MIN_SWIPE_DISTANCE, SWIPE_VELOCITY_THRESHOLD } from './constants';

// Re-export constants for convenience
export { MIN_SWIPE_DISTANCE, SWIPE_VELOCITY_THRESHOLD };

/**
 * Calculates the distance traveled during a gesture.
 * @param startX - Starting X coordinate
 * @param endX - Ending X coordinate
 * @returns The distance traveled (can be negative)
 */
export function calculateDistance(startX: number, endX: number): number {
  return endX - startX;
}

/**
 * Calculates the velocity of a gesture.
 * @param distance - Distance traveled in pixels
 * @param duration - Duration of gesture in milliseconds
 * @returns Velocity in pixels per millisecond
 */
export function calculateVelocity(distance: number, duration: number): number {
  if (duration <= 0) {
    return 0;
  }
  return Math.abs(distance) / duration;
}

/**
 * Determines the primary direction of a gesture based on delta values.
 * @param deltaX - Change in X coordinate
 * @param deltaY - Change in Y coordinate
 * @returns The detected gesture direction
 */
export function getSwipeDirection(
  deltaX: number,
  deltaY: number,
): 'horizontal' | 'vertical' | 'none' {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  // Require minimum movement to determine direction
  const minMovement = 10;
  if (absDeltaX < minMovement && absDeltaY < minMovement) {
    return 'none';
  }

  // Compare horizontal vs vertical movement
  if (absDeltaX > absDeltaY) {
    return 'horizontal';
  }

  if (absDeltaY > absDeltaX) {
    return 'vertical';
  }

  return 'none';
}

/**
 * Determines if default scroll behavior should be prevented based on gesture direction.
 * Prevents scroll for horizontal swipes but allows vertical scrolling.
 * @param deltaX - Change in X coordinate
 * @param deltaY - Change in Y coordinate
 * @returns True if scroll should be prevented (horizontal gesture)
 */
export function shouldPreventScroll(deltaX: number, deltaY: number): boolean {
  const direction = getSwipeDirection(deltaX, deltaY);
  return direction === 'horizontal';
}

/**
 * Validates if a gesture should be considered a valid swipe for navigation.
 * A swipe is valid if:
 * - It travels at least the minimum distance, OR
 * - It exceeds the velocity threshold (fast flick)
 * @param distance - Distance traveled in pixels
 * @param velocity - Velocity in pixels per millisecond
 * @param threshold - Minimum distance threshold (default: MIN_SWIPE_DISTANCE)
 * @param velocityThreshold - Minimum velocity threshold (default: SWIPE_VELOCITY_THRESHOLD)
 * @returns True if the gesture is a valid swipe
 */
export function isValidSwipe(
  distance: number,
  velocity: number,
  threshold: number = MIN_SWIPE_DISTANCE,
  velocityThreshold: number = SWIPE_VELOCITY_THRESHOLD,
): boolean {
  const absDistance = Math.abs(distance);

  // Valid if distance threshold is met
  if (absDistance >= threshold) {
    return true;
  }

  // Valid if velocity threshold is met (fast flick)
  if (velocity >= velocityThreshold) {
    return true;
  }

  return false;
}

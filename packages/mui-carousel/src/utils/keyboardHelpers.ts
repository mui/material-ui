'use client';
import { KEYBOARD_KEYS } from './constants';

/**
 * Navigation action types returned by keyboard helper functions.
 */
export type KeyboardAction =
  | 'next'
  | 'previous'
  | 'first'
  | 'last'
  | 'pause'
  | { type: 'goToSlide'; index: number }
  | null;

/**
 * Check if a key is a navigation key that the carousel should handle.
 */
export function isNavigationKey(key: string): boolean {
  const navigationKeys = new Set([
    KEYBOARD_KEYS.ARROW_LEFT,
    KEYBOARD_KEYS.ARROW_RIGHT,
    KEYBOARD_KEYS.HOME,
    KEYBOARD_KEYS.END,
    KEYBOARD_KEYS.ESCAPE,
    '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ]);
  return navigationKeys.has(key);
}

/**
 * Get the slide index from a number key (1-9).
 * Returns null if the key is not a number or the index is out of bounds.
 */
export function getSlideIndexFromKey(key: string, slideCount: number): number | null {
  const num = parseInt(key, 10);
  if (Number.isNaN(num) || num < 1 || num > 9) {
    return null;
  }
  const index = num - 1; // Convert 1-based to 0-based
  if (index >= slideCount) {
    return null;
  }
  return index;
}

/**
 * Determine the navigation action for a given key.
 * Takes RTL direction into account for arrow keys.
 *
 * @param key - The pressed key
 * @param rtl - Whether the layout is right-to-left
 * @param slideCount - Total number of slides (for number key validation)
 * @returns The action to perform, or null if the key should not be handled
 */
export function getActionForKey(
  key: string,
  rtl: boolean,
  slideCount: number,
): KeyboardAction {
  // Arrow keys - swap direction in RTL
  if (key === KEYBOARD_KEYS.ARROW_LEFT) {
    return rtl ? 'next' : 'previous';
  }
  if (key === KEYBOARD_KEYS.ARROW_RIGHT) {
    return rtl ? 'previous' : 'next';
  }

  // Home/End keys
  if (key === KEYBOARD_KEYS.HOME) {
    return 'first';
  }
  if (key === KEYBOARD_KEYS.END) {
    return 'last';
  }

  // Escape key
  if (key === KEYBOARD_KEYS.ESCAPE) {
    return 'pause';
  }

  // Number keys 1-9
  const slideIndex = getSlideIndexFromKey(key, slideCount);
  if (slideIndex !== null) {
    return { type: 'goToSlide', index: slideIndex };
  }

  return null;
}

/**
 * Check if a keyboard event has modifier keys pressed.
 * Navigation should be skipped when modifiers are held.
 */
export function hasModifierKey(event: React.KeyboardEvent): boolean {
  return event.ctrlKey || event.altKey || event.metaKey || event.shiftKey;
}

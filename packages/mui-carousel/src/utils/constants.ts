/**
 * Carousel constants and configuration values.
 * These provide sensible defaults following Material UI patterns.
 */

/**
 * CSS class name prefix for the Carousel component.
 * Used by generateUtilityClasses to create BEM-style class names.
 */
export const CAROUSEL_PREFIX = 'MuiCarousel';

/**
 * Default interval (in milliseconds) between auto-play slide transitions.
 * @default 5000
 */
export const DEFAULT_AUTO_PLAY_INTERVAL = 5000;

/**
 * Default transition duration (in milliseconds) for slide animations.
 * Aligns with theme.transitions.duration.complex (450ms).
 * @default 450
 */
export const DEFAULT_TRANSITION_DURATION = 450;

/**
 * Default number of slides visible at once.
 * @default 1
 */
export const DEFAULT_SLIDES_PER_VIEW = 1;

/**
 * Minimum distance (in pixels) a swipe must travel to trigger navigation.
 * Prevents accidental swipes from triggering slide changes.
 * @default 50
 */
export const MIN_SWIPE_DISTANCE = 50;

/**
 * Velocity threshold (in pixels per millisecond) for fling detection.
 * Swipes faster than this will navigate even if distance threshold isn't met.
 * @default 0.3
 */
export const SWIPE_VELOCITY_THRESHOLD = 0.3;

/**
 * Keyboard key mappings for carousel navigation.
 * Maps key codes to navigation actions.
 */
export const KEYBOARD_KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  ESCAPE: 'Escape',
} as const;

/**
 * Type for keyboard key values.
 */
export type KeyboardKey = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS];

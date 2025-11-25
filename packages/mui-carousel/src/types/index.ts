/**
 * Shared types used across carousel package components.
 */

import { Breakpoint } from '@mui/material/styles';

/**
 * Responsive value type for breakpoint-based configuration.
 * Allows specifying different values for each MUI breakpoint.
 *
 * @example
 * // Show 1 slide on mobile, 2 on tablet, 3 on desktop
 * slidesPerView={{ xs: 1, sm: 2, md: 3 }}
 */
export type ResponsiveValue<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

/**
 * MUI Breakpoint keys in order from smallest to largest.
 */
export const BREAKPOINT_ORDER: readonly Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * Available transition effects for slide changes.
 * - 'slide': Slides move horizontally (default)
 * - 'fade': Slides crossfade
 */
export type CarouselTransition = 'slide' | 'fade';

/**
 * Carousel orientation.
 * v1 supports horizontal only.
 */
export type CarouselOrientation = 'horizontal';

/**
 * Reason for a slide change event.
 * Useful for analytics and conditional behavior.
 */
export type SlideChangeReason =
  | 'auto' // Auto-play timer
  | 'navigation' // Arrow button click
  | 'swipe' // Touch/mouse swipe gesture
  | 'keyboard' // Keyboard navigation
  | 'indicator'; // Indicator dot click

/**
 * Direction of slide movement.
 */
export type CarouselDirection = 'forward' | 'backward';

/**
 * Context value provided by CarouselProvider.
 * Used internally for component communication.
 */
export interface CarouselContextValue {
  /** Current active slide index (0-based) */
  activeIndex: number;
  /** Total number of slides */
  slideCount: number;
  /** Navigate to a specific slide */
  goToSlide: (index: number, reason?: SlideChangeReason) => void;
  /** Navigate to the next slide */
  goToNext: (reason?: SlideChangeReason) => void;
  /** Navigate to the previous slide */
  goToPrevious: (reason?: SlideChangeReason) => void;
  /** Whether loop mode is enabled */
  enableLoop: boolean;
  /** Current transition direction */
  direction: CarouselDirection;
  /** Whether auto-play is currently active */
  isAutoPlaying: boolean;
  /** Pause auto-play (e.g., on hover) */
  pauseAutoPlay: () => void;
  /** Resume auto-play */
  resumeAutoPlay: () => void;
  /** Transition type */
  transition: CarouselTransition;
  /** Transition duration in ms */
  transitionDuration: number;
}

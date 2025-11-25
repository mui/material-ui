/**
 * Accessibility utility functions for the Carousel component.
 * Provides ID generation helpers and screen reader support utilities.
 */

import { styled } from '@mui/system';

/**
 * Generate the slides container ID from the carousel ID.
 */
export function getSlidesContainerId(carouselId: string): string {
  return `${carouselId}-slides`;
}

/**
 * Generate a slide ID from the carousel ID and slide index.
 */
export function getSlideId(carouselId: string, index: number): string {
  return `${carouselId}-slide-${index}`;
}

/**
 * Generate an indicator ID from the carousel ID and indicator index.
 */
export function getIndicatorId(carouselId: string, index: number): string {
  return `${carouselId}-indicator-${index}`;
}

/**
 * Generate the instructions element ID from the carousel ID.
 */
export function getInstructionsId(carouselId: string): string {
  return `${carouselId}-instructions`;
}

/**
 * Default keyboard usage instructions for screen readers.
 * Describes how to navigate the carousel using keyboard.
 */
export const CAROUSEL_INSTRUCTIONS =
  'Use the left and right arrow keys to navigate between slides. ' +
  'Press Home to go to the first slide or End to go to the last slide. ' +
  'Press Enter or Space on an indicator to go to that slide.';

/**
 * Visually hidden component for screen reader-only content.
 * Content is hidden from visual display but remains accessible to assistive technologies.
 *
 * Uses the standard screen-reader-only CSS pattern.
 */
export const VisuallyHidden = styled('span')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

/**
 * @mui/carousel - Material UI Carousel Component
 *
 * A native, production-ready Carousel component for Material UI.
 *
 * @see https://mui.com/material-ui/react-carousel/
 */

'use client';

// Main Carousel component and styled slots
export { default as Carousel } from './Carousel';
export * from './Carousel';

// Context for sub-component communication
export * from './CarouselContext';

// Hooks
export * from './hooks';

// Shared types
export * from './types';

// Utilities (for advanced usage)
export {
  clampIndex,
  wrapIndex,
  normalizeSpacing,
  getValidChildren,
  isInteractiveElement,
  calculateSlideWidth,
  calculateTransformOffset,
} from './utils/carouselHelpers';

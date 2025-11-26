import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

/**
 * CSS classes applied to the Carousel component.
 * Use these classes to style the carousel via the `classes` prop or CSS.
 */
export interface CarouselClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the slides container element. */
  slides: string;
  /** Styles applied to each slide element. */
  slide: string;
  /** Styles applied to the active slide. */
  slideActive: string;
  /** Styles applied to the next slide (during transitions). */
  slideNext: string;
  /** Styles applied to the previous slide (during transitions). */
  slidePrev: string;
  /** Styles applied to the navigation container. */
  navigation: string;
  /** Base styles applied to navigation buttons. */
  navigationButton: string;
  /** Styles applied to the previous navigation button. */
  navigationPrev: string;
  /** Styles applied to the next navigation button. */
  navigationNext: string;
  /** Styles applied to navigation when disabled. */
  navigationDisabled: string;
  /** Styles applied to the indicators container. */
  indicators: string;
  /** Styles applied to each indicator element. */
  indicator: string;
  /** Styles applied to the active indicator. */
  indicatorActive: string;
  /** Styles applied when orientation is horizontal. */
  horizontal: string;
  /** Styles applied when auto-play is active. */
  autoPlaying: string;
}

/**
 * Union type of all carousel class keys.
 */
export type CarouselClassKey = keyof CarouselClasses;

/**
 * Generates a utility class name for a carousel slot.
 * @param slot - The slot name (e.g., 'root', 'slide', 'navigation')
 * @returns The generated class name (e.g., 'MuiCarousel-root')
 */
export function getCarouselUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCarousel', slot);
}

/**
 * Object containing all carousel CSS class names.
 * These can be used to target carousel elements in stylesheets.
 *
 * @example
 * ```css
 * .MuiCarousel-root { ... }
 * .MuiCarousel-slide { ... }
 * .MuiCarousel-slideActive { ... }
 * ```
 */
const carouselClasses: CarouselClasses = generateUtilityClasses('MuiCarousel', [
  'root',
  'slides',
  'slide',
  'slideActive',
  'slideNext',
  'slidePrev',
  'navigation',
  'navigationButton',
  'navigationPrev',
  'navigationNext',
  'navigationDisabled',
  'indicators',
  'indicator',
  'indicatorActive',
  'horizontal',
  'autoPlaying',
]);

export default carouselClasses;

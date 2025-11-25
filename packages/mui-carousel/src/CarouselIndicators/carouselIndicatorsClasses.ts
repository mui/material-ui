import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

/**
 * CSS classes applied to the CarouselIndicators component.
 * Use these classes to style the indicators via the `classes` prop or CSS.
 */
export interface CarouselIndicatorsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to each indicator element. */
  indicator: string;
  /** Styles applied to the active indicator. */
  indicatorActive: string;
}

/**
 * Union type of all carousel indicators class keys.
 */
export type CarouselIndicatorsClassKey = keyof CarouselIndicatorsClasses;

/**
 * Generates a utility class name for a carousel indicators slot.
 * @param slot - The slot name (e.g., 'root', 'indicator', 'indicatorActive')
 * @returns The generated class name (e.g., 'MuiCarouselIndicators-root')
 */
export function getCarouselIndicatorsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCarouselIndicators', slot);
}

/**
 * Object containing all carousel indicators CSS class names.
 * These can be used to target indicator elements in stylesheets.
 *
 * @example
 * ```css
 * .MuiCarouselIndicators-root { ... }
 * .MuiCarouselIndicators-indicator { ... }
 * .MuiCarouselIndicators-indicatorActive { ... }
 * ```
 */
const carouselIndicatorsClasses: CarouselIndicatorsClasses = generateUtilityClasses(
  'MuiCarouselIndicators',
  ['root', 'indicator', 'indicatorActive'],
);

export default carouselIndicatorsClasses;

import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

/**
 * CSS classes applied to the CarouselNavigation component.
 * Use these classes to style the navigation via the `classes` prop or CSS.
 */
export interface CarouselNavigationClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Base styles applied to navigation buttons. */
  button: string;
  /** Styles applied to the previous navigation button. */
  buttonPrev: string;
  /** Styles applied to the next navigation button. */
  buttonNext: string;
  /** Styles applied to a disabled button. */
  disabled: string;
}

/**
 * Union type of all carousel navigation class keys.
 */
export type CarouselNavigationClassKey = keyof CarouselNavigationClasses;

/**
 * Generates a utility class name for a carousel navigation slot.
 * @param slot - The slot name (e.g., 'root', 'button', 'buttonPrev')
 * @returns The generated class name (e.g., 'MuiCarouselNavigation-root')
 */
export function getCarouselNavigationUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCarouselNavigation', slot);
}

/**
 * Object containing all carousel navigation CSS class names.
 * These can be used to target navigation elements in stylesheets.
 *
 * @example
 * ```css
 * .MuiCarouselNavigation-root { ... }
 * .MuiCarouselNavigation-button { ... }
 * .MuiCarouselNavigation-buttonPrev { ... }
 * ```
 */
const carouselNavigationClasses: CarouselNavigationClasses = generateUtilityClasses(
  'MuiCarouselNavigation',
  ['root', 'button', 'buttonPrev', 'buttonNext', 'disabled'],
);

export default carouselNavigationClasses;

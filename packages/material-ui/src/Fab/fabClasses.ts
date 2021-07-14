import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface FabClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  primary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  secondary: string;
  /** Styles applied to the root element if `variant="extended"`. */
  extended: string;
  /** Styles applied to the root element if `variant="circular"`. */
  circular: string;
  /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `size="small"``. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"``. */
  sizeMedium: string;
}

export type FabClassKey = keyof FabClasses;

export function getFabUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFab', slot);
}

const fabClasses: FabClasses = generateUtilityClasses('MuiFab', [
  'root',
  'primary',
  'secondary',
  'extended',
  'circular',
  'focusVisible',
  'disabled',
  'colorInherit',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default fabClasses;

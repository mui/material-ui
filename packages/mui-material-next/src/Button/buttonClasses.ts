import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="filledTonal"`. */
  filledTonal: string;
  /** Styles applied to the root element if `variant="elevated"`. */
  elevated: string;
  /** Styles applied to the root element if `disableElevation={true}`. */
  disableElevation: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the element is active. */
  active: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="tertiary"`. */
  colorTertiary: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the startIcon element if supplied. */
  startIcon: string;
  /** Styles applied to the endIcon element if supplied. */
  endIcon: string;
  /** Styles applied to the icon element if supplied and `size="small"`. */
  iconSizeSmall: string;
  /** Styles applied to the icon element if supplied and `size="medium"`. */
  iconSizeMedium: string;
  /** Styles applied to the icon element if supplied and `size="large"`. */
  iconSizeLarge: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'text',
  'outlined',
  'filled',
  'filledTonal',
  'elevated',
  'colorPrimary',
  'colorSecondary',
  'colorTertiary',
  'disableElevation',
  'focusVisible',
  'disabled',
  'active',
  'colorInherit',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
  'fullWidth',
  'startIcon',
  'endIcon',
  'iconSizeSmall',
  'iconSizeMedium',
  'iconSizeLarge',
]);

export default buttonClasses;

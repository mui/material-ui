import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textBrand: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedBrand: string;
  /** Styles applied to the root element if `variant="contained"`. */
  contained: string;
  /** Styles applied to the root element if `variant="contained"` and `color="primary"`. */
  containedBrand: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="small"` and `variant="text"`. */
  textSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="text"`. */
  textSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="text"`. */
  textSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="outlined"`. */
  outlinedSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="outlined"`. */
  outlinedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="outlined"`. */
  outlinedSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="contained"`. */
  containedSizeSmall: string;
  /** Styles applied to the root element if `size="small"` and `variant="contained"`. */
  containedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="contained"`. */
  containedSizeLarge: string;
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
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('JoyButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('JoyButton', [
  'root',
  'text',
  'textBrand',
  'outlined',
  'outlinedBrand',
  'contained',
  'containedBrand',
  'focusVisible',
  'disabled',
  'textSizeSmall',
  'textSizeMedium',
  'textSizeLarge',
  'outlinedSizeSmall',
  'outlinedSizeMedium',
  'outlinedSizeLarge',
  'containedSizeSmall',
  'containedSizeMedium',
  'containedSizeLarge',
  'sizeMedium',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
  'startIcon',
  'endIcon',
]);

export default buttonClasses;

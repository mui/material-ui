import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="brand"`.. */
  colorBrand: string;
  /** Styles applied to the root element if `variant="text"`. */
  variantText: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'colorBrand',
  'variantText',
  'variantOutlined',
  'variantContained',
  'focusVisible',
  'disabled',
  'sizeMedium',
  'sizeSmall',
  'sizeLarge',
  'fullWidth',
]);

export default buttonClasses;

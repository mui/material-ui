import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface IconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="action"`. */
  colorAction: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="disabled"`. */
  colorDisabled: string;
  /** Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: string;
  /** Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: string;
  /** Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: string;
}

export type IconClassKey = keyof IconClasses;

export function getIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiIcon', slot);
}

const iconClasses: IconClasses = generateUtilityClasses('MuiIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
]);

export default iconClasses;

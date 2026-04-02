import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ChipDeleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `color="default"`. */
  colorDefault: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
}

export type ChipDeleteClassKey = keyof ChipDeleteClasses;

export function getChipDeleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipDelete', slot);
}

const chipDeleteClasses: ChipDeleteClasses = generateUtilityClasses('MuiChipDelete', [
  'root',
  'disabled',
  'sizeSmall',
  'sizeMedium',
  'colorDefault',
  'colorPrimary',
  'colorSecondary',
  'colorError',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'filled',
  'outlined',
]);

export default chipDeleteClasses;

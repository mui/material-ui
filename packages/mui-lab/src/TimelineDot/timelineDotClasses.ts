import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TimelineDotClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `color="grey"` and `variant="filled"`. */
  filledGrey: string;
  /** Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
  outlinedGrey: string;
  /** Styles applied to the root element if `color="primary"` and `variant="filled"`. */
  filledPrimary: string;
  /** Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
  outlinedPrimary: string;
  /** Styles applied to the root element if `color="secondary"` and `variant="filled"`. */
  filledSecondary: string;
  /** Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
  outlinedSecondary: string;
}

export type TimelineDotClassKey = keyof TimelineDotClasses;

export function getTimelineDotUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineDot', slot);
}

const timelineDotClasses: TimelineDotClasses = generateUtilityClasses('MuiTimelineDot', [
  'root',
  'filled',
  'outlined',
  'filledGrey',
  'outlinedGrey',
  'filledPrimary',
  'outlinedPrimary',
  'filledSecondary',
  'outlinedSecondary',
]);

export default timelineDotClasses;

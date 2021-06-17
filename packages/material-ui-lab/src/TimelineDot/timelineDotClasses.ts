import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

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
  /** Styles applied to the root element if `color="error"` and `variant="filled"`. */
  filledError: string;
  /** Styles applied to the root element if `color="error"` and `variant="outlined"`. */
  outlinedError: string;
  /** Styles applied to the root element if `color="info"` and `variant="filled"`. */
  filledInfo: string;
  /** Styles applied to the root element if `color="info"` and `variant="outlined"`. */
  outlinedInfo: string;
  /** Styles applied to the root element if `color="success"` and `variant="filled"`. */
  filledSuccess: string;
  /** Styles applied to the root element if `color="success"` and `variant="outlined"`. */
  outlinedSuccess: string;
  /** Styles applied to the root element if `color="warning"` and `variant="filled"`. */
  filledWarning: string;
  /** Styles applied to the root element if `color="warning"` and `variant="outlined"`. */
  outlinedWarning: string;
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
  'filledError',
  'outlinedError',
  'filledInfo',
  'outlinedInfo',
  'filledSuccess',
  'outlinedSuccess',
  'filledWarning',
  'outlinedWarning',
]);

export default timelineDotClasses;

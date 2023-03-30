import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface AlertClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="standard"`. */
  standard: string;
  /** Styles applied to the root element if `variant="standard"` and `color="success"`. */
  standardSuccess: string;
  /** Styles applied to the root element if `variant="standard"` and `color="info"`. */
  standardInfo: string;
  /** Styles applied to the root element if `variant="standard"` and `color="warning"`. */
  standardWarning: string;
  /** Styles applied to the root element if `variant="standard"` and `color="error"`. */
  standardError: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="success"`. */
  outlinedSuccess: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="info"`. */
  outlinedInfo: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
  outlinedWarning: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="error"`. */
  outlinedError: string;
  /** Styles applied to the root element if `variant="filled"` and `color="success"`. */
  filledSuccess: string;
  /** Styles applied to the root element if `variant="filled"` and `color="info"`. */
  filledInfo: string;
  /** Styles applied to the root element if `variant="filled"` and `color="warning"`. */
  filledWarning: string;
  /** Styles applied to the root element if `variant="filled"` and `color="error"`. */
  filledError: string;
  /** Styles applied to the icon wrapper element. */
  icon: string;
  /** Styles applied to the message wrapper element. */
  message: string;
  /** Styles applied to the action wrapper element if `action` is provided. */
  action: string;
}

export type AlertClassKey = keyof AlertClasses;

export function getAlertUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAlert', slot);
}

const alertClasses: AlertClasses = generateUtilityClasses('MuiAlert', [
  'root',
  'action',
  'icon',
  'message',
  'filled',
  'filledSuccess',
  'filledInfo',
  'filledWarning',
  'filledError',
  'outlined',
  'outlinedSuccess',
  'outlinedInfo',
  'outlinedWarning',
  'outlinedError',
  'standard',
  'standardSuccess',
  'standardInfo',
  'standardWarning',
  'standardError',
]);

export default alertClasses;

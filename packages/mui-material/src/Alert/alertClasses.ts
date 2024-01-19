import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AlertClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="standard"`. */
  standard: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `variant="standard"` and `color="success"`.
   * @deprecated Use the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard) class instead.
   * Success is the default color.
   */
  standardSuccess: string;
  /** Styles applied to the root element if `variant="standard"` and `color="info"`.
   * @deprecated Use the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   */
  standardInfo: string;
  /** Styles applied to the root element if `variant="standard"` and `color="warning"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   */
  standardWarning: string;
  /** Styles applied to the root element if `variant="standard"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   */
  standardError: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="success"`.
   * @deprecated Use the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined) class instead.
   * Success is the default color.
   */
  outlinedSuccess: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="info"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   */
  outlinedInfo: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="warning"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   */
  outlinedWarning: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   */
  outlinedError: string;
  /** Styles applied to the root element if `variant="filled"` and `color="success"`.
   * @deprecated Use the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled) class instead.
   * Success is the default color.
   */
  filledSuccess: string;
  /** Styles applied to the root element if `variant="filled"` and `color="info"`.
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   */
  filledInfo: string;
  /** Styles applied to the root element if `variant="filled"` and `color="warning"`
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   */
  filledWarning: string;
  /** Styles applied to the root element if `variant="filled"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   */
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
  'colorInfo',
  'colorWarning',
  'colorError',
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

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
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `variant="standard"` and `color="success"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorSuccess](/material-ui/api/alert/#alert-classes-colorSuccess) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  standardSuccess: string;
  /** Styles applied to the root element if `variant="standard"` and `color="info"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  standardInfo: string;
  /** Styles applied to the root element if `variant="standard"` and `color="warning"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  standardWarning: string;
  /** Styles applied to the root element if `variant="standard"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-standard](/material-ui/api/alert/#alert-classes-standard)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  standardError: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="success"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorSuccess](/material-ui/api/alert/#alert-classes-colorSuccess) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSuccess: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="info"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedInfo: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="warning"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedWarning: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-outlined](/material-ui/api/alert/#alert-classes-outlined)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedError: string;
  /** Styles applied to the root element if `variant="filled"` and `color="success"`.
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorSuccess](/material-ui/api/alert/#alert-classes-colorSuccess) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  filledSuccess: string;
  /** Styles applied to the root element if `variant="filled"` and `color="info"`.
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorInfo](/material-ui/api/alert/#alert-classes-colorInfo) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  filledInfo: string;
  /** Styles applied to the root element if `variant="filled"` and `color="warning"`
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorWarning](/material-ui/api/alert/#alert-classes-colorWarning) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  filledWarning: string;
  /** Styles applied to the root element if `variant="filled"` and `color="error"`.
   * @deprecated Combine the [.MuiAlert-filled](/material-ui/api/alert/#alert-classes-filled)
   * and [.MuiAlert-colorError](/material-ui/api/alert/#alert-classes-colorError) classes instead.
   * See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
  'colorSuccess',
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

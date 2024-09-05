import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="text"` and `color="inherit"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorInherit](/material-ui/api/button/#button-classes-colorInherit) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textInherit: string;
  /** Styles applied to the root element if `variant="text"` and `color="primary"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorPrimary](/material-ui/api/button/#button-classes-colorPrimary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textPrimary: string;
  /** Styles applied to the root element if `variant="text"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorSecondary](/material-ui/api/button/#button-classes-colorSecondary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSecondary: string;
  /** Styles applied to the root element if `variant="text"` and `color="success"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorSuccess](/material-ui/api/button/#button-classes-colorSuccess) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSuccess: string;
  /** Styles applied to the root element if `variant="text"` and `color="error"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorError](/material-ui/api/button/#button-classes-colorError) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textError: string;
  /** Styles applied to the root element if `variant="text"` and `color="info"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorInfo](/material-ui/api/button/#button-classes-colorInfo) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textInfo: string;
  /** Styles applied to the root element if `variant="text"` and `color="warning"`.
   * @deprecated Combine the [.MuiButton-text](/material-ui/api/button/#button-classes-text) and [.MuiButton-colorWarning](/material-ui/api/button/#button-classes-colorWarning) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textWarning: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="inherit"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorInherit](/material-ui/api/button/#button-classes-colorInherit) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedInherit: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="primary"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorPrimary](/material-ui/api/button/#button-classes-colorPrimary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedPrimary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorSecondary](/material-ui/api/button/#button-classes-colorSecondary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSecondary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="success"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorSuccess](/material-ui/api/button/#button-classes-colorSuccess) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSuccess: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="error"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorError](/material-ui/api/button/#button-classes-colorError) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedError: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="info"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorInfo](/material-ui/api/button/#button-classes-colorInfo) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedInfo: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="warning"`.
   * @deprecated Combine the [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) and [.MuiButton-colorWarning](/material-ui/api/button/#button-classes-colorWarning) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedWarning: string;
  /** Styles applied to the root element if `variant="contained"`. */
  contained: string;
  /** Styles applied to the root element if `variant="contained"` and `color="inherit"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorInherit](/material-ui/api/button/#button-classes-colorInherit) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedInherit: string;
  /** Styles applied to the root element if `variant="contained"` and `color="primary"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorPrimary](/material-ui/api/button/#button-classes-colorPrimary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedPrimary: string;
  /** Styles applied to the root element if `variant="contained"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorSecondary](/material-ui/api/button/#button-classes-colorSecondary) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedSecondary: string;
  /** Styles applied to the root element if `variant="contained"` and `color="success"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorSuccess](/material-ui/api/button/#button-classes-colorSuccess) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedSuccess: string;
  /** Styles applied to the root element if `variant="contained"` and `color="info"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorInfo](/material-ui/api/button/#button-classes-colorInfo) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedInfo: string;
  /** Styles applied to the root element if `variant="contained"` and `color="error"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorError](/material-ui/api/button/#button-classes-colorError) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedError: string;
  /** Styles applied to the root element if `variant="contained"` and `color="warning"`.
   * @deprecated Combine the [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) and [.MuiButton-colorWarning](/material-ui/api/button/#button-classes-colorWarning) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedWarning: string;
  /** Styles applied to the root element if `disableElevation={true}`. */
  disableElevation: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** Styles applied to the root element if `size="small"` and `variant="text"`.
   * @deprecated Combine the [.MuiButton-sizeSmall](/material-ui/api/button/#button-classes-sizeSmall) and [.MuiButton-text](/material-ui/api/button/#button-classes-text) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="text"`.
   * @deprecated Combine the [.MuiButton-sizeMedium](/material-ui/api/button/#button-classes-sizeMedium) and [.MuiButton-text](/material-ui/api/button/#button-classes-text) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="text"`.
   * @deprecated Combine the [.MuiButton-sizeLarge](/material-ui/api/button/#button-classes-sizeLarge) and [.MuiButton-text](/material-ui/api/button/#button-classes-text) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  textSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="outlined"`.
   * @deprecated Combine the [.MuiButton-sizeSmall](/material-ui/api/button/#button-classes-sizeSmall) and [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="outlined"`.
   * @deprecated Combine the [.MuiButton-sizeMedium](/material-ui/api/button/#button-classes-sizeMedium) and [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="outlined"`.
   * @deprecated Combine the [.MuiButton-sizeLarge](/material-ui/api/button/#button-classes-sizeLarge) and [.MuiButton-outlined](/material-ui/api/button/#button-classes-outlined) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  outlinedSizeLarge: string;
  /** Styles applied to the root element if `size="small"` and `variant="contained"`.
   * @deprecated Combine the [.MuiButton-sizeSmall](/material-ui/api/button/#button-classes-sizeSmall) and [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedSizeSmall: string;
  /** Styles applied to the root element if `size="medium"` and `variant="contained"`.
   * @deprecated Combine the [.MuiButton-sizeMedium](/material-ui/api/button/#button-classes-sizeMedium) and [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedSizeMedium: string;
  /** Styles applied to the root element if `size="large"` and `variant="contained"`.
   * @deprecated Combine the [.MuiButton-sizeLarge](/material-ui/api/button/#button-classes-sizeLarge) and [.MuiButton-contained](/material-ui/api/button/#button-classes-contained) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  containedSizeLarge: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `size="large"`. */
  sizeLarge: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the icon element if supplied */
  icon: string;
  /** Styles applied to the startIcon element if supplied. */
  startIcon: string;
  /** Styles applied to the endIcon element if supplied. */
  endIcon: string;
  /** Styles applied to the icon element if supplied and `size="small"`.
   * @deprecated Combine the [.MuiButton-icon](/material-ui/api/button/#button-classes-icon) and [.MuiButtonSizeSmall](/material-ui/api/button/#button-classes-sizeSmall) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconSizeSmall: string;
  /** Styles applied to the icon element if supplied and `size="medium"`.
   * @deprecated Combine the [.MuiButton-icon](/material-ui/api/button/#button-classes-icon) and [.MuiButtonSizeMedium](/material-ui/api/button/#button-classes-sizeMedium) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconSizeMedium: string;
  /** Styles applied to the icon element if supplied and `size="large"`.
   * @deprecated Combine the [.MuiButton-icon](/material-ui/api/button/#button-classes-icon) and [.MuiButtonSizeLarge](/material-ui/api/button/#button-classes-sizeLarge) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconSizeLarge: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'text',
  'textInherit',
  'textPrimary',
  'textSecondary',
  'textSuccess',
  'textError',
  'textInfo',
  'textWarning',
  'outlined',
  'outlinedInherit',
  'outlinedPrimary',
  'outlinedSecondary',
  'outlinedSuccess',
  'outlinedError',
  'outlinedInfo',
  'outlinedWarning',
  'contained',
  'containedInherit',
  'containedPrimary',
  'containedSecondary',
  'containedSuccess',
  'containedError',
  'containedInfo',
  'containedWarning',
  'disableElevation',
  'focusVisible',
  'disabled',
  'colorInherit',
  'colorPrimary',
  'colorSecondary',
  'colorSuccess',
  'colorError',
  'colorInfo',
  'colorWarning',
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
  'icon',
  'iconSizeSmall',
  'iconSizeMedium',
  'iconSizeLarge',
]);

export default buttonClasses;

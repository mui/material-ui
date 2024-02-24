import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ButtonGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="contained"`. */
  contained: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `disableElevation={true}`. */
  disableElevation: string;
  /** State class applied to the child elements if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the first button in the button group. */
  firstButton: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the children. */
  grouped: string;
  /** Styles applied to the children if `orientation="horizontal"`. */
  groupedHorizontal: string;
  /** Styles applied to the children if `orientation="vertical"`. */
  groupedVertical: string;
  /** Styles applied to the children if `variant="text"`. */
  groupedText: string;
  /** Styles applied to the children if `variant="text"` and `orientation="horizontal"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedHorizontal](/material-ui/api/button-group/#button-group-classes-groupedHorizontal) and [.MuiButtonGroup-groupedText](/material-ui/api/button-group/#button-group-classes-groupedText) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedTextHorizontal: string;
  /** Styles applied to the children if `variant="text"` and `orientation="vertical"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedVertical](/material-ui/api/button-group/#button-group-classes-groupedVertical) and [.MuiButtonGroup-groupedText](/material-ui/api/button-group/#button-group-classes-groupedText) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedTextVertical: string;
  /** Styles applied to the children if `variant="text"` and `color="primary"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedText](/material-ui/api/button-group/#button-group-classes-groupedText) and [.MuiButtonGroup-groupedColorPrimary](/material-ui/api/button-group/#button-group-classes-groupedColorPrimary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedTextPrimary: string;
  /** Styles applied to the children if `variant="text"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButtonGroup-grouped](/material-ui/api/button-group/#button-group-classes-grouped) and [.MuiButtonGroup-groupedColorSecondary](/material-ui/api/button-group/#button-group-classes-groupedColorSecondary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedTextSecondary: string;
  /** Styles applied to the children if `variant="outlined"`. */
  groupedOutlined: string;
  /** Styles applied to the children if `variant="outlined"` and `orientation="horizontal"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedHorizontal](/material-ui/api/button-group/#button-group-classes-groupedHorizontal) and [.MuiButtonGroup-groupedOutlined](/material-ui/api/button-group/#button-group-classes-groupedOutlined) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedOutlinedHorizontal: string;
  /** Styles applied to the children if `variant="outlined"` and `orientation="vertical"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedVertical](/material-ui/api/button-group/#button-group-classes-groupedVertical) and [.MuiButtonGroup-groupedOutlined](/material-ui/api/button-group/#button-group-classes-groupedOutlined) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedOutlinedVertical: string;
  /** Styles applied to the children if `variant="outlined"` and `color="primary"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedOutlined](/material-ui/api/button-group/#button-group-classes-groupedOutlined) and [.MuiButtonGroup-groupedColorPrimary](/material-ui/api/button-group/#button-group-classes-groupedColorPrimary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedOutlinedPrimary: string;
  /** Styles applied to the children if `variant="outlined"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButtonGroup-grouped](/material-ui/api/button-group/#button-group-classes-grouped) and [.MuiButtonGroup-groupedColorSecondary](/material-ui/api/button-group/#button-group-classes-groupedColorSecondary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedOutlinedSecondary: string;
  /** Styles applied to the children if `variant="contained"`. */
  groupedContained: string;
  /** Styles applied to the children if `variant="contained"` and `orientation="horizontal"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedHorizontal](/material-ui/api/button-group/#button-group-classes-groupedHorizontal) and [.MuiButtonGroup-groupedContained](/material-ui/api/button-group/#button-group-classes-groupedContained) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedContainedHorizontal: string;
  /** Styles applied to the children if `variant="contained"` and `orientation="vertical"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedVertical](/material-ui/api/button-group/#button-group-classes-groupedVertical) and [.MuiButtonGroup-groupedContained](/material-ui/api/button-group/#button-group-classes-groupedContained) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedContainedVertical: string;
  /** Styles applied to the children if `variant="contained"` and `color="primary"`.
   * @deprecated Combine the [.MuiButtonGroup-groupedContained](/material-ui/api/button-group/#button-group-classes-groupedContained) and [.MuiButtonGroup-groupedColorPrimary](/material-ui/api/button-group/#button-group-classes-groupedColorPrimary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedContainedPrimary: string;
  /** Styles applied to the children if `variant="contained"` and `color="secondary"`.
   * @deprecated Combine the [.MuiButtonGroup-grouped](/material-ui/api/button-group/#button-group-classes-grouped) and [.MuiButtonGroup-groupedColorSecondary](/material-ui/api/button-group/#button-group-classes-groupedColorSecondary) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  groupedContainedSecondary: string;
  /** Styles applied to the children if `color="primary"`. */
  groupedColorPrimary: string;
  /** Styles applied to the children if `color="secondary"`. */
  groupedColorSecondary: string;
  /** Styles applied to the last button in the button group. */
  lastButton: string;
  /** Styles applied to buttons in the middle of the button group. */
  middleButton: string;
}

export type ButtonGroupClassKey = keyof ButtonGroupClasses;

export function getButtonGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButtonGroup', slot);
}

const buttonGroupClasses: ButtonGroupClasses = generateUtilityClasses('MuiButtonGroup', [
  'root',
  'contained',
  'outlined',
  'text',
  'disableElevation',
  'disabled',
  'firstButton',
  'fullWidth',
  'vertical',
  'grouped',
  'groupedHorizontal',
  'groupedVertical',
  'groupedText',
  'groupedTextHorizontal',
  'groupedTextVertical',
  'groupedTextPrimary',
  'groupedTextSecondary',
  'groupedOutlined',
  'groupedOutlinedHorizontal',
  'groupedOutlinedVertical',
  'groupedOutlinedPrimary',
  'groupedOutlinedSecondary',
  'groupedContained',
  'groupedContainedHorizontal',
  'groupedContainedVertical',
  'groupedContainedPrimary',
  'groupedContainedSecondary',
  'groupedColorPrimary',
  'groupedColorSecondary',
  'lastButton',
  'middleButton',
]);

export default buttonGroupClasses;

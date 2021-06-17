import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

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
  /** Pseudo-class applied to the child elements if `disabled={true}`. */
  disabled: string;
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
  /** Styles applied to the children if `variant="text"` and `orientation="horizontal"`. */
  groupedTextHorizontal: string;
  /** Styles applied to the children if `variant="text"` and `orientation="vertical"`. */
  groupedTextVertical: string;
  /** Styles applied to the children if `variant="text"` and `color="primary"`. */
  groupedTextPrimary: string;
  /** Styles applied to the children if `variant="text"` and `color="secondary"`. */
  groupedTextSecondary: string;
  /** Styles applied to the children if `variant="text"` and `color="error"`. */
  groupedTextError: string;
  /** Styles applied to the children if `variant="text"` and `color="info"`. */
  groupedTextInfo: string;
  /** Styles applied to the children if `variant="text"` and `color="success"`. */
  groupedTextSuccess: string;
  /** Styles applied to the children if `variant="text"` and `color="warning"`. */
  groupedTextWarning: string;
  /** Styles applied to the children if `variant="outlined"`. */
  groupedOutlined: string;
  /** Styles applied to the children if `variant="outlined"` and `orientation="horizontal"`. */
  groupedOutlinedHorizontal: string;
  /** Styles applied to the children if `variant="outlined"` and `orientation="vertical"`. */
  groupedOutlinedVertical: string;
  /** Styles applied to the children if `variant="outlined"` and `color="primary"`. */
  groupedOutlinedPrimary: string;
  /** Styles applied to the children if `variant="outlined"` and `color="secondary"`. */
  groupedOutlinedSecondary: string;
  /** Styles applied to the children if `variant="outlined"` and `color="error"`. */
  groupedOutlinedError: string;
  /** Styles applied to the children if `variant="outlined"` and `color="info"`. */
  groupedOutlinedInfo: string;
  /** Styles applied to the children if `variant="outlined"` and `color="success"`. */
  groupedOutlinedSuccess: string;
  /** Styles applied to the children if `variant="outlined"` and `color="warning"`. */
  groupedOutlinedWarning: string;
  /** Styles applied to the children if `variant="contained"`. */
  groupedContained: string;
  /** Styles applied to the children if `variant="contained"` and `orientation="horizontal"`. */
  groupedContainedHorizontal: string;
  /** Styles applied to the children if `variant="contained"` and `orientation="vertical"`. */
  groupedContainedVertical: string;
  /** Styles applied to the children if `variant="contained"` and `color="primary"`. */
  groupedContainedPrimary: string;
  /** Styles applied to the children if `variant="contained"` and `color="secondary"`. */
  groupedContainedSecondary: string;
  /** Styles applied to the children if `variant="contained"` and `color="error"`. */
  groupedContainedError: string;
  /** Styles applied to the children if `variant="contained"` and `color="info"`. */
  groupedContainedInfo: string;
  /** Styles applied to the children if `variant="contained"` and `color="success"`. */
  groupedContainedSuccess: string;
  /** Styles applied to the children if `variant="contained"` and `color="warning"`. */
  groupedContainedWarning: string;
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
  'groupedTextError',
  'groupedTextInfo',
  'groupedTextSuccess',
  'groupedTextWarning',
  'groupedOutlined',
  'groupedOutlinedHorizontal',
  'groupedOutlinedVertical',
  'groupedOutlinedPrimary',
  'groupedOutlinedSecondary',
  'groupedOutlinedError',
  'groupedOutlinedInfo',
  'groupedOutlinedSuccess',
  'groupedOutlinedWarning',
  'groupedContained',
  'groupedContainedHorizontal',
  'groupedContainedVertical',
  'groupedContainedPrimary',
  'groupedContainedSecondary',
  'groupedContainedError',
  'groupedContainedInfo',
  'groupedContainedSuccess',
  'groupedContainedWarning',
]);

export default buttonGroupClasses;

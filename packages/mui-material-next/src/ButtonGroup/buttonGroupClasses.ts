import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface ButtonGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="filledTonal"`. */
  filledTonal: string;
  /** Styles applied to the root element if `variant="elevated"`. */
  elevated: string;
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
  /** Styles applied to the children if `variant="text"` and `orientation="horizontal"`. */
  groupedTextHorizontal: string;
  /** Styles applied to the children if `variant="text"` and `orientation="vertical"`. */
  groupedTextVertical: string;
  /** Styles applied to the children if `variant="text"` and `color="primary"`. */
  groupedTextPrimary: string;
  /** Styles applied to the children if `variant="text"` and `color="secondary"`. */
  groupedTextSecondary: string;
  /** Styles applied to the children if `variant="text"` and `color="tertiary"`. */
  groupedTextTertiary: string;
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
  /** Styles applied to the children if `variant="outlined"` and `color="tertiary"`. */
  groupedOutlinedTertiary: string;
  /** Styles applied to the children if `variant="filled"`. */
  groupedFilled: string;
  /** Styles applied to the children if `variant="filled"` and `orientation="horizontal"`. */
  groupedFilledHorizontal: string;
  /** Styles applied to the children if `variant="filled"` and `orientation="vertical"`. */
  groupedFilledVertical: string;
  /** Styles applied to the children if `variant="filled"` and `color="primary"`. */
  groupedFilledPrimary: string;
  /** Styles applied to the children if `variant="filled"` and `color="secondary"`. */
  groupedFilledSecondary: string;
  /** Styles applied to the children if `variant="filled"` and `color="tertiary"`. */
  groupedFilledTertiary: string;
  /** Styles applied to the children if `variant="filledTonal"`. */
  groupedFilledTonal: string;
  /** Styles applied to the children if `variant="filledTonal"` and `orientation="horizontal"`. */
  groupedFilledTonalHorizontal: string;
  /** Styles applied to the children if `variant="filledTonal"` and `orientation="vertical"`. */
  groupedFilledTonalVertical: string;
  /** Styles applied to the children if `variant="filledTonal"` and `color="primary"`. */
  groupedFilledTonalPrimary: string;
  /** Styles applied to the children if `variant="filledTonal"` and `color="secondary"`. */
  groupedFilledTonalSecondary: string;
  /** Styles applied to the children if `variant="filledTonal"` and `color="tertiary"`. */
  groupedFilledTonalTertiary: string;
  /** Styles applied to the children if `variant="elevated"`. */
  groupedElevated: string;
  /** Styles applied to the children if `variant="elevated"` and `orientation="horizontal"`. */
  groupedElevatedHorizontal: string;
  /** Styles applied to the children if `variant="elevated"` and `orientation="vertical"`. */
  groupedElevatedVertical: string;
  /** Styles applied to the children if `variant="elevated"` and `color="primary"`. */
  groupedElevatedPrimary: string;
  /** Styles applied to the children if `variant="elevated"` and `color="secondary"`. */
  groupedElevatedSecondary: string;
  /** Styles applied to the children if `variant="elevated"` and `color="tertiary"`. */
  groupedElevatedTertiary: string;
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
  'text',
  'outlined',
  'filled',
  'filledTonal',
  'elevated',
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
  'groupedTextTertiary',
  'groupedOutlined',
  'groupedOutlinedHorizontal',
  'groupedOutlinedVertical',
  'groupedOutlinedPrimary',
  'groupedOutlinedSecondary',
  'groupedOutlinedTertiary',
  'groupedFilled',
  'groupedFilledHorizontal',
  'groupedFilledVertical',
  'groupedFilledPrimary',
  'groupedFilledSecondary',
  'groupedFilledTertiary',
  'groupedFilledTonal',
  'groupedFilledTonalHorizontal',
  'groupedFilledTonalVertical',
  'groupedFilledTonalPrimary',
  'groupedFilledTonalSecondary',
  'groupedFilledTonalTertiary',
  'groupedElevated',
  'groupedElevatedHorizontal',
  'groupedElevatedVertical',
  'groupedElevatedPrimary',
  'groupedElevatedSecondary',
  'groupedElevatedTertiary',
  'lastButton',
  'middleButton',
]);

export default buttonGroupClasses;

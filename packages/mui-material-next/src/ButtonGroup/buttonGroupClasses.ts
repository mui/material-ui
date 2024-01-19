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
  /** State class applied to the root element if `color="primary"`. */
  primary: string;
  /** State class applied to the toot element if `color="secondary"`. */
  secondary: string;
  /** State class applied to the root element if `color="tertiary"`. */
  tertiary: string;
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
  'primary',
  'secondary',
  'tertiary',
  'disableElevation',
  'disabled',
  'firstButton',
  'fullWidth',
  'vertical',
  'grouped',
  'lastButton',
  'middleButton',
]);

export default buttonGroupClasses;

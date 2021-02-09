export interface ButtonGroupClasses {
  root: string;
  contained: string;
  outlined: string;
  text: string;
  disableElevation: string;
  disabled: string;
  fullWidth: string;
  vertical: string;
  grouped: string;
  groupedHorizontal: string;
  groupedVertical: string;
  groupedText: string;
  groupedTextHorizontal: string;
  groupedTextVertical: string;
  groupedTextPrimary: string;
  groupedTextSecondary: string;
  groupedOutlined: string;
  groupedOutlinedHorizontal: string;
  groupedOutlinedVertical: string;
  groupedOutlinedPrimary: string;
  groupedOutlinedSecondary: string;
  groupedContained: string;
  groupedContainedHorizontal: string;
  groupedContainedVertical: string;
  groupedContainedPrimary: string;
  groupedContainedSecondary: string;
}

declare const buttonGroupClasses: ButtonGroupClasses;

export function getButtonGroupUtilityClass(slot: string): string;

export default buttonGroupClasses;

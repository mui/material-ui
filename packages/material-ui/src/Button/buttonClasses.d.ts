export interface ButtonClasses {
  root: string;
  label: string;
  text: string;
  textInherit: string;
  textPrimary: string;
  textSecondary: string;
  outlined: string;
  outlinedInherit: string;
  outlinedPrimary: string;
  outlinedSecondary: string;
  contained: string;
  containedInherit: string;
  containedPrimary: string;
  containedSecondary: string;
  disableElevation: string;
  focusVisible: string;
  disabled: string;
  colorInherit: string;
  textSizeSmall: string;
  textSizeMedium: string;
  textSizeLarge: string;
  outlinedSizeSmall: string;
  outlinedSizeMedium: string;
  outlinedSizeLarge: string;
  containedSizeSmall: string;
  containedSizeMedium: string;
  containedSizeLarge: string;
  sizeMedium: string;
  sizeSmall: string;
  sizeLarge: string;
  fullWidth: string;
  startIcon: string;
  endIcon: string;
  iconSizeSmall: string;
  iconSizeMedium: string;
  iconSizeLarge: string;
}

declare const buttonClasses: ButtonClasses;

export function getButtonUtilityClass(slot: string): string;

export default buttonClasses;

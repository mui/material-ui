export interface FabClasses {
  root: string;
  label: string;
  primary: string;
  secondary: string;
  extended: string;
  circular: string;
  focusVisible: string;
  disabled: string;
  colorInherit: string;
  sizeSmall: string;
  sizeMedium: string;
  sizeLarge: string;
}

declare const fabClasses: FabClasses;

export function getFabUtilityClass(slot: string): string;

export default fabClasses;

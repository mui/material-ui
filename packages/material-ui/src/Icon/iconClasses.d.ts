export interface IconClasses {
  root: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAction: string;
  colorError: string;
  colorDisabled: string;
  fontSizeInherit: string;
  fontSizeSmall: string;
  fontSizeMedium: string;
  fontSizeLarge: string;
}

declare const iconClasses: IconClasses;

export function getIconUtilityClass(slot: string): string;

export default iconClasses;

export interface SvgIconClasses {
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

declare const svgIconClasses: SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string;

export default svgIconClasses;

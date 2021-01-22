export interface IconButtonClasses {
  root: string;
  disabled: string;
  colorInherit: string;
  colorPrimary: string;
  colorSecondary: string;
  edgeStart: string;
  edgeEnd: string;
  sizeSmall: string;
  sizeMedium: string;
  label: string;
}

declare const iconButtonClasses: IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string;

export default iconButtonClasses;

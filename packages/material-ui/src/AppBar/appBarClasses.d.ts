export interface AppBarClasses {
  root: string;
  positionFixed: string;
  positionAbsolute: string;
  positionSticky: string;
  positionStatic: string;
  positionRelative: string;
  colorDefault: string;
  colorPrimary: string;
  colorSecondary: string;
  colorInherit: string;
  colorTransparent: string;
}

declare const appBarClasses: AppBarClasses;

export function getAppBarUtilityClass(slot: string): string;

export default appBarClasses;

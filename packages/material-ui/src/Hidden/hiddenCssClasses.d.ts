export interface HiddenCssClasses {
  root: string;
  xlDown: string;
  xlUp: string;
  onlyXl: string;
  lgDown: string;
  lgUp: string;
  onlyLg: string;
  mdDown: string;
  mdUp: string;
  onlyMd: string;
  smDown: string;
  smUp: string;
  onlySm: string;
  xsDown: string;
  xsUp: string;
  onlyXs: string;
}

declare const hiddenCssClasses: HiddenCssClasses;

export function getHiddenCssUtilityClass(slot: string): string;

export default hiddenCssClasses;

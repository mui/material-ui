export interface LinkClasses {
  root: string;
  underlineNone: string;
  underlineHover: string;
  underlineAlways: string;
  button: string;
  focusVisible: string;
}

declare const linkClasses: LinkClasses;

export function getLinkUtilityClass(slot: string): string;

export default linkClasses;

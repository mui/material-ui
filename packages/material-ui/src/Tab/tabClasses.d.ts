export interface TabClasses {
  root: string;
  labelIcon: string;
  textColorInherit: string;
  textColorPrimary: string;
  textColorSecondary: string;
  selected: string;
  disabled: string;
  fullWidth: string;
  wrapped: string;
  wrapper: string;
}

declare const tabClasses: TabClasses;

export function getTabUtilityClass(slot: string): string;

export default tabClasses;

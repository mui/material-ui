export interface DividerClasses {
  root: string;
  absolute: string;
  fullWidth: string;
  inset: string;
  middle: string;
  flexItem: string;
  light: string;
  vertical: string;
  withChildren: string;
  withChildrenVertical: string;
  textAlignRight: string;
  textAlignLeft: string;
  wrapper: string;
  wrapperVertical: string;
}

declare const dividerClasses: DividerClasses;

export function getDividerUtilityClass(slot: string): string;

export default dividerClasses;

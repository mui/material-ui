export interface ListSubheaderClasses {
  root: string;
  colorPrimary: string;
  colorInherit: string;
  gutters: string;
  inset: string;
  sticky: string;
}

declare const listSubheaderClasses: ListSubheaderClasses;

export function getListSubheaderUtilityClass(slot: string): string;

export default listSubheaderClasses;

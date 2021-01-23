export interface ListClasses {
  root: string;
  padding: string;
  dense: string;
  subheader: string;
}

declare const listClasses: ListClasses;

export function getListUtilityClass(slot: string): string;

export default listClasses;

export interface TabScrollButtonClasses {
  root: string;
  vertical: string;
  horizontal: string;
  disabled: string;
}

declare const tabScrollButtonClasses: TabScrollButtonClasses;

export function getTabScrollButtonUtilityClass(slot: string): string;

export default tabScrollButtonClasses;

export interface BottomNavigationActionClasses {
  root: string;
  iconOnly: string;
  selected: string;
  wrapper: string;
  label: string;
}

declare const bottomNavigationActionClasses: BottomNavigationActionClasses;

export function getBottomNavigationActionUtilityClass(slot: string): string;

export default bottomNavigationActionClasses;

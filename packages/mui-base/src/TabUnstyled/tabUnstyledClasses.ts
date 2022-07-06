import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabUnstyledClasses {
  root: string;
  selected: string;
  disabled: string;
}

export type TabUnstyledClassKey = keyof TabUnstyledClasses;

export function getTabUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseTab', slot);
}

const tabUnstyledClasses: TabUnstyledClasses = generateUtilityClasses('BaseTab', [
  'root',
  'selected',
  'disabled',
]);

export default tabUnstyledClasses;

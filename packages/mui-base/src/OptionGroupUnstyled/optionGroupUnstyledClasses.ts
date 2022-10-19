import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface OptionGroupUnstyledClasses {
  root: string;
  label: string;
  list: string;
}

export type OptionGroupUnstyledClassKey = keyof OptionGroupUnstyledClasses;

export function getOptionGroupUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOptionGroup', slot);
}

const optionGroupUnstyledClasses: OptionGroupUnstyledClasses = generateUtilityClasses(
  'MuiOptionGroup',
  ['root', 'label', 'list'],
);

export default optionGroupUnstyledClasses;

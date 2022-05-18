import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface OptionGroupUnstyledClasses {
  root: string;
  label: string;
  list: string;
}

export type OptionGroupUnstyledClassKey = keyof OptionGroupUnstyledClasses;

export function getOptionGroupUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOptionGroupUnstyled', slot);
}

const optionGroupUnstyledClasses: OptionGroupUnstyledClasses = generateUtilityClasses(
  'MuiOptionGroupUnstyled',
  ['root', 'label', 'list'],
);

export default optionGroupUnstyledClasses;

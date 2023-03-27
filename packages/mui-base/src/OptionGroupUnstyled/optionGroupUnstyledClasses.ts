import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface OptionGroupUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `li` element if `disabled={true}`. */
  disabled: string;
  /** Class name applied to the label element. */
  label: string;
  /** Class name applied to the list element. */
  list: string;
}

export type OptionGroupUnstyledClassKey = keyof OptionGroupUnstyledClasses;

export function getOptionGroupUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOptionGroup', slot);
}

const optionGroupUnstyledClasses: OptionGroupUnstyledClasses = generateUtilityClasses(
  'MuiOptionGroup',
  ['root', 'disabled', 'label', 'list'],
);

export default optionGroupUnstyledClasses;

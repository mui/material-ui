import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface OptionUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `li` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `li` element if `selected={true}`. */
  selected: string;
  /** State class applied to the root `li` element if `highlighted={true}`. */
  highlighted: string;
}

export type OptionUnstyledClassKey = keyof OptionUnstyledClasses;

export function getOptionUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOption', slot);
}

const optionUnstyledClasses: OptionUnstyledClasses = generateUtilityClasses('MuiOption', [
  'root',
  'disabled',
  'selected',
  'highlighted',
]);

export default optionUnstyledClasses;

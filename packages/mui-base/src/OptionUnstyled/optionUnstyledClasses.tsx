import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface OptionUnstyledClasses {
  root: string;
  disabled: string;
  selected: string;
  highlighted: string;
}

export type OptionUnstyledClassKey = keyof OptionUnstyledClasses;

export function getOptionUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseOption', slot);
}

const optionUnstyledClasses: OptionUnstyledClasses = generateUtilityClasses('BaseOption', [
  'root',
  'disabled',
  'selected',
  'highlighted',
]);

export default optionUnstyledClasses;

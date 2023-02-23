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
  return generateUtilityClass('MuiOption', slot);
}

const optionUnstyledClasses: OptionUnstyledClasses = generateUtilityClasses('MuiOption', [
  'root',
  'disabled',
  'selected',
  'highlighted',
]);

export default optionUnstyledClasses;

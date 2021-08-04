import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface ButtonUnstyledClasses {
  root: string;
  focusVisible: string;
  disabled: string;
}

export type ButtonUnstyledClassKey = keyof ButtonUnstyledClasses;

export function getButtonUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('ButtonUnstyled', slot);
}

const buttonUnstyledClasses: ButtonUnstyledClasses = generateUtilityClasses('ButtonUnstyled', [
  'root',
  'focusVisible',
  'disabled',
]);

export default buttonUnstyledClasses;

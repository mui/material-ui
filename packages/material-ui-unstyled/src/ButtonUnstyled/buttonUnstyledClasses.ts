import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ButtonUnstyledClasses {
  root: string;
  focusVisible: string;
}

export type ButtonUnstyledClassKey = keyof ButtonUnstyledClasses;

export function getButtonUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('ButtonUnstyled', slot);
}

const buttonUnstyledClasses: ButtonUnstyledClasses = generateUtilityClasses('ButtonUnstyled', [
  'root',
  'focusVisible',
]);

export default buttonUnstyledClasses;

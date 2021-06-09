import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ButtonUnstyledClasses {
  root: string;
}

export type ButtonUnstyledClassKey = keyof ButtonUnstyledClasses;

export function getButtonUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('ButtonUnstyled', slot);
}

const buttonUnstyledClasses: ButtonUnstyledClasses = generateUtilityClasses('ButtonUnstyled', [
  'root'
]);

export default buttonUnstyledClasses;

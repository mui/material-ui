import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface ButtonUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type ButtonUnstyledClassKey = keyof ButtonUnstyledClasses;

export function getButtonUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonUnstyledClasses: ButtonUnstyledClasses = generateUtilityClasses('MuiButton', [
  'root',
  'active',
  'disabled',
  'focusVisible',
]);

export default buttonUnstyledClasses;

import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface DialogActionsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disableSpacing={true}`. */
  spacing: string;
}

export type DialogActionsClassKey = keyof DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogActions', slot);
}

const dialogActionsClasses: DialogActionsClasses = generateUtilityClasses('MuiDialogActions', [
  'root',
  'spacing',
]);

export default dialogActionsClasses;

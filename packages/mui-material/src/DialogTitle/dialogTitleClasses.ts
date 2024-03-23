import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface DialogTitleClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DialogTitleClassKey = keyof DialogTitleClasses;

export function getDialogTitleUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogTitle', slot);
}

const dialogTitleClasses: DialogTitleClasses = generateUtilityClasses('MuiDialogTitle', ['root']);

export default dialogTitleClasses;

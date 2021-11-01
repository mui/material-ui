import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface DialogTitleClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DialogTitleClassKey = keyof DialogTitleClasses;

export function getDialogTitleUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDialogTitle', slot);
}

export const getDialogTitleClasses = (): DialogTitleClasses =>
  generateUtilityClasses('MuiDialogTitle', ['root']);

const dialogTitleClasses = getDialogTitleClasses();

export default dialogTitleClasses;

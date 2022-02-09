import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListClassKey = keyof ListClasses;

export function getListUtilityClass(slot: string): string {
  return generateUtilityClass('MuiList', slot);
}

const listClasses: ListClasses = generateUtilityClasses('MuiList', ['root']);

export default listClasses;

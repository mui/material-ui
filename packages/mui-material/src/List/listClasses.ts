import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ListClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disablePadding={true}`. */
  padding: string;
  /** Styles applied to the root element if dense. */
  dense: string;
  /** Styles applied to the root element if a `subheader` is provided. */
  subheader: string;
}

export type ListClassKey = keyof ListClasses;

export function getListUtilityClass(slot: string): string {
  return generateUtilityClass('MuiList', slot);
}

export const getListClasses = (): ListClasses => generateUtilityClasses('MuiList', [
  'root',
  'padding',
  'dense',
  'subheader',
]);

const listClasses = getListClasses();

export default listClasses;

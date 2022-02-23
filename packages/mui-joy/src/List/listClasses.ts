import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ListClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type ListClassKey = keyof ListClasses;

export function getListUtilityClass(slot: string): string {
  return generateUtilityClass('MuiList', slot);
}

const listClasses: ListClasses = generateUtilityClasses('MuiList', [
  'root',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default listClasses;

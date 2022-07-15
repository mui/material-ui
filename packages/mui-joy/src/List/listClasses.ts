import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ListClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if wrapped with nested context. */
  nesting: string;
  /** Styles applied to the root element if `row` is true. */
  row: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type ListClassKey = keyof ListClasses;

export function getListUtilityClass(slot: string): string {
  return generateUtilityClass('JoyList', slot);
}

const listClasses: ListClasses = generateUtilityClasses('JoyList', [
  'root',
  'nesting',
  'row',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default listClasses;

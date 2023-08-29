import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionGroupClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type AccordionGroupClassKey = keyof AccordionGroupClasses;

export function getAccordionGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionGroup', slot);
}

const accordionGroupClasses: AccordionGroupClasses = generateUtilityClasses('MuiAccordionGroup', [
  'root',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default accordionGroupClasses;

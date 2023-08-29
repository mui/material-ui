import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionGroupClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type AccordionGroupClassKey = keyof AccordionGroupClasses;

export function getAccordionGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionGroup', slot);
}

const accordionGroupClasses: AccordionGroupClasses = generateUtilityClasses('MuiAccordionGroup', [
  'root',
]);

export default accordionGroupClasses;

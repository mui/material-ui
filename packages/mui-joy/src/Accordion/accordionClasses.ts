import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses('MuiAccordion', ['root']);

export default accordionClasses;

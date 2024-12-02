import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `expanded` is true. */
  expanded: string;
  /** Class name applied to the root element if `disabled` is true. */
  disabled: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses('MuiAccordion', [
  'root',
  'expanded',
  'disabled',
]);

export default accordionClasses;

import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionDetailsClasses {
  /** Class name applied to the root element. */
  root: string;
  expanded: string;
}

export type AccordionDetailsClassKey = keyof AccordionDetailsClasses;

export function getAccordionDetailsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionDetails', slot);
}

const accordionDetailsClasses: AccordionDetailsClasses = generateUtilityClasses(
  'MuiAccordionDetails',
  ['root', 'expanded'],
);

export default accordionDetailsClasses;

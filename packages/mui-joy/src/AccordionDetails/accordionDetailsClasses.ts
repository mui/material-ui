import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionDetailsClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the content element. */
  content: string;
  /** Class name applied to the root element when expanded. */
  expanded: string;
}

export type AccordionDetailsClassKey = keyof AccordionDetailsClasses;

export function getAccordionDetailsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionDetails', slot);
}

const accordionDetailsClasses: AccordionDetailsClasses = generateUtilityClasses(
  'MuiAccordionDetails',
  ['root', 'content', 'expanded'],
);

export default accordionDetailsClasses;

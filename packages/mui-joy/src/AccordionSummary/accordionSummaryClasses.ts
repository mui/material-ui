import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionSummaryClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the button element. */
  button: string;
  /** Class name applied when the accordion is expanded. */
  expanded: string;
}

export type AccordionSummaryClassKey = keyof AccordionSummaryClasses;

export function getAccordionSummaryUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionSummary', slot);
}

const accordionSummaryClasses: AccordionSummaryClasses = generateUtilityClasses(
  'MuiAccordionSummary',
  ['root', 'button', 'expanded'],
);

export default accordionSummaryClasses;

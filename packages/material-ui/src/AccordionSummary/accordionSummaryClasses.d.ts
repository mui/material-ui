import { AccordionSummaryClassKey } from './AccordionSummary';

export type AccordionSummaryClasses = Record<AccordionSummaryClassKey, string>;

declare const accordionSummaryClasses: AccordionSummaryClasses;

export function getAccordionSummaryUtilityClass(slot: string): string;

export default accordionSummaryClasses;

import { AccordionDetailsClassKey } from './AccordionDetails';

export type AccordionDetailsClasses = Record<AccordionDetailsClassKey, string>;

declare const accordionDetailsClasses: AccordionDetailsClasses;

export function getAccordionDetailsUtilityClass(slot: string): string;

export default accordionDetailsClasses;

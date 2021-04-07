import { AccordionClassKey } from './Accordion';

export type AccordionClasses = Record<AccordionClassKey, string>;

declare const accordionClasses: AccordionClasses;

export function getAccordionUtilityClass(slot: string): string;

export default accordionClasses;

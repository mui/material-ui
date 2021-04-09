import { AccordionActionsClassKey } from './AccordionActions';

export type AccordionActionsClasses = Record<AccordionActionsClassKey, string>;

declare const accordionActionsClasses: AccordionActionsClasses;

export function getAccordionActionsUtilityClass(slot: string): string;

export default accordionActionsClasses;

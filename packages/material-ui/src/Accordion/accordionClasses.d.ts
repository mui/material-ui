export interface AccordionClasses {
  root: string;
  rounded: string;
  expanded: string;
  disabled: string;
  gutters: string;
  region: string;
}

declare const accordionClasses: AccordionClasses;

export function getAccordionUtilityClass(slot: string): string;

export default accordionClasses;

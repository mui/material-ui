import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface AccordionDetailsClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AccordionDetailsClassKey = keyof AccordionDetailsClasses;

export function getAccordionDetailsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionDetails', slot);
}

export const getAccordionDetailsClasses = (): AccordionDetailsClasses =>
  generateUtilityClasses('MuiAccordionDetails', ['root']);

const accordionDetailsClasses = getAccordionDetailsClasses();

export default accordionDetailsClasses;

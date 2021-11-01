import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface AccordionActionsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disableSpacing={true}`. */
  spacing: string;
}

export type AccordionActionsClassKey = keyof AccordionActionsClasses;

export function getAccordionActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionActions', slot);
}

export const getAccordionActionsClasses = (): AccordionActionsClasses =>
  generateUtilityClasses('MuiAccordionActions', ['root', 'spacing']);

const accordionActionsClasses = getAccordionActionsClasses();

export default accordionActionsClasses;

import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface AccordionDetailsClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AccordionDetailsClassKey = keyof AccordionDetailsClasses;

export function getAccordionDetailsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionDetails', slot);
}

const accordionDetailsClasses: AccordionDetailsClasses = generateUtilityClasses(
  'MuiAccordionDetails',
  ['root'],
);

export default accordionDetailsClasses;

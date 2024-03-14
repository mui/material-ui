import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

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

const accordionActionsClasses: AccordionActionsClasses = generateUtilityClasses(
  'MuiAccordionActions',
  ['root', 'spacing'],
);

export default accordionActionsClasses;

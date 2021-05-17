import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface AccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** Pseudo-class applied to the root element if `expanded={true}`. */
  expanded: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the region element, the container of the children. */
  region: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses('MuiAccordion', [
  'root',
  'rounded',
  'expanded',
  'disabled',
  'gutters',
  'region',
]);

export default accordionClasses;

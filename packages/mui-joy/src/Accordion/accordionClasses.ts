import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AccordionClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `expanded` is true. */
  expanded: string;
  /** Class name applied to the root element if `disabled` is true. */
  disabled: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses('MuiAccordion', [
  'root',
  'expanded',
  'disabled',
]);

export type AccordionCssVars = {
  /**
   * CSS variable for the Acccordion's panel height.
   * @deprecated Please use alternative.
   * */
  accordionPanelHeight: string;
  /** CSS variable for the Acccordion's panel height. */
  accordionPanelWidth: string;
}

export const accordionCssVars: AccordionCssVars = {
  accordionPanelHeight: '--accordion-panel-height',
  accordionPanelWidth: '--accordion-panel-width',
};


export default accordionClasses;

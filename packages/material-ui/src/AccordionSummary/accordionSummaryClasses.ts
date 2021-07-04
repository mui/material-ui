import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface AccordionSummaryClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
  expanded: string;
  /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the children wrapper element unless `disableGutters={true}`. */
  contentGutters: string;
  /** Styles applied to the children wrapper element. */
  content: string;
  /** Styles applied to the `expandIcon`'s wrapper element. */
  expandIconWrapper: string;
}

export type AccordionSummaryClassKey = keyof AccordionSummaryClasses;

export function getAccordionSummaryUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordionSummary', slot);
}

const accordionSummaryClasses: AccordionSummaryClasses = generateUtilityClasses(
  'MuiAccordionSummary',
  [
    'root',
    'expanded',
    'focusVisible',
    'disabled',
    'gutters',
    'contentGutters',
    'content',
    'expandIconWrapper',
  ],
);

export default accordionSummaryClasses;

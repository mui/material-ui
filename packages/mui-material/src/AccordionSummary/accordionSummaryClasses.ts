import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AccordionSummaryClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
  expanded: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /**
   * Styles applied to the children wrapper element unless `disableGutters={true}`.
   * @deprecated Combine the [.MuiAccordionSummary-gutters](/material-ui/api/accordion-summary/#AccordionSummary-classes-gutters) and [.MuiAccordionSummary-content](/material-ui/api/accordion-summary/#AccordionSummary-classes-content) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
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

import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAccordionSummaryUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionSummary', slot);
}

const accordionSummaryClasses = generateUtilityClasses('MuiAccordionSummary', [
  'root',
  'expanded',
  'focusVisible',
  'disabled',
  'content',
  'expandIconWrapper',
]);

export default accordionSummaryClasses;

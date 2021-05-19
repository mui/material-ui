import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAccordionUtilityClass(slot) {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses = generateUtilityClasses('MuiAccordion', [
  'root',
  'rounded',
  'expanded',
  'disabled',
  'gutters',
  'region',
]);

export default accordionClasses;

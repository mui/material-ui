import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAccordionActionsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionActions', slot);
}

const accordionActionsClasses = generateUtilityClasses('MuiAccordionActions', ['root', 'spacing']);

export default accordionActionsClasses;

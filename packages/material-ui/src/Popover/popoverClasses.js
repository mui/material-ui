import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPopoverUtilityClass(slot) {
  return generateUtilityClass('MuiPopover', slot);
}

const popoverClasses = generateUtilityClasses('MuiPopover', ['root', 'paper']);

export default popoverClasses;

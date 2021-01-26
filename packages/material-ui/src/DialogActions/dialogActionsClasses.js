import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass('MuiDialogActions', slot);
}

const dialogActionsClasses = generateUtilityClasses('MuiDialogActions', ['root', 'spacing']);

export default dialogActionsClasses;

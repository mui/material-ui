import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getDialogContentTextUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContentText', slot);
}

const dialogContentTextClasses = generateUtilityClasses('MuiDialogContentText', ['root']);

export default dialogContentTextClasses;

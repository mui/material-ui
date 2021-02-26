import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbarContent', slot);
}

const snackbarContentClasses = generateUtilityClasses('MuiSnackbarContent', [
  'root',
  'message',
  'action',
]);

export default snackbarContentClasses;

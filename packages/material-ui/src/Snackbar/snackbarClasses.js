import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSnackbarUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbar', slot);
}

const snackbarClasses = generateUtilityClasses('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);

export default snackbarClasses;

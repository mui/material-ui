import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface SnackbarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
  anchorOriginTopCenter: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
  anchorOriginBottomCenter: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
}

export type SnackbarClassKey = keyof SnackbarClasses;

export function getSnackbarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSnackbar', slot);
}

const snackbarClasses: SnackbarClasses = generateUtilityClasses('MuiSnackbar', [
  'root',
  'anchorOriginTopCenter',
  'anchorOriginBottomCenter',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
]);

export default snackbarClasses;

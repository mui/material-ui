import { SnackbarClassKey } from './Snackbar';

export type SnackbarClasses = Record<SnackbarClassKey, string>;

declare const snackbarClasses: SnackbarClasses;

export function getSnackbarUtilityClass(slot: string): string;

export default snackbarClasses;

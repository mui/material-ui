import { SnackbarContentClassKey } from './SnackbarContent';

export type SnackbarContentClasses = Record<SnackbarContentClassKey, string>;

declare const snackbarContentClasses: SnackbarContentClasses;

export function getSnackbarContentUtilityClass(slot: string): string;

export default snackbarContentClasses;

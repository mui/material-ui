import { AlertClassKey } from './Alert';

export type AlertClasses = Record<AlertClassKey, string>;

declare const alertClasses: AlertClasses;

export function getAlertUtilityClass(slot: string): string;

export default alertClasses;

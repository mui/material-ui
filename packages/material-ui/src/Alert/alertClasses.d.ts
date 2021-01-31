import { AlertProps } from './Alert';

export type AlertClasses = AlertProps['classes'];

declare const alertClasses: AlertClasses;

export function getAlertUtilityClass(slot: string): string;

export default alertClasses;

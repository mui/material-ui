import { AlertTitleClassKey } from './AlertTitle';

export type AlertTitleClasses = Record<AlertTitleClassKey, string>;

declare const alertTitleClasses: AlertTitleClasses;

export function getAlertTitleUtilityClass(slot: string): string;

export default alertTitleClasses;

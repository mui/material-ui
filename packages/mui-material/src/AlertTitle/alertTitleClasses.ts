import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface AlertTitleClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AlertTitleClassKey = keyof AlertTitleClasses;

export function getAlertTitleUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAlertTitle', slot);
}

export const getAlertTitleClasses = (): AlertTitleClasses =>
  generateUtilityClasses('MuiAlertTitle', ['root']);

const alertTitleClasses = getAlertTitleClasses();

export default alertTitleClasses;

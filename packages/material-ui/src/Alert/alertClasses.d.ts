export interface AlertClasses {
  root: string;
  action: string;
  icon: string;
  message: string;
  filledSuccess: string;
  filledInfo: string;
  filledWarning: string;
  filledError: string;
  outlinedSuccess: string;
  outlinedInfo: string;
  outlinedWarning: string;
  outlinedError: string;
  standardSuccess: string;
  standardInfo: string;
  standardWarning: string;
  standardError: string;
}

declare const alertClasses: AlertClasses;

export function getAlertUtilityClass(slot: string): string;

export default alertClasses;

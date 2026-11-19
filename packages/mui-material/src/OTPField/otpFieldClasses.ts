import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface OTPFieldClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type OTPFieldClassKey = keyof OTPFieldClasses;

export function getOTPFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOTPField', slot);
}

const otpFieldClasses: OTPFieldClasses = generateUtilityClasses('MuiOTPField', ['root']);

export default otpFieldClasses;

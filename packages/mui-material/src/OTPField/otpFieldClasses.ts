import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface OTPFieldClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the field label. */
  label: string;
  /** Styles applied to the group of character inputs. */
  group: string;
  /** Styles applied to each character input. */
  input: string;
  /** Styles applied to each decorative separator. */
  separator: string;
  /** Styles applied to the supporting or error text. */
  helperText: string;
}

export type OTPFieldClassKey = keyof OTPFieldClasses;

export function getOTPFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOTPField', slot);
}

const otpFieldClasses: OTPFieldClasses = generateUtilityClasses('MuiOTPField', [
  'root',
  'label',
  'group',
  'input',
  'separator',
  'helperText',
]);

export default otpFieldClasses;

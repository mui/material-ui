export { default } from './OTPField';
export { default as OTPFieldInput } from '../OTPFieldInput';
export type { OTPFieldInputProps } from '../OTPFieldInput';
export { default as OTPFieldSeparator } from '../OTPFieldSeparator';
export type { OTPFieldSeparatorProps } from '../OTPFieldSeparator';
export type * from './OTPField.types';

export { default as otpFieldClasses } from './otpFieldClasses';
export * from './otpFieldClasses';

export {
  OTPFieldRootDataAttributes,
  OTPFieldInputDataAttributes,
  OTPFieldSeparatorDataAttributes,
} from '@base-ui/react/otp-field';
export type {
  OTPFieldRootChangeEventDetails as OTPFieldChangeEventDetails,
  OTPFieldRootCompleteEventDetails as OTPFieldCompleteEventDetails,
  OTPFieldRootInvalidEventDetails as OTPFieldInvalidEventDetails,
} from '@base-ui/react/otp-field';

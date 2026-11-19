import type { OTPFieldClasses } from './otpFieldClasses';

export interface OTPFieldProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<OTPFieldClasses> | undefined;
  /**
   * A CSS class name applied to the root element.
   */
  className?: string | undefined;
}

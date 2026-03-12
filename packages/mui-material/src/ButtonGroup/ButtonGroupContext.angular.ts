import { Injectable } from '@angular/core';

export type ButtonGroupColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | string;

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export type ButtonGroupSize = 'small' | 'medium' | 'large' | string;

export type ButtonGroupVariant = 'contained' | 'outlined' | 'text' | string;

export interface ButtonGroupContextType {
  className?: string;
  color?: ButtonGroupColor;
  disabled?: boolean;
  disableElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonGroupSize;
  variant?: ButtonGroupVariant;
}

/**
 * Angular service equivalent of React's ButtonGroupContext.
 *
 * Provided at the ButtonGroupComponent level so each ButtonGroup instance
 * has its own context scope. Child Button components inject this service
 * (with @Optional()) to receive shared group-level props.
 *
 * React equivalent:
 *   const ButtonGroupContext = React.createContext<ButtonGroupContextType>({});
 *   <ButtonGroupContext.Provider value={context}>...</ButtonGroupContext.Provider>
 */
@Injectable()
export class ButtonGroupContextService implements ButtonGroupContextType {
  className = '';
  color: ButtonGroupColor = 'primary';
  disabled = false;
  disableElevation = false;
  disableFocusRipple = false;
  disableRipple = false;
  fullWidth = false;
  size: ButtonGroupSize = 'medium';
  variant: ButtonGroupVariant = 'outlined';
}

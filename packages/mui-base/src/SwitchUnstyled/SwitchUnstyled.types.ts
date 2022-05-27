import { Simplify } from '@mui/types';
import { UseSwitchInputSlotProps, UseSwitchParameters } from './useSwitch.types';

export interface SwitchUnstyledComponentsPropsOverrides {}

export interface SwitchUnstyledProps extends UseSwitchParameters {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Switch.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Thumb?: React.ElementType;
    Input?: React.ElementType;
    Track?: React.ElementType | null;
  };

  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps?: {
    root?: React.HTMLAttributes<HTMLSpanElement> & SwitchUnstyledComponentsPropsOverrides;
    thumb?: React.HTMLAttributes<HTMLSpanElement> & SwitchUnstyledComponentsPropsOverrides;
    input?: React.InputHTMLAttributes<HTMLInputElement> & SwitchUnstyledComponentsPropsOverrides;
    track?: React.HTMLAttributes<HTMLSpanElement> & SwitchUnstyledComponentsPropsOverrides;
  };
}

export type SwitchUnstyledOwnerState = Simplify<
  SwitchUnstyledProps & {
    checked: boolean;
    disabled: boolean;
    focusVisible: boolean;
    readOnly: boolean;
  }
>;

export type SwitchUnstyledRootSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledThumbSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledTrackSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledInputSlotProps = Simplify<
  UseSwitchInputSlotProps & {
    ownerState: SwitchUnstyledOwnerState;
    className: string;
    children?: React.ReactNode;
  }
>;

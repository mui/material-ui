import { OverrideProps, Simplify } from '@mui/types';
import { SlotComponentProps } from '../utils';
import { UseSwitchInputSlotProps, UseSwitchParameters } from '@mui/base/useSwitch';

export interface SwitchUnstyledComponentsPropsOverrides {}

export interface SwitchUnstyledOwnProps extends UseSwitchParameters {
  /**
   * Class name applied to the root element.
   */
  className?: string;
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
    root?: SlotComponentProps<
      'span',
      SwitchUnstyledComponentsPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    thumb?: SlotComponentProps<
      'span',
      SwitchUnstyledComponentsPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    input?: SlotComponentProps<
      'input',
      SwitchUnstyledComponentsPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    track?: SlotComponentProps<
      'span',
      SwitchUnstyledComponentsPropsOverrides,
      SwitchUnstyledOwnerState
    >;
  };
}

export interface SwitchUnstyledTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & SwitchUnstyledOwnProps;
  defaultComponent: D;
}

export type SwitchUnstyledProps<
  D extends React.ElementType = SwitchUnstyledTypeMap['defaultComponent'],
> = OverrideProps<SwitchUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};

export type SwitchUnstyledOwnerState = Simplify<
  SwitchUnstyledOwnProps & {
    checked: boolean;
    disabled: boolean;
    focusVisible: boolean;
    readOnly: boolean;
  }
>;

export type SwitchUnstyledRootSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className?: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledThumbSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className?: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledTrackSlotProps = {
  ownerState: SwitchUnstyledOwnerState;
  className?: string;
  children?: React.ReactNode;
};

export type SwitchUnstyledInputSlotProps = Simplify<
  UseSwitchInputSlotProps & {
    ownerState: SwitchUnstyledOwnerState;
    className?: string;
    children?: React.ReactNode;
  }
>;

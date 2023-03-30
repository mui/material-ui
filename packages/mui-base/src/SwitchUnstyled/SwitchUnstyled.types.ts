import { OverrideProps, Simplify } from '@mui/types';
import { SlotComponentProps } from '../utils';
import { UseSwitchInputSlotProps, UseSwitchParameters } from '../useSwitch';

export interface SwitchUnstyledRootSlotPropsOverrides {}
export interface SwitchUnstyledThumbSlotPropsOverrides {}
export interface SwitchUnstyledInputSlotPropsOverrides {}
export interface SwitchUnstyledTrackSlotPropsOverrides {}

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
  slots?: SwitchUnstyledSlots;
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'span',
      SwitchUnstyledRootSlotPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    thumb?: SlotComponentProps<
      'span',
      SwitchUnstyledThumbSlotPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    input?: SlotComponentProps<
      'input',
      SwitchUnstyledInputSlotPropsOverrides,
      SwitchUnstyledOwnerState
    >;
    track?: SlotComponentProps<
      'span',
      SwitchUnstyledTrackSlotPropsOverrides,
      SwitchUnstyledOwnerState
    >;
  };
}

export interface SwitchUnstyledSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the thumb.
   * @default 'span'
   */
  thumb?: React.ElementType;
  /**
   * The component that renders the track.
   * @default 'span'
   */
  track?: React.ElementType | null;
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

import { OverrideProps, Simplify } from '@mui/types';
import { FormControlState } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputRootSlotProps,
  UseNumberInputIncrementButtonSlotProps,
  UseNumberInputDecrementButtonSlotProps,
} from './useNumberInput.types';
import { SlotComponentProps } from '../utils';

export interface NumberInputUnstyledRootSlotPropsOverrides {}
export interface NumberInputUnstyledInputSlotPropsOverrides {}
export interface NumberInputUnstyledIncrementButtonSlotPropsOverrides {}
export interface NumberInputUnstyledDecrementButtonSlotPropsOverrides {}

export type NumberInputUnstyledOwnProps = Omit<UseNumberInputParameters, 'error'> & {
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   */
  error?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'div',
      NumberInputUnstyledRootSlotPropsOverrides,
      NumberInputUnstyledOwnerState
    >;
    input?: SlotComponentProps<
      'input',
      NumberInputUnstyledInputSlotPropsOverrides,
      NumberInputUnstyledOwnerState
    >;
    incrementButton?: SlotComponentProps<
      'button',
      NumberInputUnstyledIncrementButtonSlotPropsOverrides,
      NumberInputUnstyledOwnerState
    >;
    decrementButton?: SlotComponentProps<
      'button',
      NumberInputUnstyledDecrementButtonSlotPropsOverrides,
      NumberInputUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    input?: React.ElementType;
    incrementButton?: React.ElementType;
    decrementButton?: React.ElementType;
  };
};

export interface NumberInputUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & NumberInputUnstyledOwnProps;
  defaultComponent: D;
}

export type NumberInputUnstyledProps<
  D extends React.ElementType = NumberInputUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<NumberInputUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type NumberInputUnstyledOwnerState = Simplify<
  Omit<NumberInputUnstyledProps, 'component' | 'slots' | 'slotProps'> & {
    formControlContext: FormControlState | undefined;
    focused: boolean;
  }
>;

export type NumberInputUnstyledRootSlotProps = Simplify<
  UseNumberInputRootSlotProps & {
    ownerState: NumberInputUnstyledOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export type NumberInputUnstyledInputSlotProps = Simplify<
  Omit<UseNumberInputRootSlotProps, 'onClick'> & {
    id: string | undefined;
    ownerState: NumberInputUnstyledOwnerState;
    placeholder: string | undefined;
    ref: React.Ref<HTMLInputElement>;
  }
>;

export type NumberInputUnstyledIncrementButtonSlotProps = Simplify<
  UseNumberInputIncrementButtonSlotProps & {
    ownerState: NumberInputUnstyledOwnerState;
  }
>;

export type NumberInputUnstyledDecrementButtonSlotProps = Simplify<
  UseNumberInputDecrementButtonSlotProps & {
    ownerState: NumberInputUnstyledOwnerState;
  }
>;

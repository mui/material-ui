import { Simplify } from '@mui/types';
import { FormControlState } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputRootSlotProps,
  UseNumberInputIncrementButtonSlotProps,
  UseNumberInputDecrementButtonSlotProps,
} from '../unstable_useNumberInput/useNumberInput.types';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface NumberInputRootSlotPropsOverrides {}
export interface NumberInputInputSlotPropsOverrides {}
export interface NumberInputStepperButtonSlotPropsOverrides {}

export type NumberInputOwnProps = Omit<
  UseNumberInputParameters,
  'error' | 'inputId' | 'inputRef'
> & {
  /**
   * Trailing adornment for this input.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   */
  error?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', NumberInputRootSlotPropsOverrides, NumberInputOwnerState>;
    input?: SlotComponentProps<'input', NumberInputInputSlotPropsOverrides, NumberInputOwnerState>;
    incrementButton?: SlotComponentProps<
      'button',
      NumberInputStepperButtonSlotPropsOverrides,
      NumberInputOwnerState
    >;
    decrementButton?: SlotComponentProps<
      'button',
      NumberInputStepperButtonSlotPropsOverrides,
      NumberInputOwnerState
    >;
  };
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: NumberInputSlots;
  /**
   * Leading adornment for this input.
   */
  startAdornment?: React.ReactNode;
};

export interface NumberInputSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the increment button.
   * @default 'button'
   */
  incrementButton?: React.ElementType;
  /**
   * The component that renders the decrement button.
   * @default 'button'
   */
  decrementButton?: React.ElementType;
}

export interface NumberInputTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: AdditionalProps & NumberInputOwnProps;
  defaultComponent: RootComponentType;
}

export type NumberInputProps<
  RootComponentType extends React.ElementType = NumberInputTypeMap['defaultComponent'],
> = PolymorphicProps<NumberInputTypeMap<{}, RootComponentType>, RootComponentType>;

export type NumberInputOwnerState = Simplify<
  NumberInputOwnProps & {
    formControlContext: FormControlState | undefined;
    focused: boolean;
    isIncrementDisabled: boolean;
    isDecrementDisabled: boolean;
  }
>;

export type NumberInputRootSlotProps = Simplify<
  UseNumberInputRootSlotProps & {
    ownerState: NumberInputOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<Element>;
  }
>;

export type NumberInputInputSlotProps = Simplify<
  Omit<UseNumberInputRootSlotProps, 'onClick'> & {
    id: string | undefined;
    ownerState: NumberInputOwnerState;
    placeholder: string | undefined;
    ref: React.Ref<HTMLInputElement>;
  }
>;

export type NumberInputIncrementButtonSlotProps = Simplify<
  UseNumberInputIncrementButtonSlotProps & {
    ownerState: NumberInputOwnerState;
  }
>;

export type NumberInputDecrementButtonSlotProps = Simplify<
  UseNumberInputDecrementButtonSlotProps & {
    ownerState: NumberInputOwnerState;
  }
>;

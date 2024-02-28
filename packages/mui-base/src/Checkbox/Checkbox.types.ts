import { Simplify } from '@mui/types';
import { PolymorphicProps, SlotComponentProps } from '../utils';
import { UseCheckboxInputSlotProps, UseCheckboxParameters } from '../useCheckbox';

export interface CheckboxRootSlotPropsOverrides {}
export interface CheckboxInputSlotPropsOverrides {}

export interface CheckboxOwnProps extends UseCheckboxParameters {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The components used for each slot inside the Checkbox.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: CheckboxSlots;
  /**
   * The props used for each slot inside the Checkbox.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'span', CheckboxRootSlotPropsOverrides, CheckboxOwnerState>;
    input?: SlotComponentProps<'input', CheckboxInputSlotPropsOverrides, CheckboxOwnerState>;
  };
}

export interface CheckboxSlots {
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
}

export interface CheckboxTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: CheckboxOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type CheckboxProps<
  RootComponentType extends React.ElementType = CheckboxTypeMap['defaultComponent'],
> = PolymorphicProps<CheckboxTypeMap<{}, RootComponentType>, RootComponentType>;

export type CheckboxOwnerState = Simplify<
  CheckboxOwnProps & {
    checked: boolean;
    disabled: boolean;
    focusVisible: boolean;
    readOnly: boolean;
  }
>;

export type CheckboxRootSlotProps = {
  ownerState: CheckboxOwnerState;
  className?: string;
  children?: React.ReactNode;
};

export type CheckboxInputSlotProps = Simplify<
  UseCheckboxInputSlotProps & {
    ownerState: CheckboxOwnerState;
    className?: string;
    children?: React.ReactNode;
  }
>;

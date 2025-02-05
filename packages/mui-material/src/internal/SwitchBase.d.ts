import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';
import { SwitchBaseClasses } from './switchBaseClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

interface SwitchBaseSlots {
  /**
   * The component that renders the root slot.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the input slot.
   * @default 'input'
   */
  input: React.ElementType;
}

type SwitchBaseSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SwitchBaseSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [ButtonBase](https://mui.com/material-ui/api/button-base/#props) component.
     */
    root: SlotProps<React.ElementType<ButtonBaseProps>, {}, SwitchBaseOwnerState>;
    /**
     * Props forwarded to the input slot.
     */
    input: SlotProps<'input', {}, SwitchBaseOwnerState>;
  }
>;

export interface SwitchBaseProps
  extends StandardProps<ButtonBaseProps, 'children' | 'onChange' | 'type' | 'value'>,
    SwitchBaseSlotsAndSlotProps {
  autoFocus?: boolean;
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  checkedIcon: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchBaseClasses>;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false;
  icon: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   * @deprecated Use `slotProps.input.ref` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputRef?: React.Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: boolean;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

export interface SwitchBaseOwnerState extends Omit<SwitchBaseProps, 'slots' | 'slotProps'> {}

declare const SwitchBase: React.JSXElementConstructor<SwitchBaseProps>;

export default SwitchBase;

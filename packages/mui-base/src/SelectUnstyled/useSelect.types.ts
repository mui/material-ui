import * as React from 'react';
import { UseButtonRootSlotProps } from '../ButtonUnstyled';
import {
  OptionState,
  UseListboxOptionSlotProps,
  UseListboxRootSlotProps,
} from '../ListboxUnstyled';
import { EventHandlers } from '../utils/types';

export interface SelectOption<TValue> {
  value: TValue;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectOptionGroup<TValue> {
  options: SelectChild<TValue>[];
  label: React.ReactNode;
  disabled?: boolean;
}

export type SelectChild<TValue> = SelectOption<TValue> | SelectOptionGroup<TValue>;

export function isOptionGroup<TValue>(
  child: SelectChild<TValue>,
): child is SelectOptionGroup<TValue> {
  return !!(child as SelectOptionGroup<TValue>).options;
}

interface UseSelectCommonProps<TValue> {
  buttonRef?: React.Ref<Element>;
  disabled?: boolean;
  listboxId?: string;
  listboxRef?: React.Ref<Element>;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  options: SelectOption<TValue>[];
  optionStringifier?: (option: SelectOption<TValue>) => string;
}

export interface UseSelectSingleParameters<TValue> extends UseSelectCommonProps<TValue> {
  defaultValue?: TValue | null;
  multiple?: false;
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: TValue | null,
  ) => void;
  value?: TValue | null;
}

export interface UseSelectMultiParameters<TValue> extends UseSelectCommonProps<TValue> {
  defaultValue?: TValue[];
  multiple: true;
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: TValue[],
  ) => void;
  value?: TValue[];
}

export type UseSelectParameters<TValue> =
  | UseSelectSingleParameters<TValue>
  | UseSelectMultiParameters<TValue>;

interface UseSelectButtonSlotEventHandlers {
  onClick: React.MouseEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler<HTMLElement>;
}

export type UseSelectButtonSlotProps<TOther = {}> = UseButtonRootSlotProps<
  Omit<TOther, keyof UseSelectButtonSlotEventHandlers> & UseSelectButtonSlotEventHandlers
> & {
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  'aria-haspopup': React.AriaAttributes['aria-haspopup'];
};

interface UseSelectListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyUp: React.KeyboardEventHandler;
}

export type UseSelectListboxSlotProps<TOther = {}> = UseListboxRootSlotProps<
  Omit<TOther, keyof UseSelectListboxSlotEventHandlers> & UseSelectListboxSlotEventHandlers
>;

interface UseSelectOptionSlotEventHandlers {
  onClick: React.MouseEventHandler;
}

export type UseSelectOptionSlotProps<TOther = {}> = UseListboxOptionSlotProps<
  Omit<TOther, keyof UseSelectOptionSlotEventHandlers> & UseSelectOptionSlotEventHandlers
>;

interface UseSelectCommonResult<TValue> {
  buttonActive: boolean;
  buttonFocusVisible: boolean;
  disabled: boolean;
  getButtonProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSelectButtonSlotProps<TOther>;
  getListboxProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSelectListboxSlotProps<TOther>;
  getOptionProps: <TOther extends EventHandlers = {}>(
    option: SelectOption<TValue>,
    otherHandlers?: TOther,
  ) => UseSelectOptionSlotProps<TOther>;
  getOptionState: (option: SelectOption<TValue>) => OptionState;
  open: boolean;
}

export interface UseSelectSingleResult<TValue> extends UseSelectCommonResult<TValue> {
  value: TValue | null;
}

export interface UseSelectMultiResult<TValue> extends UseSelectCommonResult<TValue> {
  value: TValue[];
}

export interface UseSelectReturnValue<TValue> {
  /**
   * If `true`, the select's button is active (pressed).
   * @default false
   */
  buttonActive: boolean;
  /**
   * If `true`, the select's button is being focused using keyboard.
   * @default false
   */
  buttonFocusVisible: boolean;
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled: boolean;
  /**
   * Resolver for the button slot's props.
   * @param otherHandlers event handlers for the root button slot
   * @returns props that should be spread on the root button slot
   */
  getButtonProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseSelectButtonSlotProps<TOther>;
  /**
   * Resolver for the listbox slot's props.
   * @param otherHandlers event handlers for the listbox slot
   * @returns props that should be spread on the root button slot
   */
  getListboxProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseSelectListboxSlotProps<TOther>;
  /**
   * Resolver for the specified option's props.
   * @param option the select's option for which the props are resolved
   * @param otherHandlers event handlers for the specified option slot
   * @returns props that should be spread on the specified option slot
   */
  getOptionProps: <TOther extends EventHandlers>(
    option: SelectOption<TValue>,
    otherHandlers?: TOther,
  ) => UseSelectOptionSlotProps<TOther>;
  /**
   * Resolver for the specified option's state.
   * @param option the select's option which state is resolved
   * @param otherHandlers event handlers for the specified option slot
   * @returns props that should be spread on the specified option slot
   */
  getOptionState: (option: SelectOption<TValue>) => OptionState;
  /**
   * If `true`, the select dropdown is open.
   * @default false
   */
  open: boolean;
  /**
   * The selected value.
   */
  value: TValue | TValue[] | null;
}

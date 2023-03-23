import * as React from 'react';
import { UseButtonRootSlotProps } from '../useButton';
import { ListState, UseListRootSlotProps } from '../useList';
import { SelectOption } from '../useOption/useOption.types';
import { EventHandlers } from '../utils/types';
import { SelectProviderValue } from './SelectProvider';

export type SelectChangeEventType =
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>
  | React.FocusEvent<Element, Element>
  | null;

export type SelectValue<Value, Multiple> = Multiple extends true ? Value[] : Value | null;

export interface SelectOptionDefinition<Value> {
  value: Value;
  disabled?: boolean;
  label: string;
}

export type UseSelectParameters<TValue, Multiple extends boolean = false> = {
  defaultValue?: SelectValue<TValue, Multiple>;
  disabled?: boolean;
  buttonRef?: React.Ref<Element>;
  listboxId?: string;
  listboxRef?: React.Ref<Element>;
  multiple?: Multiple;
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: SelectValue<TValue, Multiple>,
  ) => void;
  onHighlightChange?: (
    e:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>
      | null,
    highlighted: TValue | null,
  ) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  options?: SelectOptionDefinition<TValue>[];
  optionStringifier?: (option: SelectOption<TValue>) => string;
  value?: SelectValue<TValue, Multiple>;
};

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

export type UseSelectListboxSlotProps<TOther = {}> = UseListRootSlotProps<
  Omit<TOther, keyof UseSelectListboxSlotEventHandlers> & UseSelectListboxSlotEventHandlers
>;

export interface UseSelectResult<TValue, Multiple> {
  buttonActive: boolean;
  buttonFocusVisible: boolean;
  disabled: boolean;
  getButtonProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSelectButtonSlotProps<TOther>;
  getListboxProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSelectListboxSlotProps<TOther>;
  getOptionMetadata: (option: TValue) => SelectOption<TValue> | undefined;
  contextValue: SelectProviderValue<TValue>;
  highlightedOption: TValue | null;
  open: boolean;
  options: TValue[];
  value: SelectValue<TValue, Multiple>;
}

const ACTION_TYPES_BUTTON_CLICK = 'buttonClick';
const ACTION_TYPES_BUTTON_ARROW_KEY_DOWN = 'buttonArrowKeyDown';

export const SelectActionTypes = {
  buttonClick: ACTION_TYPES_BUTTON_CLICK,
  buttonArrowKeyDown: ACTION_TYPES_BUTTON_ARROW_KEY_DOWN,
} as const;

export interface ButtonClickAction {
  type: typeof ACTION_TYPES_BUTTON_CLICK;
  event: React.MouseEvent;
}

export interface ButtonArrowKeyDownAction {
  type: typeof ACTION_TYPES_BUTTON_ARROW_KEY_DOWN;
  event: React.KeyboardEvent;
}

export type SelectAction = ButtonClickAction | ButtonArrowKeyDownAction;

export interface SelectInternalState<TValue> extends ListState<TValue> {
  open: boolean;
}

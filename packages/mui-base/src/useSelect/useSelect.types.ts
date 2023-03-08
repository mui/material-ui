import * as React from 'react';
import { UseButtonRootSlotProps } from '../useButton';
import { OptionState, UseListboxOptionSlotProps, UseListboxRootSlotProps } from '../useListbox';
import { EventHandlers } from '../utils/types';
import { SelectChangeNotifiers } from './useSelectChangeNotifiers';

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

export type SelectChangeEventType =
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>
  | React.FocusEvent<Element, Element>
  | null;

export type SelectValue<Value, Multiple> = Multiple extends true ? Value[] : Value | null;

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
  options: SelectOption<TValue>[];
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

export type UseSelectListboxSlotProps<TOther = {}> = UseListboxRootSlotProps<
  Omit<TOther, keyof UseSelectListboxSlotEventHandlers> & UseSelectListboxSlotEventHandlers
>;

interface UseSelectOptionSlotEventHandlers {
  onClick: React.MouseEventHandler;
}

export type UseSelectOptionSlotProps<TOther = {}> = UseListboxOptionSlotProps<
  Omit<TOther, keyof UseSelectOptionSlotEventHandlers> & UseSelectOptionSlotEventHandlers
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
  contextValue: {
    getOptionProps: <TOther extends EventHandlers = {}>(
      option: TValue,
      otherHandlers?: TOther,
    ) => UseSelectOptionSlotProps<TOther>;
    getOptionState: (option: TValue) => OptionState;
    listboxRef: React.RefObject<HTMLElement>;
    /**
     * Registers a handler for when the highlighted option changes.
     * @param handler A function that will be called with the new highlighted option.
     */
    registerHighlightChangeHandler: SelectChangeNotifiers<TValue>['registerHighlightChangeHandler'];
    /**
     * Registers a handler for when the selection changes.
     * @param handler A function that will be called with the new selected items.
     */
    registerSelectionChangeHandler: SelectChangeNotifiers<TValue>['registerSelectionChangeHandler'];
  };
  highlightedOption: TValue | null;
  open: boolean;
  value: SelectValue<TValue, Multiple>;
}

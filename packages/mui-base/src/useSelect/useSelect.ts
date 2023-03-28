import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import useButton from '../useButton';
import {
  SelectOption,
  SelectValue,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
  UseSelectOptionSlotProps,
  UseSelectParameters,
  UseSelectResult,
} from './useSelect.types';
import useListbox, {
  ListboxReducer,
  defaultListboxReducer,
  ActionTypes,
  UseListboxParameters,
} from '../useListbox';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from '../SelectUnstyled/defaultOptionStringifier';
import useSelectChangeNotifiers from './useSelectChangeNotifiers';

/**
 *
 * Demos:
 *
 * - [Unstyled Select](https://mui.com/base/react-select/#hook)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base/api/use-select/)
 */
function useSelect<TValue, Multiple extends boolean = false>(
  props: UseSelectParameters<TValue, Multiple>,
): UseSelectResult<TValue, Multiple> {
  const {
    buttonRef: buttonRefProp,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false as Multiple,
    onChange,
    onHighlightChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier,
    value: valueProp,
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const listboxId = useId(listboxIdProp);

  let defaultValue: TValue[] | undefined;
  if (valueProp === undefined && defaultValueProp === undefined) {
    defaultValue = [];
  } else if (defaultValueProp !== undefined) {
    defaultValue = multiple ? (defaultValueProp as TValue[]) : [defaultValueProp as TValue];
  }

  const value = React.useMemo(() => {
    if (valueProp !== undefined) {
      return multiple ? (valueProp as TValue[]) : [valueProp as TValue];
    }

    return undefined;
  }, [valueProp, multiple]);

  const optionsMap = React.useMemo(() => {
    const map = new Map<TValue, SelectOption<TValue>>();
    options.forEach((option) => {
      map.set(option.value, option);
    });
    return map;
  }, [options]);

  // prevents closing the listbox on keyUp right after opening it
  const ignoreEnterKeyUp = React.useRef(false);

  // prevents reopening the listbox when button is clicked
  // (listbox closes on lost focus, then immediately reopens on click)
  const ignoreClick = React.useRef(false);

  // Ensure the listbox is focused after opening
  const [listboxFocusRequested, requestListboxFocus] = React.useState(false);

  const focusListboxIfRequested = React.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);

  const handleListboxRef = useForkRef(listboxRefProp, listboxRef, focusListboxIfRequested);

  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
  } = useSelectChangeNotifiers<TValue>();

  React.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);

  React.useEffect(() => {
    requestListboxFocus(open);
  }, [open]);

  const createHandleMouseDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLElement>) => {
      otherHandlers?.onMouseDown?.(event);
      if (!event.defaultPrevented && open) {
        ignoreClick.current = true;
      }
    };

  const createHandleButtonClick =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      otherHandlers?.onClick?.(event);
      if (!event.defaultPrevented && !ignoreClick.current) {
        onOpenChange?.(!open);
      }

      ignoreClick.current = false;
    };

  const createHandleButtonKeyDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter') {
        ignoreEnterKeyUp.current = true;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        onOpenChange?.(true);
      }
    };

  const createHandleListboxKeyUp =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyUp?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const closingKeys = multiple ? ['Escape'] : ['Escape', 'Enter', ' '];

      if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
        buttonRef?.current?.focus();
      }

      ignoreEnterKeyUp.current = false;
    };

  const createHandleListboxItemClick = React.useCallback(
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      otherHandlers?.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (!multiple) {
        onOpenChange?.(false);
      }
    },
    [multiple, onOpenChange],
  );

  const createHandleListboxBlur =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      otherHandlers?.onBlur?.(event);
      if (!event.defaultPrevented) {
        onOpenChange?.(false);
      }
    };

  const listboxReducer: ListboxReducer<TValue> = React.useCallback(
    (state, action) => {
      const newState = defaultListboxReducer<TValue>(state, action);

      switch (action.type) {
        case ActionTypes.keyDown:
          // change selection when listbox is closed
          if (
            (action.event.key === 'ArrowUp' || action.event.key === 'ArrowDown') &&
            !open &&
            !multiple
          ) {
            return {
              ...newState,
              selectedValues: newState.highlightedValue != null ? [newState.highlightedValue] : [],
            };
          }

          break;

        case ActionTypes.blur:
        case ActionTypes.setValue:
        case ActionTypes.optionsChange:
          if(!multiple) {
            return {
              ...newState,
              highlightedValue:
                newState.selectedValues.length > 0 ? newState.selectedValues[0] : null,
            };
          }
          
          break;

        default:
          return newState;
      }

      return newState;
    },
    [open, multiple],
  );

  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
  } = useButton({
    disabled,
    ref: handleButtonRef,
  });

  const optionValues = React.useMemo(() => options.map((o) => o.value), [options]);

  const isOptionDisabled = React.useCallback(
    (valueToCheck: TValue) => {
      const option = optionsMap.get(valueToCheck);
      return option?.disabled ?? false;
    },
    [optionsMap],
  );

  const stringifyOption = React.useCallback(
    (valueToCheck: TValue) => {
      const option = optionsMap.get(valueToCheck);
      if (!option) {
        return '';
      }

      return optionStringifier(option);
    },
    [optionsMap, optionStringifier],
  );

  const useListboxParameters: UseListboxParameters<TValue> = {
    defaultValue,
    id: listboxId,
    isOptionDisabled,
    listboxRef: handleListboxRef,
    onChange: (e, newValues) => {
      if (multiple) {
        onChange?.(e, newValues as SelectValue<TValue, Multiple>);
      } else {
        onChange?.(e, (newValues[0] ?? null) as SelectValue<TValue, Multiple>);
      }
    },
    onHighlightChange: (e, newValue) => {
      onHighlightChange?.(e, newValue ?? null);
    },
    options: optionValues,
    optionStringifier: stringifyOption,
    selectionLimit: multiple ? null : 1,
    stateReducer: listboxReducer,
    value,
  };

  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption,
  } = useListbox(useListboxParameters);

  React.useEffect(() => {
    notifySelectionChanged(selectedOption);
  }, [selectedOption, notifySelectionChanged]);

  React.useEffect(() => {
    notifyHighlightChanged(highlightedOption);
  }, [highlightedOption, notifyHighlightChanged]);

  const getButtonProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectButtonSlotProps<TOther> => {
    return {
      ...getButtonRootProps({
        ...otherHandlers,
        onClick: createHandleButtonClick(otherHandlers),
        onMouseDown: createHandleMouseDown(otherHandlers),
        onKeyDown: createHandleButtonKeyDown(otherHandlers),
      }),
      role: 'combobox' as const,
      'aria-expanded': open,
      'aria-haspopup': 'listbox' as const,
      'aria-controls': listboxId,
    };
  };

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectListboxSlotProps<TOther> =>
    getListboxRootProps({
      ...otherHandlers,
      onBlur: createHandleListboxBlur(otherHandlers),
      onKeyUp: createHandleListboxKeyUp(otherHandlers),
    });

  const getOptionProps = React.useCallback(
    <TOther extends EventHandlers>(
      optionValue: TValue,
      otherHandlers: TOther = {} as TOther,
    ): UseSelectOptionSlotProps<TOther> => {
      return getListboxOptionProps(optionValue, {
        ...otherHandlers,
        onClick: createHandleListboxItemClick(otherHandlers),
      });
    },
    [getListboxOptionProps, createHandleListboxItemClick],
  );

  React.useDebugValue({
    selectedOption,
    highlightedOption,
    open,
  });

  const contextValue = React.useMemo(
    () => ({
      listboxRef,
      getOptionProps,
      getOptionState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    }),
    [
      getOptionProps,
      getOptionState,
      registerHighlightChangeHandler,
      registerSelectionChangeHandler,
    ],
  );

  if (props.multiple) {
    return {
      buttonActive,
      buttonFocusVisible,
      disabled,
      getButtonProps,
      getListboxProps,
      contextValue,
      open,
      value: selectedOption as SelectValue<TValue, Multiple>,
      highlightedOption,
    };
  }

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    contextValue,
    open,
    value: (selectedOption.length > 0 ? selectedOption[0] : null) as SelectValue<TValue, Multiple>,
    highlightedOption,
  };
}

export default useSelect;

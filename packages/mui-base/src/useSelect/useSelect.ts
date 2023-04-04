import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import useButton from '../useButton';
import {
  ButtonClickAction,
  SelectAction,
  SelectActionTypes,
  SelectInternalState,
  SelectValue,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
  UseSelectParameters,
  UseSelectResult,
} from './useSelect.types';
import useList, {
  listReducer,
  ListActionTypes,
  UseListParameters,
  ListAction,
  ListActionAddOn,
} from '../useList';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from '../SelectUnstyled/defaultOptionStringifier';
import { SelectProviderValue } from './SelectProvider';
import { useCompoundParent } from '../utils/useCompound';
import { SelectOption } from '../useOption/useOption.types';

/**
 *
 * Demos:
 *
 * - [Unstyled Select](https://mui.com/base/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base/react-select/hooks-api/#use-select)
 */
function useSelect<TValue, Multiple extends boolean = false>(
  props: UseSelectParameters<TValue, Multiple>,
): UseSelectResult<TValue, Multiple> {
  const {
    buttonRef: buttonRefProp,
    defaultOpen = false,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false as Multiple,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
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

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    TValue,
    SelectOption<TValue>
  >();

  const options = React.useMemo(() => {
    if (optionsParam != null) {
      return new Map(
        optionsParam.map((option, index) => [
          option.value,
          {
            value: option.value,
            label: option.label,
            disabled: option.disabled,
            ref: React.createRef<HTMLElement>(),
            id: `${listboxId}_${index}`,
          },
        ]),
      );
    }

    return subitems;
  }, [optionsParam, subitems, listboxId]);

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

  const stateReducer = React.useCallback(
    (
      state: SelectInternalState<TValue>,
      action: (ListAction<TValue, SelectInternalState<TValue>> | SelectAction) &
        ListActionAddOn<TValue>,
    ) => {
      const { open } = state;

      switch (action.type) {
        case SelectActionTypes.buttonClick:
          return {
            ...state,
            open: !open,
          };

        case SelectActionTypes.buttonArrowKeyDown:
          if (action.event.key === 'ArrowDown') {
            return {
              ...state,
              open: true,
            };
          }

          if (action.event.key === 'ArrowUp') {
            return {
              ...state,
              open: true,
              // TODO: highlight last item
            };
          }

          break;

        default:
          break;
      }

      const newState: SelectInternalState<TValue> = listReducer(
        state,
        action as ListAction<TValue, SelectInternalState<TValue>> & ListActionAddOn<TValue>,
      );

      switch (action.type) {
        case ListActionTypes.keyDown:
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

          if (
            !multiple &&
            (action.event.key === 'Enter' ||
              action.event.key === ' ' ||
              action.event.key === 'Escape')
          ) {
            return {
              ...newState,
              open: false,
            };
          }

          break;

        case ListActionTypes.itemClick:
          if (!multiple) {
            return {
              ...newState,
              open: false,
            };
          }

          break;

        case ListActionTypes.setState:
        case ListActionTypes.itemsChange:
          return {
            ...newState,
            highlightedValue:
              newState.selectedValues.length > 0 ? newState.selectedValues[0] : null,
          };

        case ListActionTypes.blur:
          return {
            ...newState,
            highlightedValue:
              newState.selectedValues.length > 0 ? newState.selectedValues[0] : null,
            open: false,
          };

        default:
          return newState;
      }

      return newState;
    },
    [multiple],
  );

  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
  } = useButton({
    disabled,
    ref: handleButtonRef,
  });

  const optionValues = React.useMemo(() => Array.from(options.keys()), [options]);

  const isItemDisabled = React.useCallback(
    (valueToCheck: TValue) => {
      const option = options.get(valueToCheck);
      return option?.disabled ?? false;
    },
    [options],
  );

  const stringifyOption = React.useCallback(
    (valueToCheck: TValue) => {
      const option = options.get(valueToCheck);
      if (!option) {
        return '';
      }

      return optionStringifier(option);
    },
    [options, optionStringifier],
  );

  const controlledState = React.useMemo(
    () => ({
      selectedValues: value,
      open: openProp,
    }),
    [value, openProp],
  );

  const useListboxParameters: UseListParameters<
    TValue,
    SelectInternalState<TValue>,
    SelectAction
  > = {
    getInitialState: () => ({
      highlightedValue: null,
      selectedValues: defaultValue ?? [],
      open: defaultOpen,
    }),
    getItemId: (itemValue) => options.get(itemValue)?.id,
    controlledProps: controlledState,
    isItemDisabled,
    listRef: handleListboxRef,
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
    onStateChange: (e, field, fieldValue) => {
      if (field === 'open') {
        onOpenChange?.(fieldValue as boolean);
        if (fieldValue === false && e?.type !== 'blur') {
          buttonRef.current?.focus();
        }
      }
    },
    items: optionValues,
    itemStringifier: stringifyOption,
    selectionLimit: multiple ? null : 1,
    stateReducer,
  };

  const {
    dispatch,
    getRootProps: getListboxRootProps,
    highlightedOption,
    selectedOptions,
    contextValue: listContextValue,
    state,
  } = useList(useListboxParameters);

  const { open } = state;

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
        const action: ButtonClickAction = {
          type: SelectActionTypes.buttonClick,
          event,
        };

        dispatch(action);
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
        dispatch({ type: SelectActionTypes.buttonArrowKeyDown, event });
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

  useEnhancedEffect(() => {
    // Scroll to the currently highlighted option.
    if (highlightedOption != null) {
      const optionRef = options.get(highlightedOption)?.ref;
      if (!listboxRef.current || !optionRef?.current) {
        return;
      }

      const listboxClientRect = (listboxRef.current as HTMLElement).getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();

      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [highlightedOption, options]);

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

  const getOptionMetadata = React.useCallback(
    (optionValue: TValue) => options.get(optionValue),
    [options],
  );

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectListboxSlotProps<TOther> => {
    return {
      ...getListboxRootProps({
        ...otherHandlers,
        onKeyUp: createHandleListboxKeyUp(otherHandlers),
      }),
      id: listboxId,
      role: 'listbox' as const,
      'aria-multiselectable': multiple ? 'true' : undefined,
    };
  };

  React.useDebugValue({
    selectedOptions,
    highlightedOption,
    open,
  });

  const contextValue: SelectProviderValue<TValue> = React.useMemo(
    () => ({
      ...listContextValue,
      ...compoundComponentContextValue,
    }),
    [listContextValue, compoundComponentContextValue],
  );

  if (props.multiple) {
    return {
      buttonActive,
      buttonFocusVisible,
      disabled,
      getButtonProps,
      getListboxProps,
      getOptionMetadata,
      contextValue,
      open,
      options: optionValues,
      value: selectedOptions as SelectValue<TValue, Multiple>,
      highlightedOption,
    };
  }

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    contextValue,
    open,
    options: optionValues,
    value: (selectedOptions.length > 0 ? selectedOptions[0] : null) as SelectValue<
      TValue,
      Multiple
    >,
    highlightedOption,
  };
}

export default useSelect;

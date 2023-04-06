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
  UseSelectReturnValue,
} from './useSelect.types';
import useList, {
  listReducer,
  ListActionTypes,
  UseListParameters,
  ListAction,
  ListActionAddOn,
  moveHighlight,
} from '../useList';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from './defaultOptionStringifier';
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
function useSelect<OptionValue, Multiple extends boolean = false>(
  props: UseSelectParameters<OptionValue, Multiple>,
): UseSelectReturnValue<OptionValue, Multiple> {
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

  let defaultValue: OptionValue[] | undefined;
  if (valueProp === undefined && defaultValueProp === undefined) {
    defaultValue = [];
  } else if (defaultValueProp !== undefined) {
    defaultValue = multiple
      ? (defaultValueProp as OptionValue[])
      : [defaultValueProp as OptionValue];
  }

  const value = React.useMemo(() => {
    if (valueProp !== undefined) {
      return multiple ? (valueProp as OptionValue[]) : [valueProp as OptionValue];
    }

    return undefined;
  }, [valueProp, multiple]);

  const { subitems, contextValue: compoundComponentContextValue } = useCompoundParent<
    OptionValue,
    SelectOption<OptionValue>
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
      state: SelectInternalState<OptionValue>,
      action: (ListAction<OptionValue, SelectInternalState<OptionValue>> | SelectAction) &
        ListActionAddOn<OptionValue>,
    ) => {
      const { open } = state;

      switch (action.type) {
        case SelectActionTypes.buttonClick: {
          const itemToHighlight =
            state.selectedValues[0] ??
            moveHighlight<OptionValue>(null, 'start', action.props.current!);

          return {
            ...state,
            open: !open,
            highlightedValue: !open ? itemToHighlight : null,
          };
        }

        case SelectActionTypes.buttonArrowKeyDown:
          if (action.event.key === 'ArrowDown') {
            const itemToHighlight =
              state.selectedValues[0] ??
              moveHighlight<OptionValue>(null, 'start', action.props.current!);

            return {
              ...state,
              open: true,
              highlightedValue: itemToHighlight,
            };
          }

          if (action.event.key === 'ArrowUp') {
            const itemToHighlight =
              state.selectedValues[0] ??
              moveHighlight<OptionValue>(null, 'end', action.props.current!);

            return {
              ...state,
              open: true,
              highlightedValue: itemToHighlight,
            };
          }

          break;

        default:
          break;
      }

      const newState: SelectInternalState<OptionValue> = listReducer(
        state,
        action as ListAction<OptionValue, SelectInternalState<OptionValue>> &
          ListActionAddOn<OptionValue>,
      );

      switch (action.type) {
        case ListActionTypes.keyDown:
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

        case ListActionTypes.blur:
          return {
            ...newState,
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
    (valueToCheck: OptionValue) => {
      const option = options.get(valueToCheck);
      return option?.disabled ?? false;
    },
    [options],
  );

  const stringifyOption = React.useCallback(
    (valueToCheck: OptionValue) => {
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

  const useListParameters: UseListParameters<
    OptionValue,
    SelectInternalState<OptionValue>,
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
        onChange?.(e, newValues as SelectValue<OptionValue, Multiple>);
      } else {
        onChange?.(e, (newValues[0] ?? null) as SelectValue<OptionValue, Multiple>);
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
    state: { open },
  } = useList(useListParameters);

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
    (optionValue: OptionValue) => options.get(optionValue),
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

  const contextValue: SelectProviderValue<OptionValue> = React.useMemo(
    () => ({
      ...listContextValue,
      ...compoundComponentContextValue,
    }),
    [listContextValue, compoundComponentContextValue],
  );

  let selectValue: SelectValue<OptionValue, Multiple>;
  if (props.multiple) {
    selectValue = selectedOptions as SelectValue<OptionValue, Multiple>;
  } else {
    selectValue = (selectedOptions.length > 0 ? selectedOptions[0] : null) as SelectValue<
      OptionValue,
      Multiple
    >;
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
    value: selectValue,
    highlightedOption,
  };
}

export default useSelect;

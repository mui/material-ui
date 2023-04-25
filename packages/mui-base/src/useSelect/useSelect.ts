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
import useList, { UseListParameters } from '../useList';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from './defaultOptionStringifier';
import { SelectProviderValue } from './SelectProvider';
import { useCompoundParent } from '../utils/useCompound';
import { SelectOption } from '../useOption/useOption.types';
import selectReducer from './selectReducer';

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/#hooks)
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

  const getItemId = React.useCallback(
    (itemValue: OptionValue) => options.get(itemValue)?.id,
    [options],
  );

  const handleSelectionChange = React.useCallback(
    (
      event:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValues: OptionValue[],
    ) => {
      if (multiple) {
        onChange?.(event, newValues as SelectValue<OptionValue, Multiple>);
      } else {
        onChange?.(event, (newValues[0] ?? null) as SelectValue<OptionValue, Multiple>);
      }
    },
    [multiple, onChange],
  );

  const handleHighlightChange = React.useCallback(
    (
      event:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValue: OptionValue | null,
    ) => {
      onHighlightChange?.(event, newValue ?? null);
    },
    [onHighlightChange],
  );

  const handleStateChange = React.useCallback(
    (e: React.SyntheticEvent | null, field: string, fieldValue: any) => {
      if (field === 'open') {
        onOpenChange?.(fieldValue as boolean);
        if (fieldValue === false && e?.type !== 'blur') {
          buttonRef.current?.focus();
        }
      }
    },
    [onOpenChange],
  );

  const useListParameters: UseListParameters<
    OptionValue,
    SelectInternalState<OptionValue>,
    SelectAction,
    { multiple: boolean }
  > = {
    getInitialState: () => ({
      highlightedValue: null,
      selectedValues: defaultValue ?? [],
      open: defaultOpen,
    }),
    getItemId,
    controlledProps: controlledState,
    isItemDisabled,
    listRef: handleListboxRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React.useMemo(() => ({ multiple }), [multiple]),
    items: optionValues,
    itemStringifier: stringifyOption,
    selectionMode: multiple ? 'multiple' : 'single',
    stateReducer: selectReducer,
  };

  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: { open, highlightedValue: highlightedOption, selectedValues: selectedOptions },
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
        dispatch({ type: SelectActionTypes.buttonArrowKeyDown, key: event.key, event });
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
    dispatch,
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

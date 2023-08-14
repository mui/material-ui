'use client';
import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/utils';
import { useButton } from '../useButton';
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
import { useList, UseListParameters } from '../useList';
import { EventHandlers } from '../utils/types';
import { defaultOptionStringifier } from './defaultOptionStringifier';
import { SelectProviderValue } from './SelectProvider';
import { useCompoundParent } from '../utils/useCompound';
import { SelectOption } from '../useOption/useOption.types';
import { selectReducer } from './selectReducer';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';

function preventDefault(event: React.SyntheticEvent) {
  event.preventDefault();
}

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base-ui/react-select/hooks-api/#use-select)
 */
function useSelect<OptionValue, Multiple extends boolean = false>(
  props: UseSelectParameters<OptionValue, Multiple>,
): UseSelectReturnValue<OptionValue, Multiple> {
  const {
    areOptionsEqual,
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
    getOptionAsString = defaultOptionStringifier,
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
    if (multiple) {
      defaultValue = defaultValueProp as OptionValue[];
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp as OptionValue];
    }
  }

  const value = React.useMemo(() => {
    if (valueProp !== undefined) {
      if (multiple) {
        return valueProp as OptionValue[];
      }

      return valueProp == null ? [] : [valueProp as OptionValue];
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

  const handleListboxRef = useForkRef(listboxRefProp, listboxRef);

  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
    rootRef: mergedButtonRef,
  } = useButton({
    disabled,
    rootRef: handleButtonRef,
  });

  const optionValues = React.useMemo(() => Array.from(options.keys()), [options]);

  const getOptionByValue = React.useCallback(
    (valueToGet: OptionValue) => {
      // This can't be simply `options.get(valueToGet)` because of the `areOptionsEqual` prop.
      // If it's provided, we assume that the user wants to compare the options by value.
      if (areOptionsEqual !== undefined) {
        const similarValue = optionValues.find((optionValue) =>
          areOptionsEqual(optionValue, valueToGet),
        )!;
        return options.get(similarValue);
      }

      return options.get(valueToGet);
    },
    [options, areOptionsEqual, optionValues],
  );

  const isItemDisabled = React.useCallback(
    (valueToCheck: OptionValue) => {
      const option = getOptionByValue(valueToCheck);
      return option?.disabled ?? false;
    },
    [getOptionByValue],
  );

  const stringifyOption = React.useCallback(
    (valueToCheck: OptionValue) => {
      const option = getOptionByValue(valueToCheck);
      if (!option) {
        return '';
      }

      return getOptionAsString(option);
    },
    [getOptionByValue, getOptionAsString],
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
    (event: React.SyntheticEvent | null, field: string, fieldValue: any) => {
      if (field === 'open') {
        onOpenChange?.(fieldValue as boolean);
        if (fieldValue === false && event?.type !== 'blur') {
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
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: mergedButtonRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React.useMemo(() => ({ multiple }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? 'multiple' : 'single',
    stateReducer: selectReducer,
  };

  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: { open, highlightedValue: highlightedOption, selectedValues: selectedOptions },
    rootRef: mergedListRootRef,
  } = useList(useListParameters);

  const createHandleButtonMouseDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent & MuiCancellableEvent) => {
      otherHandlers?.onMouseDown?.(event);
      if (!event.defaultMuiPrevented) {
        const action: ButtonClickAction = {
          type: SelectActionTypes.buttonClick,
          event,
        };

        dispatch(action);
      }
    };

  useEnhancedEffect(() => {
    // Scroll to the currently highlighted option.
    if (highlightedOption != null) {
      const optionRef = getOptionByValue(highlightedOption)?.ref;
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
  }, [highlightedOption, getOptionByValue]);

  const getOptionMetadata = React.useCallback(
    (optionValue: OptionValue) => getOptionByValue(optionValue),
    [getOptionByValue],
  );

  const getSelectTriggerProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ) => {
    return {
      ...otherHandlers,
      onMouseDown: createHandleButtonMouseDown(otherHandlers),
      ref: mergedListRootRef,
      role: 'combobox' as const,
      'aria-expanded': open,
      'aria-controls': listboxId,
    };
  };

  const getButtonProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectButtonSlotProps<TOther> => {
    const listboxAndButtonProps = combineHooksSlotProps(getButtonRootProps, getListboxRootProps);
    const combinedProps = combineHooksSlotProps(listboxAndButtonProps, getSelectTriggerProps);
    return combinedProps(otherHandlers);
  };

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectListboxSlotProps<TOther> => {
    return {
      ...otherHandlers,
      id: listboxId,
      role: 'listbox' as const,
      'aria-multiselectable': multiple ? 'true' : undefined,
      ref: handleListboxRef,
      onMouseDown: preventDefault, // to prevent the button from losing focus when interacting with the listbox
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
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    listboxRef: mergedListRootRef,
    open,
    options: optionValues,
    value: selectValue,
    highlightedOption,
  };
}

export { useSelect };

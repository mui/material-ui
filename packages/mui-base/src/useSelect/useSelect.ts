'use client';
import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useEnhancedEffect as useEnhancedEffect,
  visuallyHidden as visuallyHiddenStyle,
} from '@mui/utils';
import { useButton } from '../useButton';
import {
  ButtonClickAction,
  SelectAction,
  SelectActionTypes,
  SelectInternalState,
  SelectValue,
  UseSelectButtonSlotProps,
  UseSelectHiddenInputSlotProps,
  UseSelectListboxSlotProps,
  UseSelectParameters,
  UseSelectReturnValue,
} from './useSelect.types';
import { ListActionTypes, useList, UseListParameters } from '../useList';
import { EventHandlers } from '../utils/types';
import { defaultOptionStringifier } from './defaultOptionStringifier';
import { SelectProviderValue } from './SelectProvider';
import { useCompoundParent } from '../useCompound';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { SelectOption } from '../useOption/useOption.types';
import { selectReducer } from './selectReducer';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';

function defaultFormValueProvider<OptionValue>(
  selectedOption: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null,
) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return '';
    }

    return JSON.stringify(selectedOption.map((o) => o.value));
  }

  if (selectedOption?.value == null) {
    return '';
  }

  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }

  return JSON.stringify(selectedOption.value);
}

/**
 *
 * Demos:
 *
 * - [Select](https://next.mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://next.mui.com/base-ui/react-select/hooks-api/#use-select)
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
    name,
    required,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
    getOptionAsString = defaultOptionStringifier,
    getSerializedValue = defaultFormValueProvider,
    value: valueProp,
    componentName = 'useSelect',
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);

  const listboxRef = React.useRef<HTMLElement>(null);
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

  const getItemDomElement = React.useCallback(
    (itemId: OptionValue) => {
      if (itemId == null) {
        return null;
      }

      return subitems.get(itemId)?.ref.current ?? null;
    },
    [subitems],
  );

  const useListParameters: UseListParameters<
    OptionValue,
    SelectInternalState<OptionValue>,
    SelectAction<OptionValue>,
    { multiple: boolean }
  > = {
    getInitialState: () => ({
      highlightedValue: null,
      selectedValues: defaultValue ?? [],
      open: defaultOpen,
    }),
    getItemId,
    controlledProps: controlledState,
    focusManagement: 'DOM',
    getItemDomElement,
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: handleListboxRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React.useMemo(() => ({ multiple }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? 'multiple' : 'single',
    stateReducer: selectReducer,
    componentName,
  };

  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: { open, highlightedValue: highlightedOption, selectedValues: selectedOptions },
    rootRef: mergedListRootRef,
  } = useList(useListParameters);

  // store the initial open state to prevent focus stealing
  // (the first option gets focused only when the select is opened by the user)
  const isInitiallyOpen = React.useRef(open);

  useEnhancedEffect(() => {
    if (open && highlightedOption !== null) {
      const optionRef = getOptionByValue(highlightedOption)?.ref;

      if (!listboxRef.current || !optionRef?.current) {
        return;
      }

      if (!isInitiallyOpen.current) {
        optionRef.current.focus({ preventScroll: true });
      }

      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();

      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [open, highlightedOption, getOptionByValue]);

  const getOptionMetadata = React.useCallback(
    (optionValue: OptionValue) => getOptionByValue(optionValue),
    [getOptionByValue],
  );

  const createHandleButtonClick =
    (externalEventHandlers?: EventHandlers) => (event: React.MouseEvent & MuiCancellableEvent) => {
      externalEventHandlers?.onClick?.(event);
      if (!event.defaultMuiPrevented) {
        const action: ButtonClickAction = {
          type: SelectActionTypes.buttonClick,
          event,
        };

        dispatch(action);
      }
    };

  const createHandleButtonKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    };

  const getButtonOwnRootProps = (otherHandlers: EventHandlers = {}) => ({
    onClick: createHandleButtonClick(otherHandlers),
    onKeyDown: createHandleButtonKeyDown(otherHandlers),
  });

  const getSelectTriggerProps = <OtherHandlers extends EventHandlers>(
    otherHandlers: OtherHandlers = {} as OtherHandlers,
  ) => {
    return {
      ...otherHandlers,
      ...getButtonOwnRootProps(otherHandlers),
      role: 'combobox' as const,
      'aria-expanded': open,
      'aria-controls': listboxId,
    };
  };

  const getButtonProps = <ExternalProps extends Record<string, unknown>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseSelectButtonSlotProps<ExternalProps> => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const combinedProps = combineHooksSlotProps(getSelectTriggerProps, getButtonRootProps);

    return {
      ...externalProps,
      ...combinedProps(externalEventHandlers),
    };
  };

  const createListboxHandleBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent & MuiCancellableEvent) => {
      otherHandlers.onBlur?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if (
        listboxRef.current?.contains(event.relatedTarget as HTMLElement) ||
        event.relatedTarget === buttonRef.current
      ) {
        event.defaultMuiPrevented = true;
      }
    };

  const getOwnListboxHandlers = (otherHandlers: EventHandlers = {}) => ({
    onBlur: createListboxHandleBlur(otherHandlers),
  });

  const getListboxProps = <ExternalProps extends Record<string, unknown>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseSelectListboxSlotProps<ExternalProps> => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getOwnListboxHandlers, getListboxRootProps);

    return {
      id: listboxId,
      role: 'listbox' as const,
      'aria-multiselectable': multiple ? 'true' : undefined,
      ...externalProps,
      ...getCombinedRootProps(externalEventHandlers),
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

  let selectedOptionsMetadata: SelectValue<SelectOption<OptionValue>, Multiple>;
  if (multiple) {
    selectedOptionsMetadata = (selectValue as OptionValue[])
      .map((v) => getOptionMetadata(v))
      .filter((o) => o !== undefined) as SelectValue<SelectOption<OptionValue>, Multiple>;
  } else {
    selectedOptionsMetadata = (getOptionMetadata(selectValue as OptionValue) ??
      null) as SelectValue<SelectOption<OptionValue>, Multiple>;
  }

  const createHandleHiddenInputChange =
    (externalEventHandlers?: EventHandlers) =>
    (event: React.ChangeEvent<HTMLInputElement> & MuiCancellableEvent) => {
      externalEventHandlers?.onChange?.(event);

      if (event.defaultMuiPrevented) {
        return;
      }

      const option = options.get(event.target.value as OptionValue);

      // support autofill
      if (event.target.value === '') {
        dispatch({
          type: ListActionTypes.clearSelection,
        });
      } else if (option !== undefined) {
        dispatch({
          type: SelectActionTypes.browserAutoFill,
          item: option.value,
          event,
        });
      }
    };

  const getHiddenInputProps = <ExternalProps extends Record<string, unknown>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseSelectHiddenInputSlotProps<ExternalProps> => {
    const externalEventHandlers = extractEventHandlers(externalProps);

    return {
      name,
      tabIndex: -1,
      'aria-hidden': true,
      required: required ? true : undefined,
      value: getSerializedValue(selectedOptionsMetadata),
      style: visuallyHiddenStyle,
      ...externalProps,
      onChange: createHandleHiddenInputChange(externalEventHandlers),
    };
  };

  return {
    buttonActive,
    buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getHiddenInputProps,
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

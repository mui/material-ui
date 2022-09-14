import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import useButton from '@mui/base/useButton';
import {
  SelectOption,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
  UseSelectMultiParameters,
  UseSelectMultiResult,
  UseSelectOptionSlotProps,
  UseSelectParameters,
  UseSelectSingleParameters,
  UseSelectSingleResult,
} from './useSelect.types';
import {
  ListboxReducer,
  useListbox,
  defaultListboxReducer,
  ActionTypes,
  UseListboxParameters,
} from '@mui/base/useListbox';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from '../SelectUnstyled/defaultOptionStringifier';

function useSelect<TValue>(props: UseSelectSingleParameters<TValue>): UseSelectSingleResult<TValue>;
function useSelect<TValue>(props: UseSelectMultiParameters<TValue>): UseSelectMultiResult<TValue>;
function useSelect<TValue>(props: UseSelectParameters<TValue>) {
  const {
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier,
    value: valueProp,
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);

  const listboxRef = React.useRef<HTMLElement | null>(null);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'SelectUnstyled',
    state: 'value',
  });

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

  const updateListboxRef = (listboxElement: HTMLUListElement | null) => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };

  const handleListboxRef = useForkRef(useForkRef(listboxRefProp, listboxRef), updateListboxRef);

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

  const createHandleListboxItemClick =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      otherHandlers?.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (!multiple) {
        onOpenChange?.(false);
      }
    };

  const createHandleListboxBlur =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      otherHandlers?.onBlur?.(event);
      if (!event.defaultPrevented) {
        onOpenChange?.(false);
      }
    };

  const listboxReducer: ListboxReducer<SelectOption<TValue>> = (state, action) => {
    const newState = defaultListboxReducer(state, action);

    // change selection when listbox is closed
    if (
      action.type === ActionTypes.keyDown &&
      !open &&
      (action.event.key === 'ArrowUp' || action.event.key === 'ArrowDown')
    ) {
      return {
        ...newState,
        selectedValue: newState.highlightedValue,
      };
    }

    if (
      action.type === ActionTypes.blur ||
      action.type === ActionTypes.setValue ||
      action.type === ActionTypes.optionsChange
    ) {
      return {
        ...newState,
        highlightedValue: newState.selectedValue as SelectOption<TValue>,
      };
    }

    return newState;
  };

  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
  } = useButton({
    disabled,
    ref: handleButtonRef,
  });

  const selectedOption = React.useMemo(
    () =>
      props.multiple
        ? props.options.filter((o) => (value as TValue[]).includes(o.value))
        : props.options.find((o) => o.value === value) ?? null,
    [props.multiple, props.options, value],
  );

  let useListboxParameters: UseListboxParameters<SelectOption<TValue>>;

  if (props.multiple) {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => o?.disabled ?? false,
      optionComparer: (o, v) => o?.value === v?.value,
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (newOptions) => {
        const newValues = newOptions.map((o) => o.value);
        setValue(newValues);
        (onChange as (value: TValue[]) => void)?.(newValues);
      },
      options,
      optionStringifier,
      value: selectedOption as SelectOption<TValue>[],
    };
  } else {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => o?.disabled ?? false,
      optionComparer: (o, v) => o?.value === v?.value,
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: (option: SelectOption<TValue> | null) => {
        setValue(option?.value ?? null);
        (onChange as (value: TValue | null) => void)?.(option?.value ?? null);
      },
      options,
      optionStringifier,
      stateReducer: listboxReducer,
      value: selectedOption as SelectOption<TValue> | null,
    };
  }

  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption: listboxSelectedOption,
  } = useListbox(useListboxParameters);

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
      'aria-expanded': open,
      'aria-haspopup': 'listbox' as const,
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

  const getOptionProps = <TOther extends EventHandlers>(
    option: SelectOption<TValue>,
    otherHandlers: TOther = {} as TOther,
  ): UseSelectOptionSlotProps<TOther> => {
    return getListboxOptionProps(option, {
      ...otherHandlers,
      onClick: createHandleListboxItemClick(otherHandlers),
    });
  };

  React.useDebugValue({
    selectedOption: listboxSelectedOption,
    highlightedOption,
    open,
  });

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    open,
    value,
  };
}

export default useSelect;

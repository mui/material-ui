import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { useButton } from '../ButtonUnstyled';
import {
  SelectOption,
  UseSelectMultiProps,
  UseSelectProps,
  UseSelectSingleProps,
} from './useSelectProps';
import {
  ListboxReducer,
  useListbox,
  defaultListboxReducer,
  ActionTypes,
  UseListboxProps,
  OptionState,
} from '../ListboxUnstyled';

interface UseSelectCommonResult<TValue> {
  buttonActive: boolean;
  buttonFocusVisible: boolean;
  disabled: boolean;
  getButtonProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => Record<string, any>;
  getListboxProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => Record<string, any>;
  getOptionProps: (
    option: SelectOption<TValue>,
    otherHandlers?: Record<string, React.EventHandler<any>>,
  ) => Record<string, any>;
  getOptionState: (option: SelectOption<TValue>) => OptionState;
}

interface UseSelectSingleResult<TValue> extends UseSelectCommonResult<TValue> {
  value: TValue | null;
}

interface UseSelectMultiResult<TValue> extends UseSelectCommonResult<TValue> {
  value: TValue[];
}

function useSelect<TValue>(props: UseSelectSingleProps<TValue>): UseSelectSingleResult<TValue>;
function useSelect<TValue>(props: UseSelectMultiProps<TValue>): UseSelectMultiResult<TValue>;
function useSelect<TValue>(props: UseSelectProps<TValue>) {
  const {
    buttonComponent,
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open,
    options,
    value: valueProp,
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const intermediaryListboxRef = useForkRef(listboxRefProp, listboxRef);

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

  const updateListboxRef = (listboxElement: HTMLUListElement) => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };

  const handleListboxRef = useForkRef(intermediaryListboxRef, updateListboxRef);

  React.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);

  React.useEffect(() => {
    requestListboxFocus(open ?? false);
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
      otherHandlers?.blur?.(event);
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
      const optionToSelect = action.props.options[newState.highlightedIndex];

      return {
        ...newState,
        selectedValue: optionToSelect,
      };
    }

    if (
      action.type === ActionTypes.blur ||
      action.type === ActionTypes.setControlledValue ||
      action.type === ActionTypes.optionsChange
    ) {
      const selectedOptionIndex = action.props.options.findIndex((o) =>
        action.props.optionComparer(o, newState.selectedValue as SelectOption<TValue>),
      );

      return {
        ...newState,
        highlightedIndex: selectedOptionIndex,
      };
    }

    return newState;
  };

  const {
    getRootProps: getButtonProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
  } = useButton({
    component: buttonComponent,
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

  let useListboxParameters: UseListboxProps<SelectOption<TValue>>;

  if (props.multiple) {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: (o) => o?.disabled ?? false,
      optionComparer: (o, v) => o?.value === v?.value,
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (newOptions) => {
        setValue(newOptions.map((o) => o.value));
        (onChange as (value: TValue[]) => void)?.(newOptions.map((o) => o.value));
      },
      options,
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
      stateReducer: listboxReducer,
      value: selectedOption as SelectOption<TValue> | null,
    };
  }

  const {
    getRootProps: getListboxProps,
    getOptionProps,
    getOptionState,
    highlightedOption,
  } = useListbox(useListboxParameters);

  React.useDebugValue({ value, open, highlightedOption });

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => {
      return {
        ...getButtonProps({
          ...otherHandlers,
          onClick: createHandleButtonClick(otherHandlers),
          onMouseDown: createHandleMouseDown(otherHandlers),
          onKeyDown: createHandleButtonKeyDown(otherHandlers),
        }),
        'aria-expanded': open,
        'aria-haspopup': 'listbox' as const,
      };
    },
    getListboxProps: (otherHandlers?: Record<string, React.EventHandler<any>>) =>
      getListboxProps({
        ...otherHandlers,
        onBlur: createHandleListboxBlur(otherHandlers),
        onKeyUp: createHandleListboxKeyUp(otherHandlers),
      }),
    getOptionProps: (
      option: SelectOption<TValue>,
      otherHandlers?: Record<string, React.EventHandler<any>>,
    ) => {
      return getOptionProps(option, {
        ...otherHandlers,
        onClick: createHandleListboxItemClick(otherHandlers),
      });
    },
    getOptionState,
    open,
    value,
  };
}

export default useSelect;

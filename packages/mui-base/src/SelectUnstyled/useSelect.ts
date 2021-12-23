import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
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
    buttonRef,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef,
    multiple = false,
    onButtonClick,
    onChange,
    onOpenChange,
    open,
    options,
    value: valueProp,
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'SelectUnstyled',
    state: 'value',
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    onButtonClick?.(event);
    if (!event.defaultPrevented) {
      onOpenChange?.(true);
    }
  };

  const createHandleButtonKeyDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ' || (multiple && event.key === 'ArrowDown')) {
        event.preventDefault();
        onOpenChange?.(true);
      }
    };

  const createHandleListboxKeyDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape' && open) {
        event.preventDefault();
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

    if (action.type === ActionTypes.keyDown && !open) {
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
    onClick: handleButtonClick,
    ref: buttonRef,
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
      listboxRef,
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
  } = useListbox(useListboxParameters);

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => {
      return {
        ...getButtonProps({
          ...otherHandlers,
          // Make arrow keys work even when the listbox isn't open:
          onKeyDown: getListboxProps({ onKeyDown: createHandleButtonKeyDown(otherHandlers) })
            .onKeyDown,
        }),
        'aria-expanded': open,
        'aria-haspopup': 'listbox' as const,
      };
    },
    getListboxProps: (otherHandlers?: Record<string, React.EventHandler<any>>) =>
      getListboxProps({
        ...otherHandlers,
        onBlur: createHandleListboxBlur(otherHandlers),
        onKeyDown: createHandleListboxKeyDown(otherHandlers),
      }),
    getOptionProps,
    getOptionState,
    value,
  };
}

export default useSelect;

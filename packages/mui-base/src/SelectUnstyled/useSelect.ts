import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import { useButton } from '../ButtonUnstyled';
import { SelectOption, UseSelectProps } from './useSelectProps';
import {
  ListboxReducer,
  useListbox,
  defaultListboxReducer,
  ActionTypes,
  UseListboxProps,
} from '../ListboxUnstyled';

export default function useSelect<TValue>(props: UseSelectProps<TValue>) {
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

  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || (multiple && event.key === 'ArrowDown')) {
      event.preventDefault();
      onOpenChange?.(true);
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
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
  } = useListbox(useListboxParameters, listboxRef);

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => {
      return {
        ...getButtonProps({
          ...otherHandlers,
          onKeyDown: getListboxProps({ onKeyDown: handleButtonKeyDown }).onKeyDown,
        }),
        'aria-expanded': open,
        'aria-haspopup': 'listbox',
      };
    },
    getListboxProps: () =>
      getListboxProps({
        onBlur: () => {
          onOpenChange?.(false);
        },
        onKeyDown: handleListboxKeyDown,
      }),
    getOptionProps,
    getOptionState,
    value,
  };
}

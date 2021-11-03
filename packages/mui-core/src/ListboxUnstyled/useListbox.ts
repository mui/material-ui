import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import {
  UseListboxProps,
  ListboxState,
  ListboxAction,
  UseListboxStrictProps,
  CustomListboxReducer,
} from './types';
import defaultReducer from './defaultReducer';

const defaultOptionComparer = <TOption>(option: TOption, value: TOption) => option === value;

type ListboxReducer<TOption> = (
  prevState: ListboxState<TOption>,
  action: ListboxAction<TOption>,
) => ListboxState<TOption>;

function combineReducers<TOption>(
  internal: ListboxReducer<TOption>,
  external: CustomListboxReducer<TOption> | undefined,
) {
  if (external === undefined) {
    return internal;
  }

  return (state: ListboxState<TOption>, action: ListboxAction<TOption>) =>
    external(state, action, internal);
}

function useControlledReducer<TOption>(
  internalReducer: ListboxReducer<TOption>,
  externalReducer: CustomListboxReducer<TOption> | undefined,
  controlledValue: UseListboxProps<TOption>['value'],
  defaultValue: UseListboxProps<TOption>['defaultValue'],
  onValueChange: UseListboxProps<TOption>['onChange'],
  onHighlightChange: UseListboxProps<TOption>['onHighlightChange'],
  options: UseListboxProps<TOption>['options'],
): [ListboxState<TOption>, (action: ListboxAction<TOption>) => void] {
  const [value, setValueState] = useControlled({
    controlled: controlledValue,
    default: defaultValue,
    name: 'useListbox',
  });

  const [state, dispatch] = React.useReducer<ListboxReducer<TOption>>(
    combineReducers(internalReducer, externalReducer),
    {
      highlightedIndex: -1,
      selectedValue: value,
    } as ListboxState<TOption>,
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      dispatch({ type: 'setControlledValue', value: controlledValue });
    }
  }, [controlledValue]);

  React.useEffect(() => {
    setValueState(state.selectedValue);
    if (state.selectedValue != null) {
      // @ts-ignore We know that selectedValue has the correct type depending on `selectMultiple` prop.
      onValueChange?.(state.selectedValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- No need to re-run if the event handler changes
  }, [state.selectedValue, setValueState]);

  React.useEffect(() => {
    if (state.highlightedIndex === -1) {
      onHighlightChange?.(null);
    } else {
      onHighlightChange?.(options[state.highlightedIndex]);
    }
  });

  return [state, dispatch];
}

export default function useListbox<TOption>(
  props: UseListboxProps<TOption>,
  ref: React.RefObject<Element>,
) {
  const {
    defaultValue,
    disableListWrap = false,
    disabledItemsFocusable = false,
    options,
    selectMultiple = false,
    isOptionDisabled = () => false,
    isOptionEqualToValue = defaultOptionComparer,
    onChange,
    onHighlightChange,
    stateReducer: externalReducer,
    value: valueProp,
  } = props;

  const propsWithDefaults: UseListboxStrictProps<TOption> = {
    ...props,
    disableListWrap,
    disabledItemsFocusable,
    selectMultiple,
    isOptionDisabled,
    isOptionEqualToValue,
  };

  const [{ highlightedIndex, selectedValue }, dispatch] = useControlledReducer(
    defaultReducer,
    externalReducer,
    valueProp,
    defaultValue,
    onChange,
    onHighlightChange,
    options,
  );

  const createHandleOptionClick =
    (optionIndex: number, other: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent) => {
      other.onClick?.(event);
      const option = options[optionIndex];
      event.preventDefault();

      dispatch({
        type: 'optionClick',
        option,
        optionIndex,
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleKeyDown =
    (other: Record<string, React.EventHandler<any>>) =>
    (event: React.KeyboardEvent<HTMLElement> & { defaultMuiPrevented?: boolean }) => {
      other.onKeyDown?.(event);

      if (event.defaultMuiPrevented) {
        return;
      }

      if (
        [' ', 'Enter', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(
          event.key,
        )
      ) {
        event.preventDefault();
      }

      dispatch({
        type: 'keyDown',
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleBlur =
    (other: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent<HTMLElement>) => {
      if (ref.current?.contains(document.activeElement)) {
        // focus is within the listbox
        return;
      }

      other.onBlur?.(event);
      dispatch({
        type: 'blur',
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleFocus =
    (other: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent<HTMLElement>) => {
      other.onFocus?.(event);
    };

  const getRootProps = (other: Record<string, React.EventHandler<any>> = {}) => {
    return {
      onBlur: createHandleBlur(other),
      onFocus: createHandleFocus(other),
      onKeyDown: createHandleKeyDown(other),
      role: 'listbox',
      tabIndex: 0,
    };
  };

  const getOptionState = (index: number) => {
    const option = options[index];
    let selected: boolean;
    if (selectMultiple) {
      selected = ((selectedValue as TOption[]) ?? []).some(
        (value) => value != null && isOptionEqualToValue(option, value),
      );
    } else {
      selected = isOptionEqualToValue(option, selectedValue as TOption);
    }

    const disabled = isOptionDisabled(option, index);

    return {
      index,
      option,
      selected,
      disabled,
      highlighted: highlightedIndex === index,
    };
  };

  const getOptionProps = (index: number, other: Record<string, React.EventHandler<any>> = {}) => {
    const { selected, disabled } = getOptionState(index);

    return {
      'aria-disabled': disabled || undefined,
      'aria-selected': selected,
      'data-option-index': index,
      onClick: createHandleOptionClick(index, other),
      role: 'option',
    };
  };

  return {
    getRootProps,
    getOptionProps,
    getOptionState,
  };
}

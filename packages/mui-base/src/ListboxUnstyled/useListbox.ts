import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import {
  UseListboxParameters,
  UseListboxStrictProps,
  ActionTypes,
  OptionState,
  UseListboxOptionSlotProps,
  UseListboxRootSlotProps,
} from './useListbox.types';
import defaultReducer from './defaultListboxReducer';
import useControllableReducer from './useControllableReducer';
import areArraysEqual from '../utils/areArraysEqual';
import { EventHandlers } from '../utils/types';

const defaultOptionComparer = <TOption>(optionA: TOption, optionB: TOption) => optionA === optionB;

export default function useListbox<TOption>(props: UseListboxParameters<TOption>) {
  const {
    disableListWrap = false,
    disabledItemsFocusable = false,
    id: idProp,
    options,
    multiple = false,
    isOptionDisabled = () => false,
    optionComparer = defaultOptionComparer,
    stateReducer: externalReducer,
    listboxRef: externalListboxRef,
  } = props;

  const id = useId(idProp);

  function defaultIdGenerator(_: TOption, index: number) {
    return `${id}-option-${index}`;
  }

  const optionIdGenerator = props.optionIdGenerator ?? defaultIdGenerator;

  const propsWithDefaults: UseListboxStrictProps<TOption> = {
    ...props,
    disableListWrap,
    disabledItemsFocusable,
    isOptionDisabled,
    multiple,
    optionComparer,
  };

  const listboxRef = React.useRef<HTMLUListElement>(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);

  const [{ highlightedIndex, selectedValue }, dispatch] = useControllableReducer(
    defaultReducer,
    externalReducer,
    propsWithDefaults,
  );

  const previousOptions = React.useRef<TOption[]>([]);

  React.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }

    dispatch({
      type: ActionTypes.optionsChange,
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults,
    });

    previousOptions.current = options;

    // No need to re-run this effect if props change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, optionComparer, dispatch]);

  const createHandleOptionClick =
    (option: TOption, other: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent) => {
      other.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      event.preventDefault();

      dispatch({
        type: ActionTypes.optionClick,
        option,
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleKeyDown =
    (other: Record<string, React.EventHandler<any>>) =>
    (event: React.KeyboardEvent<HTMLElement>) => {
      other.onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const keysToPreventDefault = [
        ' ',
        'Enter',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ];

      if (keysToPreventDefault.includes(event.key)) {
        event.preventDefault();
      }

      dispatch({
        type: ActionTypes.keyDown,
        event,
        props: propsWithDefaults,
      });
    };

  const createHandleBlur =
    (other: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent<HTMLElement>) => {
      other.onBlur?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (listboxRef.current?.contains(document.activeElement)) {
        // focus is within the listbox
        return;
      }

      dispatch({
        type: ActionTypes.blur,
        event,
        props: propsWithDefaults,
      });
    };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseListboxRootSlotProps<TOther> => {
    return {
      ...otherHandlers,
      'aria-activedescendant':
        highlightedIndex >= 0
          ? optionIdGenerator(options[highlightedIndex], highlightedIndex)
          : undefined,
      id,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      role: 'listbox',
      tabIndex: 0,
      ref: handleRef,
    };
  };

  const getOptionState = (option: TOption): OptionState => {
    let selected: boolean;
    const index = options.findIndex((opt) => optionComparer(opt, option));
    if (multiple) {
      selected = ((selectedValue as TOption[]) ?? []).some(
        (value) => value != null && optionComparer(option, value),
      );
    } else {
      selected = optionComparer(option, selectedValue as TOption);
    }

    const disabled = isOptionDisabled(option, index);

    return {
      selected,
      disabled,
      highlighted: highlightedIndex === index,
    };
  };

  const getOptionProps = <TOther extends EventHandlers = {}>(
    option: TOption,
    otherHandlers: TOther = {} as TOther,
  ): UseListboxOptionSlotProps<TOther> => {
    const { selected, disabled } = getOptionState(option);
    const index = options.findIndex((opt) => optionComparer(opt, option));

    return {
      ...otherHandlers,
      'aria-disabled': disabled || undefined,
      'aria-selected': selected,
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, otherHandlers),
      role: 'option',
    };
  };

  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    selectedOption: selectedValue,
    highlightedOption: options[highlightedIndex] ?? null,
  };
}

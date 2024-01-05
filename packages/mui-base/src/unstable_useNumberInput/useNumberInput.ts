'use client';
import * as React from 'react';
import MuiError from '@mui-internal/babel-macros/MuiError.macro';
import {
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { EventHandlers } from '../utils/types';
import { FormControlState, useFormControlContext } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputRootSlotProps,
  UseNumberInputInputSlotProps,
  UseNumberInputIncrementButtonSlotProps,
  UseNumberInputDecrementButtonSlotProps,
  UseNumberInputReturnValue,
  StepDirection,
} from './useNumberInput.types';
import { clamp, isNumber } from './utils';

const STEP_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];

const SUPPORTED_KEYS = [...STEP_KEYS, 'Home', 'End'];

export function getInputValueAsString(v: string): string {
  return v ? String(v.trim()) : String(v);
}

/**
 *
 * Demos:
 *
 * - [Number Input](https://mui.com/base-ui/react-number-input/#hook)
 *
 * API:
 *
 * - [useNumberInput API](https://mui.com/base-ui/react-number-input/hooks-api/#use-number-input)
 */
export function useNumberInput(parameters: UseNumberInputParameters): UseNumberInputReturnValue {
  const {
    min,
    max,
    step,
    shiftMultiplier = 10,
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onInputChange,
    onFocus,
    onChange,
    required: requiredProp = false,
    readOnly: readOnlyProp = false,
    value: valueProp,
    inputRef: inputRefProp,
    inputId: inputIdProp,
  } = parameters;

  // TODO: make it work with FormControl
  const formControlContext: FormControlState | undefined = useFormControlContext();

  const { current: isControlled } = React.useRef(valueProp != null);

  const handleInputRefWarning = React.useCallback((instance: HTMLElement) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'MUI: You have provided a `slots.input` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);

  const inputId = useId(inputIdProp);

  const [focused, setFocused] = React.useState(false);

  // the "final" value
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValueProp,
    name: 'NumberInput',
  });

  // the (potentially) dirty or invalid input value
  const [dirtyValue, setDirtyValue] = React.useState<string | undefined>(
    value ? String(value) : undefined,
  );

  React.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);

      onBlur?.();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);

  const createHandleFocus =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.FocusEvent<HTMLInputElement> & MuiCancellableEvent) => {
      otherHandlers.onFocus?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      if (formControlContext && formControlContext.onFocus) {
        formControlContext?.onFocus?.();
      }
      setFocused(true);
    };

  const handleValueChange =
    () =>
    (
      event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
      val: number | undefined,
    ) => {
      let newValue;

      if (val === undefined) {
        newValue = val;
        setDirtyValue('');
      } else {
        newValue = clamp(val, min, max, step);
        setDirtyValue(String(newValue));
      }

      setValue(newValue);

      if (isNumber(newValue)) {
        onChange?.(event, newValue);
      } else {
        onChange?.(event, undefined);
      }
    };

  const createHandleInputChange =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.ChangeEvent<HTMLInputElement> & MuiCancellableEvent) => {
      if (!isControlled && event.target === null) {
        throw new MuiError(
          'MUI: Expected valid input target. ' +
            'Did you use a custom `slots.input` and forget to forward refs? ' +
            'See https://mui.com/r/input-component-ref-interface for more info.',
        );
      }

      formControlContext?.onChange?.(event);

      otherHandlers.onInputChange?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // TODO: event.currentTarget.value will be passed straight into the InputChange action
      const val = getInputValueAsString(event.currentTarget.value);

      if (val === '' || val === '-') {
        setDirtyValue(val);
        setValue(undefined);
      }

      if (val.match(/^-?\d+?$/)) {
        setDirtyValue(val);
        setValue(parseInt(val, 10));
      }
    };

  const createHandleBlur =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.FocusEvent<HTMLInputElement> & MuiCancellableEvent) => {
      otherHandlers.onBlur?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // TODO: event.currentTarget.value will be passed straight into the Blur action, or just pass inputValue from state
      const val = getInputValueAsString(event.currentTarget.value);

      if (val === '' || val === '-') {
        handleValueChange()(event, undefined);
      } else {
        handleValueChange()(event, parseInt(val, 10));
      }

      if (formControlContext && formControlContext.onBlur) {
        formControlContext.onBlur();
      }

      setFocused(false);
    };

  const createHandleClick =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.MouseEvent<HTMLInputElement> & MuiCancellableEvent) => {
      otherHandlers.onClick?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }
    };

  const handleStep =
    (direction: StepDirection) => (event: React.PointerEvent | React.KeyboardEvent) => {
      let newValue;

      if (isNumber(value)) {
        const multiplier =
          event.shiftKey ||
          (event as React.KeyboardEvent).key === 'PageUp' ||
          (event as React.KeyboardEvent).key === 'PageDown'
            ? shiftMultiplier
            : 1;
        newValue = {
          up: value + (step ?? 1) * multiplier,
          down: value - (step ?? 1) * multiplier,
        }[direction];
      } else {
        // no value
        newValue = {
          up: min ?? 0,
          down: max ?? 0,
        }[direction];
      }
      handleValueChange()(event, newValue);
    };

  const createHandleKeyDown =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.KeyboardEvent<HTMLInputElement> & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      if (event.defaultPrevented) {
        return;
      }

      if (SUPPORTED_KEYS.includes(event.key)) {
        event.preventDefault();
      }

      if (STEP_KEYS.includes(event.key)) {
        const direction = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          PageUp: 'up',
          PageDown: 'down',
        }[event.key] as StepDirection;

        handleStep(direction)(event);
      }

      if (event.key === 'Home' && isNumber(max)) {
        handleValueChange()(event, max);
      }

      if (event.key === 'End' && isNumber(min)) {
        handleValueChange()(event, min);
      }
    };

  const getRootProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseNumberInputRootSlotProps<ExternalProps> => {
    const propsEventHandlers = extractEventHandlers(parameters, [
      // these are handled by the input slot
      'onBlur',
      'onInputChange',
      'onFocus',
      'onChange',
    ]);

    const externalEventHandlers = {
      ...propsEventHandlers,
      ...extractEventHandlers(externalProps),
    };

    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: createHandleClick(externalEventHandlers),
    };
  };

  const getInputProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseNumberInputInputSlotProps<ExternalProps> => {
    const propsEventHandlers = {
      onBlur,
      onFocus,
      // onChange from normal props is the custom onChange so we ignore it here
      onChange: onInputChange,
    };

    const externalEventHandlers: Partial<EventHandlers> = {
      ...propsEventHandlers,
      ...extractEventHandlers(externalProps, [
        // onClick is handled by the root slot
        'onClick',
        // do not ignore 'onInputChange', we want slotProps.input.onInputChange to enter the DOM and throw
      ]),
    };

    const mergedEventHandlers = {
      ...externalEventHandlers,
      onFocus: createHandleFocus(externalEventHandlers),
      // slotProps.onChange is renamed to onInputChange and passed to createHandleInputChange
      onChange: createHandleInputChange({
        ...externalEventHandlers,
        onInputChange: externalEventHandlers.onChange,
      }),
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
    };

    const displayValue = (focused ? dirtyValue : value) ?? '';

    // get rid of slotProps.input.onInputChange before returning to prevent it from entering the DOM
    // if it was passed, it will be in mergedEventHandlers and throw
    delete externalProps.onInputChange;

    return {
      type: 'text',
      id: inputId,
      'aria-invalid': errorProp || undefined,
      defaultValue: undefined,
      value: displayValue as number | undefined,
      'aria-valuenow': displayValue as number | undefined,
      'aria-valuetext': String(displayValue),
      'aria-valuemin': min,
      'aria-valuemax': max,
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: 'false',
      required: requiredProp,
      readOnly: readOnlyProp,
      'aria-disabled': disabledProp,
      disabled: disabledProp,
      ...externalProps,
      ref: handleInputRef,
      ...mergedEventHandlers,
    };
  };

  const handleStepperButtonMouseDown = (event: React.PointerEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const stepperButtonCommonProps = {
    'aria-controls': inputId,
    tabIndex: -1,
  };

  const isIncrementDisabled =
    disabledProp || (isNumber(value) ? value >= (max ?? Number.MAX_SAFE_INTEGER) : false);

  const getIncrementButtonProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseNumberInputIncrementButtonSlotProps<ExternalProps> => {
    return {
      ...externalProps,
      ...stepperButtonCommonProps,
      disabled: isIncrementDisabled,
      'aria-disabled': isIncrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('up'),
    };
  };

  const isDecrementDisabled =
    disabledProp || (isNumber(value) ? value <= (min ?? Number.MIN_SAFE_INTEGER) : false);

  const getDecrementButtonProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseNumberInputDecrementButtonSlotProps<ExternalProps> => {
    return {
      ...externalProps,
      ...stepperButtonCommonProps,
      disabled: isDecrementDisabled,
      'aria-disabled': isDecrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('down'),
    };
  };

  return {
    disabled: disabledProp,
    error: errorProp,
    focused,
    formControlContext,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    getRootProps,
    required: requiredProp,
    value: focused ? dirtyValue : value,
    isIncrementDisabled,
    isDecrementDisabled,
    inputValue: dirtyValue,
  };
}

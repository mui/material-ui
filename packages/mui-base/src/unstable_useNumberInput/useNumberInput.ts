'use client';
import * as React from 'react';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { FormControlState, useFormControlContext } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputRootSlotProps,
  UseNumberInputInputSlotProps,
  UseNumberInputIncrementButtonSlotProps,
  UseNumberInputDecrementButtonSlotProps,
  UseNumberInputReturnValue,
} from './useNumberInput.types';
import { clamp, isNumber } from './utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';

type StepDirection = 'up' | 'down';

const STEP_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];

const SUPPORTED_KEYS = [...STEP_KEYS, 'Home', 'End'];

function parseInput(v: string): string {
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
  const [value, setValue] = React.useState(valueProp ?? defaultValueProp);
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

  const handleFocus =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onFocus?.(event);

      if (event.defaultPrevented) {
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

  const handleInputChange =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled && event.target === null) {
        throw new MuiError(
          'MUI: Expected valid input target. ' +
            'Did you use a custom `slots.input` and forget to forward refs? ' +
            'See https://mui.com/r/input-component-ref-interface for more info.',
        );
      }

      formControlContext?.onChange?.(event);

      otherHandlers.onInputChange?.(event);

      const val = parseInput(event.currentTarget.value);

      if (val === '' || val === '-') {
        setDirtyValue(val);
        setValue(undefined);
      }

      if (val.match(/^-?\d+?$/)) {
        setDirtyValue(val);
        setValue(parseInt(val, 10));
      }
    };

  const handleBlur =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const val = parseInput(event.currentTarget.value);

      otherHandlers.onBlur?.(event);

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

  const handleClick =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }

      otherHandlers.onClick?.(event);
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

  const handleKeyDown =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      otherHandlers.onKeyDown?.(event);

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

  const getRootProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters, [
      'onBlur',
      'onInputChange',
      'onFocus',
      'onChange',
    ]);

    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
    };
  };

  const getInputProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputInputSlotProps<TOther> => {
    const externalEventHandlers = {
      onBlur,
      onFocus,
      ...extractEventHandlers(externalProps, ['onInputChange']),
    };

    const mergedEventHandlers = {
      ...externalProps,
      ...externalEventHandlers,
      onFocus: handleFocus(externalEventHandlers),
      onChange: handleInputChange({ ...externalEventHandlers, onInputChange }),
      onBlur: handleBlur(externalEventHandlers),
      onKeyDown: handleKeyDown(externalEventHandlers),
    };

    const displayValue = (focused ? dirtyValue : value) ?? '';

    return {
      ...mergedEventHandlers,
      type: 'text',
      id: inputId,
      'aria-invalid': errorProp || undefined,
      defaultValue: undefined,
      ref: handleInputRef,
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

  const getIncrementButtonProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputIncrementButtonSlotProps<TOther> => {
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

  const getDecrementButtonProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputDecrementButtonSlotProps<TOther> => {
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

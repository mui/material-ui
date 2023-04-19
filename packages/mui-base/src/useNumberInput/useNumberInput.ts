import * as React from 'react';
import MuiError from '@mui/utils/macros/MuiError.macro';
import {
  // unstable_useControlled as useControlled, // TODO: do I need this?
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
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
import extractEventHandlers from '../utils/extractEventHandlers';

type StepDirection = 'up' | 'down';

// TODO
// 1 - make a proper parser
// 2 - accept a parser (func) prop
const parseInput = (v: string): string => {
  return v ? String(v.trim()) : String(v);
};

/**
 *
 * Demos:
 *
 * - [Unstyled Number Input](https://mui.com/base/react-number-input/#hook)
 *
 * API:
 *
 * - [useNumberInput API](https://mui.com/base/react-number-input/hooks-api/#use-number-input)
 */
export default function useNumberInput(
  parameters: UseNumberInputParameters,
): UseNumberInputReturnValue {
  const {
    min,
    max,
    step,
    shiftMultiplier = 10,
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    onValueChange,
    required: requiredProp = false,
    value: valueProp,
    inputRef: inputRefProp,
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

  const [focused, setFocused] = React.useState(false);

  // the "final" value
  const [value, setValue] = React.useState(valueProp ?? defaultValueProp);
  // the (potentially) dirty or invalid input value
  const [dirtyValue, setInputValue] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);

      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);

  const handleFocus =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Fix a bug with IE11 where the focus/blur events are triggered
      // while the component is disabled.
      if (formControlContext && formControlContext?.disabled) {
        event.stopPropagation();
        return;
      }

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
      // 1. clamp the number
      // 2. setInputValue(clamped_value)
      // 3. call onValueChange(newValue)
      let newValue;

      if (val === undefined) {
        newValue = val;
        setInputValue('');
      } else {
        newValue = clamp(val, min, max, step);
        setInputValue(String(newValue));
      }

      setValue(newValue);
      // TODO: integration with formControlContext
      //       OR: (event, newValue) similar to SelectUnstyled
      // formControlContext?.onValueChange?.(newValue);

      if (isNumber(newValue)) {
        onValueChange?.(event, newValue);
      } else {
        onValueChange?.(event, undefined);
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

      otherHandlers.onChange?.(event);

      const val = parseInput(event.currentTarget.value);

      if (val === '' || val === '-') {
        setInputValue(val);
        setValue(undefined);
      }

      if (val.match(/^-?\d+?$/)) {
        setInputValue(val);
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
          (event.nativeEvent instanceof KeyboardEvent &&
            ((event as React.KeyboardEvent).key === 'PageUp' ||
              (event as React.KeyboardEvent).key === 'PageDown'))
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

      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(event.key)) {
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
      'onChange',
      'onFocus',
      'onValueChange',
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
    const propsEventHandlers: Record<string, React.EventHandler<any> | undefined> = {
      onBlur,
      onChange,
      onFocus,
    };

    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    const mergedEventHandlers = {
      ...externalProps,
      ...externalEventHandlers,
      onFocus: handleFocus(externalEventHandlers),
      onChange: handleInputChange(externalEventHandlers),
      onBlur: handleBlur(externalEventHandlers),
      onKeyDown: handleKeyDown(externalEventHandlers),
    };

    const displayValue = (focused ? dirtyValue : value) ?? '';

    return {
      ...mergedEventHandlers,
      type: 'text',
      // TODO: check to see if SR support is still weird
      role: 'spinbutton',
      'aria-invalid': errorProp || undefined,
      defaultValue: defaultValueProp as number | undefined,
      ref: handleInputRef,
      value: displayValue as number | undefined,
      'aria-valuenow': displayValue as number | undefined,
      'aria-valuetext': String(displayValue),
      'aria-valuemin': min,
      'aria-valuemax': max,
      autoComplete: 'off',
      autoCorrect: 'off',
      required: requiredProp,
      'aria-disabled': disabledProp,
      disabled: disabledProp,
    };
  };

  const isIncrementDisabled = isNumber(value) ? value >= (max ?? Number.MAX_SAFE_INTEGER) : false;

  const getIncrementButtonProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputIncrementButtonSlotProps<TOther> => {
    return {
      ...externalProps,
      // the button should be tab-able if the input is readonly
      tabIndex: -1,
      disabled: isIncrementDisabled,
      'aria-disabled': isIncrementDisabled,
      onClick: handleStep('up'),
    };
  };

  const isDecrementDisabled = isNumber(value) ? value <= (min ?? Number.MIN_SAFE_INTEGER) : false;

  const getDecrementButtonProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputDecrementButtonSlotProps<TOther> => {
    return {
      ...externalProps,
      // the button should be tab-able if the input is readonly
      tabIndex: -1,
      disabled: isDecrementDisabled,
      'aria-disabled': isDecrementDisabled,
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
    // private and could be thrown out later
    inputValue: dirtyValue,
  };
}

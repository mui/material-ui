import * as React from 'react';
import MuiError from '@mui/utils/macros/MuiError.macro';
import {
  // unstable_useControlled as useControlled, // TODO: do I need this?
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { FormControlState, useFormControlContext } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputInputSlotProps,
  UseNumberInputChangeHandler,
  UseNumberInputReturnValue,
} from './useNumberInput.types';
import clamp from './clamp';
import extractEventHandlers from '../utils/extractEventHandlers';

type EventHandlers = {
  onBlur?: React.FocusEventHandler;
  onChange?: UseNumberInputChangeHandler;
  onFocus?: React.FocusEventHandler;
};

// TODO
// 1 - make a proper parser
// 2 - accept a parser (func) prop
const parseInput = (v: string): string => {
  return v ? String(v.trim()) : String(v);
};
/**
 *
 * API:
 *
 * - [useNumberInput API](https://mui.com/base/api/use-number-input/)
 */
export default function useNumberInput(
  parameters: UseNumberInputParameters,
): UseNumberInputReturnValue {
  const {
    // number
    min,
    max,
    step,
    //
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
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
  const [inputValue, setInputValue] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);

      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);

  const handleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLInputElement>) => {
      // Fix a bug with IE11 where the focus/blur events are triggered
      // while the component is disabled.
      if (formControlContext && formControlContext?.disabled) {
        event.stopPropagation();
        return;
      }

      otherHandlers.onFocus?.(event);

      if (formControlContext && formControlContext.onFocus) {
        formControlContext?.onFocus?.();
      }
      setFocused(true);
    };

  const handleChange =
    (otherHandlers: EventHandlers) =>
    (event: React.FocusEvent<HTMLInputElement>, val: number | undefined) => {
      // 1. clamp the number
      // 2. setInputValue(clamped_value)
      // 3. call onChange(event, returnValue)

      // console.log('handleChange', val);

      let newValue;

      if (val === undefined) {
        newValue = val;
        setInputValue('');
      } else {
        newValue = clamp(val, min, max, step);
        setInputValue(String(newValue));
      }

      setValue(newValue);

      formControlContext?.onChange?.(event /* newValue */);
      // TODO: pass an (optional) "newValue" to formControlContext.onChange, this will make FormControl work with Select too

      // @ts-ignore
      otherHandlers.onChange?.(event, newValue);
    };

  const handleInputChange = () => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new MuiError(
          'MUI: Expected valid input target. ' +
            'Did you use a custom `slots.input` and forget to forward refs? ' +
            'See https://mui.com/r/input-component-ref-interface for more info.',
        );
      }
    }

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
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLInputElement>) => {
      const val = parseInput(event.currentTarget.value);

      if (val === '' || val === '-') {
        handleChange(otherHandlers)(event, undefined);
      } else {
        handleChange(otherHandlers)(event, parseInt(val, 10));
      }

      otherHandlers.onBlur?.(event);

      if (formControlContext && formControlContext.onBlur) {
        formControlContext.onBlur();
      }

      setFocused(false);
    };

  const getInputProps = <TOther extends Record<string, any> = {}>(
    externalProps: TOther = {} as TOther,
  ): UseNumberInputInputSlotProps<TOther> => {
    const propsEventHandlers: EventHandlers = {
      onBlur,
      onChange,
      onFocus,
    };

    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    const mergedEventHandlers = {
      ...externalProps,
      ...externalEventHandlers,
      onFocus: handleFocus(externalEventHandlers),
      // TODO: will I ever need the other handlers?
      onChange: handleInputChange(/* externalEventHandlers */),
      onBlur: handleBlur(externalEventHandlers),
    };

    const displayValue = (focused ? inputValue : value) ?? '';

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

  return {
    disabled: disabledProp,
    error: errorProp,
    focused,
    formControlContext,
    getInputProps,
    // getIncrementButtonProps,
    // getDecrementButtonProps,
    // getRootProps,
    required: requiredProp,
    value: focused ? inputValue : value,
    // private and could be thrown out later
    inputValue,
  };
}

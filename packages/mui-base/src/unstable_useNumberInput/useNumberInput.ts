'use client';
import * as React from 'react';
import MuiError from '@mui/internal-babel-macros/MuiError.macro';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { useControllableReducer } from '../utils/useControllableReducer';
import { StateChangeCallback } from '../utils/useControllableReducer.types';
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
  NumberInputState,
  NumberInputActionContext,
  NumberInputReducerAction,
} from './useNumberInput.types';
import { NumberInputActionTypes, NumberInputAction } from './numberInputAction.types';
import { numberInputReducer } from './numberInputReducer';
import { isNumber } from './utils';

const STEP_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];

const SUPPORTED_KEYS = [...STEP_KEYS, 'Home', 'End'];

export function getInputValueAsString(v: string): string {
  return v ? String(v.trim()) : String(v);
}

/**
 *
 * Demos:
 *
 * - [Number Input](https://next.mui.com/base-ui/react-number-input/#hook)
 *
 * API:
 *
 * - [useNumberInput API](https://next.mui.com/base-ui/react-number-input/hooks-api/#use-number-input)
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
    componentName = 'useNumberInput',
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

  const handleStateChange: StateChangeCallback<NumberInputState> = React.useCallback(
    (event, field, fieldValue, reason) => {
      if (field === 'value' && typeof fieldValue !== 'string') {
        switch (reason) {
          // only a blur event will dispatch `numberInput:clamp`
          case 'numberInput:clamp':
            onChange?.(event as React.FocusEvent<HTMLInputElement>, fieldValue);
            break;
          case 'numberInput:increment':
          case 'numberInput:decrement':
          case 'numberInput:incrementToMax':
          case 'numberInput:decrementToMin':
            onChange?.(event as React.PointerEvent | React.KeyboardEvent, fieldValue);
            break;
          default:
            break;
        }
      }
    },
    [onChange],
  );

  const numberInputActionContext: NumberInputActionContext = React.useMemo(() => {
    return {
      min,
      max,
      step,
      shiftMultiplier,
      getInputValueAsString,
    };
  }, [min, max, step, shiftMultiplier]);

  const initialValue = valueProp ?? defaultValueProp ?? null;

  const initialState = {
    value: initialValue,
    inputValue: initialValue ? String(initialValue) : '',
  };

  const controlledState = React.useMemo(
    () => ({
      value: valueProp,
    }),
    [valueProp],
  );

  const [state, dispatch] = useControllableReducer<
    NumberInputState,
    NumberInputAction,
    NumberInputActionContext
  >({
    reducer: numberInputReducer as React.Reducer<NumberInputState, NumberInputReducerAction>,
    controlledProps: controlledState,
    initialState,
    onStateChange: handleStateChange,
    actionContext: React.useMemo(() => numberInputActionContext, [numberInputActionContext]),
    componentName,
  });

  const { value, inputValue } = state;

  React.useEffect(() => {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);

      onBlur?.();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);

  React.useEffect(() => {
    if (isControlled && isNumber(value)) {
      dispatch({
        type: NumberInputActionTypes.resetInputValue,
      });
    }
  }, [value, dispatch, isControlled]);

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

      dispatch({
        type: NumberInputActionTypes.inputChange,
        event,
        inputValue: event.currentTarget.value,
      });
    };

  const createHandleBlur =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.FocusEvent<HTMLInputElement> & MuiCancellableEvent) => {
      formControlContext?.onBlur();

      otherHandlers.onBlur?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      dispatch({
        type: NumberInputActionTypes.clamp,
        event,
        inputValue: event.currentTarget.value,
      });

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
      const applyMultiplier = Boolean(event.shiftKey);

      const actionType = {
        up: NumberInputActionTypes.increment,
        down: NumberInputActionTypes.decrement,
      }[direction];

      dispatch({
        type: actionType,
        event,
        applyMultiplier,
      });
    };

  const createHandleKeyDown =
    (otherHandlers: Partial<EventHandlers>) =>
    (event: React.KeyboardEvent<HTMLInputElement> & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);

      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // this prevents unintended page scrolling
      if (SUPPORTED_KEYS.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowUp':
          dispatch({
            type: NumberInputActionTypes.increment,
            event,
            applyMultiplier: !!event.shiftKey,
          });
          break;
        case 'ArrowDown':
          dispatch({
            type: NumberInputActionTypes.decrement,
            event,
            applyMultiplier: !!event.shiftKey,
          });
          break;
        case 'PageUp':
          dispatch({
            type: NumberInputActionTypes.increment,
            event,
            applyMultiplier: true,
          });
          break;
        case 'PageDown':
          dispatch({
            type: NumberInputActionTypes.decrement,
            event,
            applyMultiplier: true,
          });
          break;
        case 'Home':
          dispatch({
            type: NumberInputActionTypes.incrementToMax,
            event,
          });
          break;
        case 'End':
          dispatch({
            type: NumberInputActionTypes.decrementToMin,
            event,
          });
          break;
        default:
          break;
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

    const displayValue = (focused ? inputValue : value) ?? '';

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
    value,
    inputValue,
    isIncrementDisabled,
    isDecrementDisabled,
  };
}

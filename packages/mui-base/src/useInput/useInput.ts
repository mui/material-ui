'use client';
import * as React from 'react';
import MuiError from '@mui-internal/babel-macros/MuiError.macro';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { UseInputInputSlotProps, UseInputParameters, UseInputReturnValue } from './useInput.types';
import { FormControlState, useFormControlContext } from '../FormControl';
import { InputContext } from '../Input/InputContext';
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/#hook)
 *
 * API:
 *
 * - [useInput API](https://mui.com/base-ui/react-input/hooks-api/#use-input)
 */
export function useInput(parameters: UseInputParameters): UseInputReturnValue {
  const {
    defaultValue,
    disabled = false,
    error = false,
    onBlur,
    onChange,
    onFocus,
    required = false,
    value,
    inputRef: inputRefProp,
    focused,
    setFocused,
  } = parameters;

  const { current: isControlled } = React.useRef(value != null);
  const formControlContext: FormControlState | undefined = useFormControlContext();
  const inputContext = React.useContext(InputContext);

  if (!inputContext) {
    throw new MuiError('Base UI: InputInput must be used inside an Input.');
  }

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

  const handleFocus =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Fix a bug with IE11 where the focus/blur events are triggered
      // while the component is disabled.
      if (formControlContext?.disabled) {
        event.stopPropagation();
        return;
      }

      otherHandlers.onFocus?.(event);

      if (formControlContext && formControlContext.onFocus) {
        formControlContext?.onFocus?.();
      } else {
        setFocused(true);
      }
    };

  const handleBlur =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onBlur?.(event);

      if (formControlContext && formControlContext.onBlur) {
        formControlContext.onBlur();
      } else {
        setFocused(false);
      }
    };

  const handleChange =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.ChangeEvent<HTMLInputElement>, ...args: unknown[]) => {
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

      formControlContext?.onChange?.(event);

      // @ts-ignore
      otherHandlers.onChange?.(event, ...args);
    };

  const getProps = <ExternalProps extends Record<string, any> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseInputInputSlotProps<ExternalProps> => {
    const propsEventHandlers: Record<string, React.EventHandler<any> | undefined> = {
      onBlur,
      onChange,
      onFocus,
    };

    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    const mergedEventHandlers = {
      ...externalEventHandlers,
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers),
    };

    return {
      ...mergedEventHandlers,
      'aria-invalid': error || undefined,
      defaultValue: defaultValue as string | number | readonly string[] | undefined,
      value: value as string | number | readonly string[] | undefined,
      required,
      disabled,
      ...externalProps,
      ref: handleInputRef,
      ...mergedEventHandlers,
    };
  };

  return {
    disabled,
    error,
    focused,
    formControlContext,
    getProps,
    inputRef: handleInputRef,
    required,
    value,
  };
}

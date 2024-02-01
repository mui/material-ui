import * as React from 'react';
import { extractEventHandlers } from '../utils';
import {
  UseTextboxParameters,
  UseTextboxReturnValue,
  UseTextboxRootSlotProps,
} from './useTextbox.types';
import { FormControlState, useFormControlContext } from '../FormControl';
/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/#hook)
 *
 * API:
 *
 * - [useTextbox API](https://mui.com/base-ui/react-input/hooks-api/#use-textbox)
 */
export function useTextbox(parameters: UseTextboxParameters): UseTextboxReturnValue {
  const {
    inputRef,
    defaultValue: defaultValueParam,
    disabled: disabledParam = false,
    error: errorParam = false,
    required: requiredParam = false,
    value: valueParam,
    onBlur,
  } = parameters;

  const formControlContext: FormControlState | undefined = useFormControlContext();

  let defaultValue: unknown;
  let disabled: boolean;
  let error: boolean;
  let required: boolean;
  let value: unknown;

  if (formControlContext) {
    defaultValue = undefined;
    disabled = formControlContext.disabled ?? false;
    error = formControlContext.error ?? false;
    required = formControlContext.required ?? false;
    value = formControlContext.value;

    if (process.env.NODE_ENV !== 'production') {
      const definedLocalProps = (
        ['defaultValue', 'disabled', 'error', 'required', 'value'] as const
      ).filter((prop) => parameters[prop] !== undefined);

      if (definedLocalProps.length > 0) {
        console.warn(
          [
            'MUI: You have set props on an input that is inside a FormControl.',
            'Set these props on a FormControl instead. Otherwise they will be ignored.',
            `Ignored props: ${definedLocalProps.join(', ')}`,
          ].join('\n'),
        );
      }
    }
  } else {
    defaultValue = defaultValueParam;
    disabled = disabledParam;
    error = errorParam;
    required = requiredParam;
    value = valueParam;
  }

  const [focused, setFocused] = React.useState(false);

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);

      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabled, focused, onBlur]);

  const handleClick =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef?.current && event.currentTarget === event.target) {
        inputRef?.current.focus();
      }

      otherHandlers.onClick?.(event);
    };

  const getProps = <ExternalProps extends Record<string, any> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseTextboxRootSlotProps<ExternalProps> => {
    // onBlur, onChange and onFocus are forwarded to the input slot.
    const propsEventHandlers = extractEventHandlers(parameters, ['onBlur', 'onChange', 'onFocus']);
    const externalEventHandlers = { ...propsEventHandlers, ...extractEventHandlers(externalProps) };

    return {
      ...externalProps,
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
    };
  };

  return {
    getProps,
    defaultValue,
    disabled,
    error,
    focused,
    setFocused,
    formControlContext,
    required,
    value,
  };
}

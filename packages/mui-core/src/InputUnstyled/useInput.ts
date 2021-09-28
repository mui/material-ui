import * as React from 'react';
import MuiError from '@mui/utils/macros/MuiError.macro';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import useFormControl from '../FormControlUnstyled/useFormControl';
import extractEventHandlers from '../utils/extractEventHandlers';
import { UseInputProps } from './InputUnstyledProps';

export default function useInput(props: UseInputProps) {
  const {
    defaultValue,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    componentsProps = {},
    required: requiredProp = false,
    value: valueProp,
  } = props;

  const formControlContext = useFormControl();

  let value: unknown;
  let required: boolean;
  let disabled: boolean;
  let error: boolean;

  if (formControlContext) {
    value = formControlContext.value;
    disabled = formControlContext.disabled ?? false;
    required = formControlContext.required ?? false;
    error = formControlContext.error ?? false;
  } else {
    value = componentsProps.input?.value ?? valueProp;
    disabled = componentsProps.input?.disabled ?? disabledProp;
    required = componentsProps.input?.required ?? requiredProp;
    error = errorProp;
  }

  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef<HTMLInputElement | null>();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'Material-UI: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `ref` prop.',
            'Make sure the `ref` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const handleInputPropsRefProp = useForkRef(componentsProps.input?.ref, handleInputRefWarning);
  const handleInputRef = useForkRef(inputRef, handleInputPropsRefProp);

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

  const handleFocus =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
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
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      otherHandlers.onBlur?.(event);

      if (formControlContext && formControlContext.onBlur) {
        formControlContext.onBlur();
      } else {
        setFocused(false);
      }
    };

  const handleChange =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>, ...args: unknown[]) => {
      if (!isControlled) {
        const element = event.target || inputRef.current;
        if (element == null) {
          throw new MuiError(
            'Material-UI: Expected valid input target. ' +
              'Did you use a custom `components.Input` and forget to forward refs? ' +
              'See https://material-ui.com/r/input-component-ref-interface for more info.',
          );
        }
      }

      formControlContext?.onChange?.(event);

      // @ts-ignore
      otherHandlers.onChange?.(event, ...args);
    };

  const handleClick =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }

      otherHandlers.onClick?.(event);
    };

  const getRootProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    // onBlur, onChange and onFocus are forwarded to the input slot.
    const propsEventHandlers = extractEventHandlers(props, ['onBlur', 'onChange', 'onFocus']);
    const slotEventHandlers = extractEventHandlers(componentsProps.root);
    const externalEventHandlers = { ...propsEventHandlers, ...slotEventHandlers, ...otherHandlers };

    return {
      ...externalEventHandlers,
      onClick: handleClick(externalEventHandlers),
    };
  };

  const getInputProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const propsEventHandlers: Record<string, React.EventHandler<any> | undefined> = {
      onBlur,
      onChange,
      onFocus,
    };

    const slotEventHandlers = extractEventHandlers(componentsProps.input);

    const externalEventHandlers = { ...propsEventHandlers, ...slotEventHandlers, ...otherHandlers };

    const mergedEventHandlers: Record<string, React.EventHandler<any>> = {
      ...externalEventHandlers,
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers),
    };

    return {
      'aria-invalid': error || undefined,
      defaultValue: defaultValue as string | number | readonly string[] | undefined,
      ref: handleInputRef,
      value: value as string | number | readonly string[] | undefined,
      required,
      disabled,
      ...mergedEventHandlers,
    };
  };

  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value,
  };
}

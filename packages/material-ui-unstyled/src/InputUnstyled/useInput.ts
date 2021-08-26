import * as React from 'react';
import MuiError from '@material-ui/utils/macros/MuiError.macro';
import { unstable_useForkRef as useForkRef } from '@material-ui/utils';
import useFormControl from '../FormControlUnstyled/useFormControl';

export function hasValue(value: unknown) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

export function isFilled(obj: HTMLInputElement | HTMLTextAreaElement, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

export interface InputProps {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled?: boolean;
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  componentsProps?: {
    root?: React.HTMLAttributes<HTMLDivElement>;
    input?: React.ComponentPropsWithRef<'input'>;
  };
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  value?: unknown;
}

export default function useInput(props: InputProps) {
  const {
    defaultValue,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onClick,
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

      // TODO: call onBlur from getRootProps' overrides
      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabled, focused, onBlur]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (formControlContext?.disabled) {
      event.stopPropagation();
      return;
    }

    onFocus?.(event);
    componentsProps.input?.onFocus?.(event);

    if (formControlContext && formControlContext.onFocus) {
      formControlContext?.onFocus?.();
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    componentsProps.input?.onBlur?.(event);

    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, ...args: unknown[]) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new MuiError(
          'Material-UI: Expected valid input target. ' +
            'Did you use a custom `inputComponent` and forget to forward refs? ' +
            'See https://material-ui.com/r/input-component-ref-interface for more info.',
        );
      }
    }

    formControlContext?.onChange?.(event);

    // @ts-ignore
    componentsProps.input?.onChange?.(event, ...args);
    // @ts-ignore
    onChange?.(event, ...args);
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    onClick?.(event);
  };

  return {
    getRootProps: () => ({
      onClick: handleClick,
    }),
    getInputProps: () => ({
      'aria-invalid': error || undefined,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled,
      onBlur: handleBlur,
      onChange: handleChange,
      onFocus: handleFocus,
    }),
    disabled,
    error,
    focused,
    formControlContext,
    required,
    value,
  };
}

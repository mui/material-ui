'use client';
import * as React from 'react';
import clsx from 'clsx';
import { getTextboxUtilityClass } from '../Textbox/textboxClasses';
import { TextareaOwnerState, TextareaProps } from './Textarea.types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { useTextbox } from '../useTextbox';
import { TextareaContext } from './TextareaContext';

const useUtilityClasses = (ownerState: TextareaOwnerState) => {
  const { disabled, error, focused, formControlContext } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      Boolean(formControlContext) && 'formControl',
    ],
    input: ['input', disabled && 'disabled'],
  };

  return composeClasses(slots, useClassNamesOverride(getTextboxUtilityClass));
};

function defaultRender(props: React.ComponentPropsWithRef<'div'>) {
  return <div {...props} />;
}

const Textarea = React.forwardRef(function Textarea(
  props: TextareaProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    children,
    className,
    defaultValue,
    disabled: disabledProp,
    error: errorProp,
    id,
    name,
    onChange,
    onKeyDown,
    onKeyUp,
    onBlur,
    render: renderProp,
    required: requiredProp,
    value,
    type = 'text',
    minRows,
    maxRows,
    rows,
    ...other
  } = props;

  const render = renderProp ?? defaultRender;

  const inputRef = React.useRef<HTMLElement | null>(null);

  const { getProps, disabled, error, required, focused, setFocused, formControlContext } =
    useTextbox({
      ...props,
      inputRef,
    });

  const ownerState: TextareaOwnerState = React.useMemo(
    () => ({
      disabled,
      error,
      focused,
      formControlContext,
      required,
      type,
      minRows,
      maxRows,
      rows,
    }),
    [disabled, error, formControlContext, required, type, focused, minRows, maxRows, rows],
  );

  const classes = useUtilityClasses(ownerState);

  const rootProps = getProps({
    ...other,
    children,
    ref: forwardedRef,
    type,
    className: clsx([className, classes.root]),
  });

  const registerInput = React.useCallback((element: HTMLElement | null) => {
    inputRef.current = element;
  }, []);

  const contextValue = React.useMemo(
    () => ({
      registerInput,
      focused,
      setFocused,
      ownerState,
      defaultValue,
      value,
      onChange,
      minRows,
      maxRows,
      rows,
    }),
    [
      focused,
      setFocused,
      ownerState,
      registerInput,
      defaultValue,
      value,
      onChange,
      minRows,
      maxRows,
      rows,
    ],
  );

  return (
    <TextareaContext.Provider value={contextValue}>
      {render(rootProps, ownerState)}
    </TextareaContext.Provider>
  );
});

export { Textarea };

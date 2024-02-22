'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MuiError from '@mui/internal-babel-macros/MuiError.macro';
import useForkRef from '@mui/utils/useForkRef';
import { FormControlState, useFormControlContext } from '../FormControl';
import { getTextareaUtilityClass } from './textareaClasses';
import { TextareaOwnerState, TextareaProps } from './Textarea.types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { TextareaAutosize } from '../TextareaAutosize';

const useUtilityClasses = (ownerState: TextareaOwnerState) => {
  const { disabled, error, focused, formControlContext, readOnly } = ownerState;

  const slots = {
    textarea: [
      'textarea',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      readOnly && 'readOnly',
      Boolean(formControlContext) && 'formControl',
    ],
  };

  return composeClasses(slots, useClassNamesOverride(getTextareaUtilityClass));
};

const Textarea = React.forwardRef(function Textarea(
  props: TextareaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const {
    defaultValue: defaultValueProp,
    value: valueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    required: requiredProp = false,
    onBlur,
    onChange,
    onFocus,
    //
    // 'aria-describedby': ariaDescribedby,
    // 'aria-label': ariaLabel,
    // 'aria-labelledby': ariaLabelledby,
    // autoComplete,
    // autoFocus,
    className,
    // id,
    // name,
    // onClick,
    // onKeyDown,
    // onKeyUp,
    // placeholder,
    readOnly = false,
    // rows,
    minRows,
    maxRows,
    // slotProps = {},
    // slots = {},
    ...other
  } = props;

  const formControlContext: FormControlState | undefined = useFormControlContext();

  let defaultValue;
  let disabled: boolean;
  let error: boolean;
  let required: boolean;
  let value;

  if (formControlContext) {
    defaultValue = undefined;
    disabled = formControlContext.disabled ?? false;
    error = formControlContext.error ?? false;
    required = formControlContext.required ?? false;
    value = formControlContext.value as string | undefined;

    if (process.env.NODE_ENV !== 'production') {
      const definedLocalProps = (
        ['defaultValue', 'disabled', 'error', 'required', 'value'] as const
      ).filter((prop) => props[prop] !== undefined);

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
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }

  const { current: isControlled } = React.useRef(value != null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleTextareaRef = useForkRef(textareaRef, forwardedRef); // no input ref warning because you cannot override the <textarea> element

  const [focused, setFocused] = React.useState(false);

  const ownerState: TextareaOwnerState = {
    focused,
    disabled,
    error,
    required,
    readOnly,
    formControlContext,
  };

  const classes = useUtilityClasses(ownerState);

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);

      // @ts-ignore
      onBlur?.();
    }
  }, [formControlContext, disabled, focused, onBlur]);

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (formControlContext?.disabled) {
      event.stopPropagation();
      return;
    }

    onFocus?.(event);

    if (formControlContext && formControlContext.onFocus) {
      formControlContext?.onFocus?.();
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(event);

    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, ...args: unknown[]) => {
    if (!isControlled) {
      const element = event.target || textareaRef.current;
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
    onChange?.(event, ...args);
  };

  if (process.env.NODE_ENV !== 'production') {
    if (other.rows) {
      if (minRows || maxRows) {
        console.warn(
          'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
        );
      }
    }
  }

  return (
    <TextareaAutosize
      ref={handleTextareaRef}
      value={value as string | number | readonly string[] | undefined}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      minRows={minRows}
      maxRows={maxRows}
      className={clsx([className, classes.textarea])}
      {...other}
    />
  );
});

Textarea.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  error: PropTypes.bool,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.number,
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.number,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * @ignore
   */
  rows: PropTypes.number,
  /**
   * @ignore
   */
  value: PropTypes.any,
} as any;

export { Textarea };

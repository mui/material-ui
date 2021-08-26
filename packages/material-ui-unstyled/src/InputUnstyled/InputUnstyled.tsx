import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import appendOwnerState from '../utils/appendOwnerState';
import classes from './inputUnstyledClasses';
import { InputUnstyledProps } from './InputUnstyledProps';
import useInput from './useInput';

const InputUnstyled = React.forwardRef(function InputUnstyled(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    error,
    id,
    maxRows,
    minRows,
    multiline = false,
    name,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    rows,
    type = 'text',
    value,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState,
  } = useInput(props);

  const ownerState = {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type,
  };

  const rootStateClasses = {
    [classes.disabled]: disabled,
    [classes.error]: error,
    [classes.focused]: focused,
    [classes.formControl]: formControlContext,
    [classes.multiline]: multiline,
  };

  const inputStateClasses = {
    [classes.disabled]: disabled,
    [classes.multiline]: multiline,
  };

  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };

  const Root = component ?? components.Root ?? 'div';
  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...getRootProps(),
      ...componentsProps.root,
      className: clsx(classes.root, rootStateClasses, className, componentsProps.root?.className),
    },
    ownerState,
  );

  let Input = components.Input ?? 'input';
  let inputProps = appendOwnerState(
    Input,
    {
      ...propsToForward,
      ...getInputProps(),
      ...componentsProps.input,
      className: clsx(classes.input, inputStateClasses, componentsProps.input?.className),
    },
    ownerState,
  );

  if (multiline && Input === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn(
            'Material-UI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
      inputProps = {
        type: undefined,
        minRows: rows,
        maxRows: rows,
        ...inputProps,
      };
    } else {
      inputProps = {
        type: undefined,
        maxRows,
        minRows,
        ...inputProps,
      };
    }

    Input = components.Textarea ?? 'textarea';
  }

  return (
    <Root {...rootProps} ref={ref}>
      <Input {...inputProps} />
    </Root>
  );
});

InputUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool.isRequired,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
} as any;

export default InputUnstyled;

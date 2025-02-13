'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import { isHostComponent } from '../utils/isHostComponent';
import { getInputUtilityClass } from './inputClasses';
import {
  InputInputSlotProps,
  InputOwnerState,
  InputProps,
  InputRootSlotProps,
  InputTypeMap,
} from './Input.types';
import { useInput } from '../useInput';
import { EventHandlers, useSlotProps, WithOptionalOwnerState } from '../utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = (ownerState: InputOwnerState) => {
  const { disabled, error, focused, formControlContext, multiline, startAdornment, endAdornment } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      Boolean(formControlContext) && 'formControl',
      multiline && 'multiline',
      Boolean(startAdornment) && 'adornedStart',
      Boolean(endAdornment) && 'adornedEnd',
    ],
    input: ['input', disabled && 'disabled', multiline && 'multiline'],
  };

  return composeClasses(slots, useClassNamesOverride(getInputUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/)
 *
 * API:
 *
 * - [Input API](https://mui.com/base-ui/react-input/components-api/#input)
 */
const Input = React.forwardRef(function Input<RootComponentType extends React.ElementType>(
  props: InputProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    startAdornment,
    value,
    type: typeProp,
    rows,
    slotProps = {},
    slots = {},
    minRows,
    maxRows,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState,
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value,
  });

  const type = !multiline ? (typeProp ?? 'text') : undefined;

  const ownerState: InputOwnerState = {
    ...props,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type,
  };

  const classes = useUtilityClasses(ownerState);

  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
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

  const Root = slots.root ?? 'div';
  const rootProps: WithOptionalOwnerState<InputRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root, className],
  });
  const InputComponent = multiline ? (slots.textarea ?? 'textarea') : (slots.input ?? 'input');
  const inputProps: WithOptionalOwnerState<InputInputSlotProps> = useSlotProps({
    elementType: InputComponent,
    getSlotProps: (otherHandlers: EventHandlers) => {
      return getInputProps({
        ...propsToForward,
        ...otherHandlers,
      });
    },
    externalSlotProps: slotProps.input,
    additionalProps: {
      rows: multiline ? rows : undefined,
      ...(multiline &&
        !isHostComponent(InputComponent) && {
          minRows: rows || minRows,
          maxRows: rows || maxRows,
        }),
    },
    ownerState,
    className: classes.input,
  });

  if (process.env.NODE_ENV !== 'production') {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn(
            'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
    }
  }

  return (
    <Root {...rootProps}>
      {startAdornment}
      <InputComponent {...inputProps} />
      {endAdornment}
    </Root>
  );
}) as PolymorphicComponent<InputTypeMap>;

Input.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  'aria-labelledby': PropTypes.string,
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
   * Class name applied to the root element.
   */
  className: PropTypes.string,
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
   * Trailing adornment for this input.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * @ignore
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
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
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
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
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
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
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
} as any;

export { Input };

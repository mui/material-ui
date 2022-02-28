import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useControlled as useControlled } from '@mui/utils';
import {
  FormControlUnstyledContext,
  NativeFormControlElement,
} from '@mui/base/FormControlUnstyled';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { FormControlProps, FormControlTypeMap } from './FormControlProps';
import formControlClasses, { getFormControlUtilityClass } from './formControlClasses';

function hasValue(value: unknown) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}

const useUtilityClasses = (ownerState: FormControlProps & { filled: boolean }) => {
  const { disabled, error, focused, required, filled } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      required && 'required',
      filled && 'filled',
    ],
  };

  return composeClasses(slots, getFormControlUtilityClass, {});
};

const FormControlRoot = styled('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormControlProps }>(({ theme, ownerState }) => ({
  '--FormControl-gap': '0.25rem',
  '--FormLabel-asterisk-color': theme.vars.palette.danger[500],
  '--FormHelperText-color': theme.vars.palette[ownerState.color!]?.[500],
  [`&.${formControlClasses.error}`]: {
    '--FormHelperText-color': theme.vars.palette.danger[500],
  },
  [`&.${formControlClasses.disabled}`]: {
    '--FormLabel-color': theme.vars.palette.neutral.textDisabledColor,
    '--FormHelperText-color': theme.vars.palette.neutral.textDisabledColor,
  },
  display: 'flex',
  flexDirection: 'column',
}));

const FormControl = React.forwardRef(function FormControl(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiFormControl',
  });

  const {
    color,
    variant = 'outlined',
    size = 'md',
    defaultValue,
    children,
    className,
    component,
    disabled = false,
    error = false,
    focused: visuallyFocused,
    onChange,
    required = false,
    value: incomingValue,
    ...other
  } = props;

  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: 'FormControl',
    state: 'value',
  });

  const filled = hasValue(value);

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  const ownerState = {
    ...props,
    color,
    variant,
    size,
    disabled,
    error,
    filled,
    focused,
    required,
  };

  let registerEffect = () => {};
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'MUI: There are multiple `Input` components inside a FormControl.',
            'This creates visual inconsistencies, only use one `Input`.',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const handleChange = (event: React.ChangeEvent<NativeFormControlElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  const childContext = {
    color,
    variant,
    size,
    disabled,
    error,
    filled,
    focused,
    onBlur: () => {
      setFocused(false);
    },
    onChange: handleChange,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    value,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FormControlUnstyledContext.Provider value={childContext}>
      <FormControlRoot
        ref={ref}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        {...other}
      >
        {children}
      </FormControlRoot>
    </FormControlUnstyledContext.Provider>
  );
}) as OverridableComponent<FormControlTypeMap>;

FormControl.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default FormControl;

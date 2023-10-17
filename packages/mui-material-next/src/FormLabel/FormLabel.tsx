'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import useFormControl from '../FormControl/useFormControl';
import { useThemeProps, styled } from '../styles';
import formLabelClasses, { getFormLabelUtilityClasses } from './formLabelClasses';
import { FormLabelProps, FormLabelTypeMap, FormLabelOwnerState } from './FormLabel.types';

const useUtilityClasses = (ownerState: FormLabelOwnerState) => {
  const { classes, color, focused, disabled, error, filled, required } = ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      filled && 'filled',
      focused && 'focused',
      required && 'required',
    ],
    asterisk: ['asterisk', error && 'error'],
  };

  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};

export const FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => {
    return [
      styles.root,
      ownerState.color === 'secondary' && styles.colorSecondary,
      ownerState.filled && styles.filled,
    ];
  },
})<{ ownerState: FormLabelOwnerState }>(({ theme, ownerState }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body1,
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  [`&.${formLabelClasses.focused}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main,
  },
  [`&.${formLabelClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
  },
  [`&.${formLabelClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main,
  },
}));

const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})<{ ownerState: FormLabelOwnerState }>(({ theme }) => ({
  [`&.${formLabelClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main,
  },
}));

const FormLabel = React.forwardRef(function FormLabel<
  RootComponentType extends React.ElementType = FormLabelTypeMap['defaultComponent'],
>(inProps: FormLabelProps<RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormLabel' });
  const {
    children,
    color: colorProp = 'primary',
    component = 'label',
    disabled: disabledProp,
    error: errorProp,
    filled: filledProp,
    focused: focusedProp,
    required: requiredProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const muiFormControl = useFormControl();

  const required = requiredProp ?? muiFormControl?.required;

  const ownerState = {
    ...props,
    color: muiFormControl?.color ?? colorProp,
    component,
    disabled: muiFormControl?.disabled ?? disabledProp,
    error: errorProp ?? muiFormControl?.error,
    filled: muiFormControl?.filled ?? filledProp,
    focused: focusedProp ?? muiFormControl?.focused,
    required,
  };

  const classes = useUtilityClasses(ownerState);

  const RootSlot = slots?.root ?? FormLabelRoot;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      as: component,
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root],
  });

  return (
    <RootSlot {...rootProps}>
      {children}
      {required && (
        <AsteriskComponent ownerState={ownerState} aria-hidden className={classes.asterisk}>
          &thinsp;{'*'}
        </AsteriskComponent>
      )}
    </RootSlot>
  );
});

FormLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default FormLabel;

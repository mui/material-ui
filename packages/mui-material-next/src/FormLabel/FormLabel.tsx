'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps, styled } from '../styles';
import useFormControl from '../FormControl/useFormControl';
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
})<{ ownerState: FormLabelOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const pxFontSize = tokens.sys.typescale.body.large.size;

  const letterSpacing = `${theme.sys.typescale.body.large.tracking / pxFontSize}rem`;

  return {
    '--md-comp-form-label-color': tokens.sys.color.secondary,
    '--md-comp-form-label-font-family': tokens.sys.typescale.body.large.family,
    '--md-comp-form-label-font-size': theme.typography.pxToRem(pxFontSize), // the pxToRem should be moved to typescale in the future,
    '--md-comp-form-label-font-weight': tokens.sys.typescale.body.large.weight,
    '--md-comp-form-label-letter-spacing': letterSpacing,
    '--md-comp-form-label-line-height': '1.5rem',
    '--md-comp-form-label-disabled-color': tokens.sys.color.onSurface,
    '--md-comp-form-label-disabled-opacity': 0.38,
    '--md-comp-form-label-error-color': tokens.sys.color.error,
    '--md-comp-form-label-focus-color': tokens.sys.color[ownerState.color],
    color: 'var(--md-comp-form-label-color)',
    fontFamily: 'var(--md-comp-form-label-font-family)',
    fontSize: 'var(--md-comp-form-label-font-size)',
    fontWeight: 'var(--md-comp-form-label-font-weight)',
    lineHeight: 'var(--md-comp-form-label-line-height)',
    padding: 0,
    position: 'relative',
    [`&.${formLabelClasses.focused}`]: {
      color: 'var(--md-comp-form-label-focus-color)',
    },
    [`&.${formLabelClasses.disabled}`]: {
      color:
        'color-mix(in srgb, var(--md-comp-form-label-disabled-color) calc(var(--md-comp-form-label-disabled-opacity) * 100%), transparent)',
    },
    [`&.${formLabelClasses.error}`]: {
      color: 'var(--md-comp-form-label-error-color)',
    },
  };
});

const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (_props, styles) => styles.asterisk,
})<{ ownerState: FormLabelOwnerState }>(() => ({
  [`&.${formLabelClasses.error}`]: {
    color: 'var(--md-comp-form-label-error-color)',
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

  const ownerState: FormLabelOwnerState = {
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
}) as OverridableComponent<FormLabelTypeMap>;

FormLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'tertiary', 'success', 'warning']),
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
   * The props used for each slot inside the FormLabel.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the FormLabel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default FormLabel;

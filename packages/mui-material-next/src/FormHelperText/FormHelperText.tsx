'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps, styled } from '../styles';
import useFormControl from '../FormControl/useFormControl';
import formHelperTextClasses, { getFormHelperTextUtilityClasses } from './formHelperTextClasses';
import {
  FormHelperTextOwnerState,
  FormHelperTextProps,
  FormHelperTextTypeMap,
} from './FormHelperText.types';

const useUtilityClasses = (ownerState: FormHelperTextOwnerState) => {
  const { classes, contained, size, disabled, error, filled, focused, required } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      size && `size${capitalize(size)}`,
      contained && 'contained',
      focused && 'focused',
      filled && 'filled',
      required && 'required',
    ],
  };

  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};

const FormHelperTextRoot = styled('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.size && styles[`size${capitalize(ownerState.size)}`],
      ownerState.contained && styles.contained,
      ownerState.filled && styles.filled,
    ];
  },
})<{ ownerState: FormHelperTextOwnerState }>(({ theme, ownerState }) => {
  const { vars: tokens } = theme;

  const pxFontSize = theme.sys.typescale.body.small.size;
  const lineHeight = `calc(${tokens.sys.typescale.body.small.lineHeight} / ${pxFontSize})`;

  return {
    '--md-comp-form-helper-text-color': tokens.sys.color.onSurfaceVariant,
    '--md-comp-form-helper-text-font-family': tokens.sys.typescale.body.small.family,
    '--md-comp-form-helper-text-font-size': theme.typography.pxToRem(pxFontSize), // the pxToRem should be moved to typescale in the future,
    '--md-comp-form-helper-text-font-weight': tokens.sys.typescale.body.small.weight,
    '--md-comp-form-helper-text-line-height': lineHeight,
    '--md-comp-form-helper-text-disabled-color': tokens.sys.color.onSurface,
    '--md-comp-form-helper-text-disabled-opacity': 0.38,
    '--md-comp-form-helper-text-error-color': tokens.sys.color.error,
    color: 'var(--md-comp-form-helper-text-color)',
    fontFamily: 'var(--md-comp-form-helper-text-font-family)',
    fontSize: 'var(--md-comp-form-helper-text-font-size)',
    lineHeight: `var(--md-comp-form-helper-text-line-height)`,
    textAlign: 'left',
    marginTop: 3,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    [`&.${formHelperTextClasses.disabled}`]: {
      color:
        'color-mix(in srgb, var(--md-comp-form-helper-text-disabled-color) calc(var(--md-comp-form-helper-text-disabled-opacity) * 100%), transparent)',
    },
    [`&.${formHelperTextClasses.error}`]: {
      color: 'var(--md-comp-form-helper-text-error-color)',
    },
    ...(ownerState.size === 'small' && {
      marginTop: 4,
    }),
    ...(ownerState.contained && {
      marginLeft: 16,
      marginRight: 16,
    }),
  };
});

const FormHelperText = React.forwardRef(function FormHelperText<
  RootComponentType extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
>(inProps: FormHelperTextProps<RootComponentType>, forwardedRef: React.ForwardedRef<Element>) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormHelperText' });
  const {
    children,
    component = 'p',
    disabled: disabledProp,
    error: errorProp,
    filled: filledProp,
    focused: focusedProp,
    margin,
    required: requiredProp,
    size: sizeProp,
    variant: variantProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const muiFormControl = useFormControl();

  const variant = variantProp ?? muiFormControl?.variant ?? '';

  const ownerState: FormHelperTextOwnerState = {
    ...props,
    component,
    contained: variant === 'filled' || variant === 'outlined',
    variant,
    size: sizeProp ?? muiFormControl?.size,
    disabled: disabledProp ?? muiFormControl?.disabled,
    error: errorProp ?? muiFormControl?.error,
    filled: filledProp ?? muiFormControl?.filled,
    focused: focusedProp ?? muiFormControl?.focused,
    required: requiredProp ?? muiFormControl?.required,
  };

  const classes = useUtilityClasses(ownerState);

  const RootSlot = slots?.root ?? FormHelperTextRoot;

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
      {children === ' ' ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        <span className="notranslate">&#8203;</span>
      ) : (
        children
      )}
    </RootSlot>
  );
}) as OverridableComponent<FormHelperTextTypeMap>;

FormHelperText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the FormHelperText.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the FormHelperText.
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
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
} as any;

export default FormHelperText;

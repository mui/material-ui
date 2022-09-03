import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId, unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import FormControlContext from './FormControlContext';
import formControlClasses, { getFormControlUtilityClass } from './formControlClasses';
import { FormControlProps, FormControlOwnerState, FormControlTypeMap } from './FormControlProps';

const useUtilityClasses = (ownerState: FormControlOwnerState) => {
  const { disabled, error, size, color, variant } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getFormControlUtilityClass, {});
};

export const FormControlRoot = styled('div', {
  name: 'JoyFormControl',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormControlOwnerState }>(({ theme, ownerState }) => ({
  '--FormLabel-margin': '0 0 0.25rem 0',
  '--FormHelperText-margin': '0.25rem 0 0 0',
  '--FormLabel-asterisk-color': theme.vars.palette.danger[500],
  '--FormHelperText-color': theme.vars.palette[ownerState.color!]?.[500],
  ...(ownerState.size === 'sm' && {
    '--FormLabel-fontSize': theme.vars.fontSize.xs,
    '--FormHelperText-fontSize': theme.vars.fontSize.xs,
  }),
  ...(ownerState.size === 'md' && {
    '--FormLabel-fontSize': theme.vars.fontSize.sm,
    '--FormHelperText-fontSize': theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'lg' && {
    '--FormLabel-fontSize': theme.vars.fontSize.md,
    '--FormHelperText-fontSize': theme.vars.fontSize.md,
  }),
  [`&.${formControlClasses.error}`]: {
    '--FormHelperText-color': theme.vars.palette.danger[500],
  },
  [`&.${formControlClasses.disabled}`]: {
    '--FormLabel-color': theme.vars.palette[ownerState.color || 'neutral']?.plainDisabledColor,
    '--FormHelperText-color': theme.vars.palette[ownerState.color || 'neutral']?.plainDisabledColor,
  },
  display: 'flex',
  flexDirection: 'column',
}));

const FormControl = React.forwardRef(function FormControl(inProps, ref) {
  const props = useThemeProps<typeof inProps & FormControlProps>({
    props: inProps,
    name: 'JoyFormControl',
  });

  const {
    id: idOverride,
    className,
    component = 'div',
    disabled = false,
    required = false,
    error = false,
    variant = 'outlined',
    color = 'neutral',
    size = 'md',
    ...other
  } = props;

  const id = useId(idOverride);
  const helperTextId = `${id}-helper-text`;
  const [helperText, setHelperText] = React.useState<HTMLElement | null>(null);

  const ownerState = {
    ...props,
    id,
    component,
    color,
    disabled,
    error,
    required,
    size,
    variant,
  };

  const childContext = {
    disabled,
    required,
    error,
    variant,
    color,
    size,
    htmlFor: id,
    'aria-describedby': helperText ? helperTextId : undefined,
    setHelperText,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FormControlContext.Provider value={childContext}>
      <FormControlRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      />
    </FormControlContext.Provider>
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default FormControl;

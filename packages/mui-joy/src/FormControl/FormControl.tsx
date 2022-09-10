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
  const { disabled, error, size, color } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
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
  '--FormLabel-margin':
    ownerState.orientation === 'horizontal' ? '0 0.375rem 0 0' : '0 0 0.375rem 0',
  '--FormHelperText-margin': '0.375rem 0 0 0',
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
  position: 'relative', // for keeping the control action area, e.g. Switch
  flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
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
    color,
    size = 'md',
    ...other
  } = props;

  const id = useId(idOverride);
  const labelId = `${id}-label`;
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
  };

  let registerEffect: undefined | (() => () => void);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'Joy: A FormControl can contain only one Input, Textarea, or Select component',
            'You should not mix those components inside a single FormControl instance',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const classes = useUtilityClasses(ownerState);

  return (
    <FormControlContext.Provider
      value={{
        disabled,
        required,
        error,
        color,
        size,
        htmlFor: id,
        labelId,
        'aria-describedby': helperText ? helperTextId : undefined,
        setHelperText,
        registerEffect: registerEffect!,
      }}
    >
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
   * If `true`, the children are in disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the children will indicate an error.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The content direction flow.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the user must specify a value for the input before the owning form can be submitted.
   * If `true`, the asterisk appears on the FormLabel.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default FormControl;

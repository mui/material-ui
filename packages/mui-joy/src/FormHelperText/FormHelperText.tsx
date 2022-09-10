import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { styled, useThemeProps } from '../styles';
import { FormHelperTextProps, FormHelperTextTypeMap } from './FormHelperTextProps';
import { getFormHelperTextUtilityClass } from './formHelperTextClasses';
import FormControlContext from '../FormControl/FormControlContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getFormHelperTextUtilityClass, {});
};

const FormHelperTextRoot = styled('p', {
  name: 'JoyFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormHelperTextProps }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: `var(--FormHelperText-fontSize, ${theme.vars.fontSize.sm})`,
  lineHeight: theme.vars.lineHeight.sm,
  color: `var(--FormHelperText-color, ${theme.vars.palette.text.secondary})`,
  margin: 'var(--FormHelperText-margin, 0px)',
}));

const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyFormHelperText',
  });

  const { children, component, ...other } = props;
  const rootRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(rootRef, ref);
  const formControl = React.useContext(FormControlContext);
  const setHelperText = formControl?.setHelperText;

  React.useEffect(() => {
    setHelperText?.(rootRef.current);
    return () => {
      setHelperText?.(null);
    };
  }, [setHelperText]);

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

  const rootProps = useSlotProps({
    elementType: FormHelperTextRoot,
    externalSlotProps: {},
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref: handleRef,
      as: component,
      id: formControl?.['aria-describedby'],
    },
    className: classes.root,
  });

  return <FormHelperTextRoot {...rootProps}>{children}</FormHelperTextRoot>;
}) as OverridableComponent<FormHelperTextTypeMap>;

FormHelperText.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
} as any;

export default FormHelperText;

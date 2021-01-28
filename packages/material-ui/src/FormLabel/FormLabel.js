import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses, isHostComponent } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import formLabelClasses, { getFormLabelUtilityClasses } from './formLabelClasses';

export const overridesResolver = ({ styleProps }, styles) => {
  return deepmerge(styles.root || {}, {
    ...(styleProps.color === 'secondary' && styles.colorSecondary),
    ...(styleProps.filled && styles.filled),
    [`& .${formLabelClasses.asterisk}`]: {
      ...styles.asterisk,
    },
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, color, focused, disabled, error, filled, required } = styleProps;
  const slots = {
    root: [
      'root',
      `color${capitalize(color || 'primary')}`,
      error && 'error',
      focused && 'focused',
      disabled && 'disabled',
      filled && 'filled',
      required && 'required',
    ],
    asterisk: ['asterisk', error && 'error'],
  };

  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};

export const FormLabelRoot = experimentalStyled(
  'label',
  {},
  { name: 'MuiFormLabel', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  color: theme.palette.text.secondary,
  ...theme.typography.body1,
  lineHeight: 1,
  padding: 0,
  '&.Mui-focused': {
    color: theme.palette.primary.main,
    ...(styleProps.color === 'secondary' && {
      color: theme.palette.secondary.main,
    }),
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

const AsteriskComponent = experimentalStyled(
  'span',
  {},
  { name: 'MuiFormLabel', slot: 'Asterisk', overridesResolver },
)(({ theme }) => ({
  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormLabel' });
  const {
    children,
    color,
    component = 'label',
    components = {},
    componentsProps = {},
    disabled,
    error,
    filled,
    focused,
    required,
    className,
    /* eslint-disable-next-line react/prop-types */
    theme,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
  });

  const styleProps = {
    ...props,
    component,
    color: fcs.color,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required,
  };

  const Root = components.Root || FormLabelRoot;
  const inputRootProps = componentsProps.root || {};

  const Asterisk = components.Input || AsteriskComponent;
  const asteriskProps = componentsProps.asterisk || {};

  const classes = useUtilityClasses({ ...styleProps, ...inputRootProps.styleProps });

  const rootProps = !isHostComponent(Root)
    ? { ...inputRootProps, styleProps: { ...styleProps, ...inputRootProps.styleProps }, theme }
    : { ...inputRootProps, styleProps };

  return (
    <Root
      as={component}
      {...rootProps}
      className={clsx(classes.root, rootProps.className, className)}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <Asterisk
          styleProps={styleProps}
          aria-hidden
          {...(!isHostComponent(Asterisk) && {
            as: AsteriskComponent,
            styleProps: { ...styleProps, ...asteriskProps.styleProps },
            theme,
          })}
          className={classes.asterisk}
        >
          &thinsp;{'*'}
        </Asterisk>
      )}
    </Root>
  );
});

FormLabel.propTypes = {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the FormLabel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Asterisk: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the FormLabel.
   * @default {}
   */
  componentsProps: PropTypes.object,
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
  sx: PropTypes.object,
};

export default FormLabel;

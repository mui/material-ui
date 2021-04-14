import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { useFormControl } from '../FormControl';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import formControlLabelClasses, {
  getFormControlLabelUtilityClasses,
} from './formControlLabelClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[`labelPlacement${capitalize(styleProps.labelPlacement)}`],
      [`& .${formControlLabelClasses.label}`]: styles.label,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, disabled, labelPlacement } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`],
    label: ['label', disabled && 'disabled'],
  };

  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};

export const FormControlLabelRoot = experimentalStyled(
  'label',
  {},
  { name: 'MuiFormControlLabel', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  marginLeft: -11,
  marginRight: 16, // used for row presentation of radio/checkbox
  [`&.${formControlLabelClasses.disabled}`]: {
    cursor: 'default',
  },
  ...(styleProps.labelPlacement === 'start' && {
    flexDirection: 'row-reverse',
    marginLeft: 16, // used for row presentation of radio/checkbox
    marginRight: -11,
  }),
  ...(styleProps.labelPlacement === 'top' && {
    flexDirection: 'column-reverse',
    marginLeft: 16,
  }),
  ...(styleProps.labelPlacement === 'bottom' && {
    flexDirection: 'column',
    marginLeft: 16,
  }),
  [`& .${formControlLabelClasses.label}`]: {
    [`&.${formControlLabelClasses.disabled}`]: {
      color: theme.palette.text.disabled,
    },
  },
}));

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormControlLabel' });
  const {
    checked,
    className,
    control,
    disabled: disabledProp,
    inputRef,
    label,
    labelPlacement = 'end',
    name,
    onChange,
    value,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;
  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }
  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled,
  };

  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach((key) => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  const styleProps = {
    ...props,
    disabled,
    label,
    labelPlacement,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <FormControlLabelRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      {React.cloneElement(control, controlProps)}
      <Typography component="span" className={classes.label}>
        {label}
      </Typography>
    </FormControlLabelRoot>
  );
});

FormControlLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default FormControlLabel;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha } from '@mui/system';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import RadioButtonIcon from './RadioButtonIcon';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import radioClasses, { getRadioUtilityClass } from './radioClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';

const useUtilityClasses = (ownerState) => {
  const { classes, color } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color)}`],
  };

  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes),
  };
};

const RadioRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`color${capitalize(ownerState.color)}`]];
  },
})(({ theme, ownerState }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...(!ownerState.disableRipple && {
    '&:hover': {
      backgroundColor: theme.vars
        ? `rgba(${
            ownerState.color === 'default'
              ? theme.vars.palette.action.activeChannel
              : theme.vars.palette[ownerState.color].mainChannel
          } / ${theme.vars.palette.action.hoverOpacity})`
        : alpha(
            ownerState.color === 'default'
              ? theme.palette.action.active
              : theme.palette[ownerState.color].main,
            theme.palette.action.hoverOpacity,
          ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  }),
  ...(ownerState.color !== 'default' && {
    [`&.${radioClasses.checked}`]: {
      color: (theme.vars || theme).palette[ownerState.color].main,
    },
  }),
  [`&.${radioClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
  },
}));

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const defaultCheckedIcon = <RadioButtonIcon checked />;
const defaultIcon = <RadioButtonIcon />;

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiRadio' });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium',
    className,
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <RadioRoot
      type="radio"
      icon={React.cloneElement(icon, { fontSize: defaultIcon.props.fontSize ?? size })}
      checkedIcon={React.cloneElement(checkedIcon, {
        fontSize: defaultCheckedIcon.props.fontSize ?? size,
      })}
      ownerState={ownerState}
      classes={classes}
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

Radio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: PropTypes.node,
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

export default Radio;

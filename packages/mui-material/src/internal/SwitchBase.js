'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import useControlled from '../utils/useControlled';
import useFormControl from '../FormControl/useFormControl';
import ButtonBase from '../ButtonBase';
import { getSwitchBaseUtilityClass } from './switchBaseClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, checked, disabled, edge } = ownerState;

  const slots = {
    root: ['root', checked && 'checked', disabled && 'disabled', edge && `edge${capitalize(edge)}`],
    input: ['input'],
  };

  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};

const SwitchBaseRoot = styled(ButtonBase)({
  padding: 9,
  borderRadius: '50%',
  variants: [
    {
      props: {
        edge: 'start',
        size: 'small',
      },
      style: {
        marginLeft: -3,
      },
    },
    {
      props: ({ edge, ownerState }) => edge === 'start' && ownerState.size !== 'small',
      style: {
        marginLeft: -12,
      },
    },
    {
      props: {
        edge: 'end',
        size: 'small',
      },
      style: {
        marginRight: -3,
      },
    },
    {
      props: ({ edge, ownerState }) => edge === 'end' && ownerState.size !== 'small',
      style: {
        marginRight: -12,
      },
    },
  ],
});

const SwitchBaseInput = styled('input', { shouldForwardProp: rootShouldForwardProp })({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1,
});

/**
 * @ignore - internal component.
 */
const SwitchBase = React.forwardRef(function SwitchBase(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked',
  });

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleInputChange = (event) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const hasLabelFor = type === 'checkbox' || type === 'radio';

  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchBaseRoot
      component="span"
      className={clsx(classes.root, className)}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      tabIndex={null}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      <SwitchBaseInput
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        className={classes.input}
        disabled={disabled}
        id={hasLabelFor ? id : undefined}
        name={name}
        onChange={handleInputChange}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        ownerState={ownerState}
        tabIndex={tabIndex}
        type={type}
        {...(type === 'checkbox' && value === undefined ? {} : { value })}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
});

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.
SwitchBase.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node.isRequired,
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
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The input component prop `type`.
   */
  type: PropTypes.string.isRequired,
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default SwitchBase;

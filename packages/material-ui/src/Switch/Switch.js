import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import useControlled from '../utils/useControlled';
import { alpha, darken, lighten } from '../styles/colorManipulator';
import TouchRipple from '../ButtonBase/TouchRipple';
import useEventCallback from '../utils/useEventCallback';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useForkRef from '../utils/useForkRef';

const useUtilityClasses = (styleProps) => {
  const { classes, edge, size, color, checked, disabled } = styleProps;

  const slots = {
    root: [
      'root',
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...composedClasses,
  };
};

const SwitchRoot = experimentalStyled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...(styleProps.edge && styles[`edge${capitalize(styleProps.edge)}`]),
      ...styles[`size${capitalize(styleProps.size)}`],
    };
  },
})(({ theme, styleProps }) => ({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: 'middle', // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(styleProps.edge === 'start' && {
    marginLeft: -8,
  }),
  ...(styleProps.edge === 'end' && {
    marginRight: -8,
  }),
  ...(styleProps.size === 'small' && {
    width: 40,
    height: 24,
    padding: 7,
    [`& .${switchClasses.thumb}`]: {
      width: 16,
      height: 16,
      margin: 4,
    },
    [`&.${switchClasses.checked} .${switchClasses.thumb}`]: {
      transform: 'translateX(16px)',
    },
  }),
  [`&:hover .${switchClasses.thumb}`]: {
    margin: 0,
    width: 38,
    height: 38,
    borderColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    borderStyle: 'solid',
    borderWidth: '9px',
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      borderColor: 'transparent',
    },
  },
  [`&.${switchClasses.checked}`]: {
    [`.${switchClasses.thumb}`]: {
      transform: 'translateX(20px)',
    },
    [`.${switchClasses.track}`]: {
      opacity: 0.5,
    },
  },
  [`&.${switchClasses.disabled} .${switchClasses.thumb}`]: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
  },
  [`&.${switchClasses.disabled} .${switchClasses.track}`]: {
    opacity: theme.palette.mode === 'light' ? 0.12 : 0.2,
  },
  ...(styleProps.color !== 'default' && {
    [`&.${switchClasses.checked}:hover .${switchClasses.thumb}`]: {
      borderColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        borderColor: 'transparent',
      },
    },
    [`&.${switchClasses.checked} .${switchClasses.thumb}`]: {
      color: theme.palette[styleProps.color].main,
    },
    [`&.${switchClasses.checked}.${switchClasses.disabled} .${switchClasses.thumb}`]: {
      color:
        theme.palette.mode === 'light'
          ? lighten(theme.palette[styleProps.color].main, 0.62)
          : darken(theme.palette[styleProps.color].main, 0.55),
    },
    [`&.${switchClasses.checked} .${switchClasses.track}`]: {
      backgroundColor: theme.palette[styleProps.color].main,
    },
  }),
}));

const SwitchTrack = experimentalStyled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3,
}));

const SwitchThumb = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiSwitch',
    slot: 'Thumb',
    overridesResolver: (props, styles) => styles.thumb,
  },
)(({ theme }) => ({
  backgroundColor: 'currentColor',
  backgroundClip: 'content-box',
  boxShadow: theme.shadows[1],
  width: 20,
  height: 20,
  borderRadius: '50%',
  margin: 9,
  position: 'absolute',
  top: 0,
  left: 0,
  color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
  transition: theme.transitions.create(['left', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  [`.MuiTouchRipple-root`]: {
    margin: '-9px',
  },
}));

const SwitchInput = experimentalStyled('input')({
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

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSwitch' });
  const { className, color = 'primary', edge = false, size = 'medium', sx, ...otherProps } = props;
  const {
    autoFocus,
    checked: checkedProp,
    defaultChecked,
    disabled,
    disableRipple,
    id,
    inputProps,
    inputRef,
    name,
    onChange,
    readOnly,
    required,
    tabIndex,
    value,
  } = otherProps;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked',
  });

  const styleProps = {
    ...props,
    color,
    edge,
    size,
    checked,
  };

  const classes = useUtilityClasses(styleProps);

  const rippleRef = React.useRef(null);

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);

  function useRippleHandler(rippleAction, eventCallback) {
    return useEventCallback((event) => {
      if (eventCallback) eventCallback(event);

      if (rippleRef.current) rippleRef.current[rippleAction](event);

      return true;
    });
  }

  const startRipple = useRippleHandler('start');
  const stopRipple = useRippleHandler('stop');

  const handleMouseLeave = useRippleHandler('stop', (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
  });

  const handleBlur = useRippleHandler('stop', (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
  });

  const handleFocus = useEventCallback((event) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (inputRef && !inputRef.current) {
      inputRef.current = event.currentTarget;
    }

    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }
  });

  const handleInputChange = (event) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);

    if (onChange) {
      onChange(event);
    }
  };

  React.useEffect(() => {
    if (focusVisible && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusVisible]);

  const handleOwnRef = useForkRef(focusVisibleRef, inputRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  return (
    <SwitchRoot
      className={clsx(classes.root, className)}
      sx={sx}
      styleProps={styleProps}
      ref={handleRef}
    >
      <SwitchInput
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        className={classes.input}
        disabled={disabled}
        onFocus={handleFocus}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onContextMenu={stopRipple}
        onMouseDown={startRipple}
        onMouseLeave={handleMouseLeave}
        onMouseUp={stopRipple}
        onDragLeave={stopRipple}
        onTouchEnd={stopRipple}
        onTouchMove={stopRipple}
        onTouchStart={startRipple}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        styleProps={styleProps}
        tabIndex={tabIndex}
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <SwitchThumb className={classes.thumb} styleProps={styleProps}>
        <TouchRipple ref={rippleRef} center />
      </SwitchThumb>
      <SwitchTrack className={classes.track} styleProps={styleProps} />
    </SwitchRoot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,
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
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;

'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { ButtonBaseRoot } from '../ButtonBase/ButtonBase';
import capitalize from '../utils/capitalize';
import { getButtonUtilityClass } from './buttonClasses';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { color, disableElevation, fullWidth, size, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `${variant}${capitalize(color)}`,
      `size${capitalize(size)}`,
      `${variant}Size${capitalize(size)}`,
      `color${capitalize(color)}`,
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
    ],
    label: ['label'],
    startIcon: ['icon', 'startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['icon', 'endIcon', `iconSize${capitalize(size)}`],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

export const ButtonRoot = styled(ButtonBaseRoot, {
  name: 'MuiButton',
  slot: 'root',
})({
  height: 'min(2.5rem, 100%)',
  padding: '0.5rem 1rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  fontWeight: 500,
  borderRadius: 'calc(0.5rem - 2px)',
  gap: '0.5rem',
});

export const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'startIcon',
})({ display: 'inherit' });

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'endIcon',
})({ display: 'inherit' });

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiButton' });
  const {
    children,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    startIcon: startIconProp,
    type,

    // theme props
    size = '',
    color = '',
    variant = '',

    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const positionClassName = buttonGroupButtonContextPositionClassName || '';

  const [Root, rootProps] = useSlot('root', {
    ref,
    elementType: ButtonRoot,
    externalForwardedProps: {
      type,
      classes,
      disabled,
      focusRipple: !disableFocusRipple,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      ...other,
    },
    className: clsx(contextProps.className, classes.root, positionClassName),
    ownerState,
  });

  const [StartIcon, startIconProps] = useSlot('startIcon', {
    elementType: ButtonStartIcon,
    className: classes.startIcon,
    ownerState,
    externalForwardedProps: other,
  });

  const [EndIcon, endIconProps] = useSlot('endIcon', {
    elementType: ButtonEndIcon,
    className: classes.endIcon,
    ownerState,
    externalForwardedProps: other,
  });

  return (
    <Root {...rootProps}>
      {StartIcon && startIconProp && <StartIcon {...startIconProps}>{startIconProp}</StartIcon>}
      {children}
      {EndIcon && endIconProp && <EndIcon {...endIconProps}>{endIconProp}</EndIcon>}
    </Root>
  );
});

Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
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
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Button;

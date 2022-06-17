import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getIconUtilityClass } from './iconClasses';

const useUtilityClasses = (ownerState) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getIconUtilityClass, classes);
};

const IconRoot = styled('span', {
  name: 'MuiIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
  // To remove at some point.
  overflow: 'hidden',
  display: 'inline-block', // allow overflow hidden to take action
  textAlign: 'center', // support non-square icon
  flexShrink: 0,
  fontSize: {
    inherit: 'inherit',
    small: theme.typography.pxToRem(20),
    medium: theme.typography.pxToRem(24),
    large: theme.typography.pxToRem(36),
  }[ownerState.fontSize],
  // TODO v5 deprecate, v6 remove for sx
  color: {
    primary: (theme.vars || theme).palette.primary.main,
    secondary: (theme.vars || theme).palette.secondary.main,
    info: (theme.vars || theme).palette.info.main,
    success: (theme.vars || theme).palette.success.main,
    warning: (theme.vars || theme).palette.warning.main,
    action: (theme.vars || theme).palette.action.active,
    error: (theme.vars || theme).palette.error.main,
    disabled: (theme.vars || theme).palette.action.disabled,
    inherit: undefined,
  }[ownerState.color],
}));

const Icon = React.forwardRef(function Icon(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiIcon' });
  const {
    baseClassName = 'material-icons',
    className,
    color = 'inherit',
    component: Component = 'span',
    fontSize = 'medium',
    ...other
  } = props;

  const ownerState = {
    ...props,
    baseClassName,
    color,
    component: Component,
    fontSize,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <IconRoot
      as={Component}
      className={clsx(
        baseClassName,
        // Prevent the translation of the text content.
        // The font relies on the exact text content to render the icon.
        'notranslate',
        classes.root,
        className,
      )}
      ownerState={ownerState}
      aria-hidden
      ref={ref}
      {...other}
    />
  );
});

Icon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
   * other base class that suits the icon font you're using (e.g. material-icons-rounded, fas, etc).
   * @default 'material-icons'
   */
  baseClassName: PropTypes.string,
  /**
   * The name of the icon font ligature.
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'inherit',
      'action',
      'disabled',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'large', 'medium', 'small']),
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
};

Icon.muiName = 'Icon';

export default Icon;

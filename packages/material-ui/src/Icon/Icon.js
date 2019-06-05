import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: 'none',
    fontSize: theme.typography.pxToRem(24),
    width: '1em',
    height: '1em',
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: 'hidden',
    flexShrink: 0,
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="action"`. */
  colorAction: {
    color: theme.palette.action.active,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main,
  },
  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  fontSizeInherit: {
    fontSize: 'inherit',
  },
  /* Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: {
    fontSize: theme.typography.pxToRem(20),
  },
  /* Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: {
    fontSize: theme.typography.pxToRem(36),
  },
});

const Icon = React.forwardRef(function Icon(props, ref) {
  const {
    classes,
    className,
    color = 'inherit',
    component: Component = 'span',
    fontSize = 'default',
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        'material-icons',
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes[`fontSize${capitalize(fontSize)}`]]: fontSize !== 'default',
        },
        className,
      )}
      aria-hidden
      ref={ref}
      {...other}
    />
  );
});

Icon.propTypes = {
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'action', 'error', 'disabled']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
};

Icon.muiName = 'Icon';

export default withStyles(styles, { name: 'MuiIcon' })(Icon);

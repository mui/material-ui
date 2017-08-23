// @flow weak
// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import Icon from '../Icon';
import { isMuiComponent } from '../utils/reactHelpers';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: 24,
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  colorAccent: {
    color: theme.palette.accent.A200,
  },
  colorContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
  colorInherit: {
    color: 'inherit',
  },
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  icon: {
    width: '1em',
    height: '1em',
  },
  keyboardFocused: {
    backgroundColor: theme.palette.text.divider,
  },
});

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  const { children, classes, className, color, disabled, rootRef, ...other } = props;

  return (
    <ButtonBase
      className={classNames(
        classes.root,
        {
          [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
          [classes.disabled]: disabled,
        },
        className,
      )}
      centerRipple
      keyboardFocusedClassName={classes.keyboardFocused}
      disabled={disabled}
      ref={rootRef}
      {...other}
    >
      <span className={classes.label}>
        {typeof children === 'string'
          ? <Icon className={classes.icon}>
              {children}
            </Icon>
          : React.Children.map(children, child => {
              if (isMuiComponent(child, 'Icon')) {
                return React.cloneElement(child, {
                  className: classNames(classes.icon, child.props.className),
                });
              }

              return child;
            })}
      </span>
    </ButtonBase>
  );
}

IconButton.propTypes = {
  /**
   * The icon element.
   * If a string is provided, it will be used as an icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'contrast', 'accent']),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: PropTypes.func,
};

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false,
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);

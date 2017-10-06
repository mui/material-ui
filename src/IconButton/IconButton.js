// @flow weak
// @inheritedComponent ButtonBase

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import Icon from '../Icon';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = (theme: Object) => ({
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: 24,
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  colorAccent: {
    color: theme.palette.secondary.A200,
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
  disabled: {
    color: theme.palette.action.disabled,
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

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * The icon element.
   * If a string is provided, it will be used as an icon font ligature.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: 'default' | 'inherit' | 'primary' | 'contrast' | 'accent',
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple?: boolean,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
};

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props: ProvidedProps & Props) {
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
        {typeof children === 'string' ? (
          <Icon className={classes.icon}>{children}</Icon>
        ) : (
          React.Children.map(children, child => {
            if (isMuiElement(child, ['Icon', 'SvgIcon'])) {
              return React.cloneElement(child, {
                className: classNames(classes.icon, child.props.className),
              });
            }

            return child;
          })
        )}
      </span>
    </ButtonBase>
  );
}

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false,
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);

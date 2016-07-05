// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import ButtonBase from '../Button/ButtonBase';

export const styleSheet = createStyleSheet('IconButton', (theme) => {
  const {palette} = theme;
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      width: 48,
      height: 48,
      padding: 0,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      color: 'inherit',
    },
    primary: {
      color: palette.primary[500],
    },
    accent: {
      color: palette.accent.A200,
    },
  };
});

type Props = {
  /**
   * Can be used to pass a `FontIcon` element as the icon for the button.
   */
  children?: Object,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * If true, the element will be disabled.
   */
  disabled?: boolean,
  /**
   * If false, the element's ripple effect will be disabled.
   */
  ripple: boolean,
};

export default class IconButton extends Component<void, Props, void> {
  static contextTypes = {
    styleManager: Object,
  };

  props:Props ={
    ripple: true,
  };

  render():Element {
    const {children, className, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <ButtonBase className={ClassNames(classes.root, className)} {...other}>
        {typeof children === 'string' ? <span className="material-icons">{children}</span> : children}
      </ButtonBase>
    );
  }
}

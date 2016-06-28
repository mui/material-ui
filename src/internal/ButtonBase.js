import React, {Component, PropTypes} from 'react';
import createFragment from 'react-addons-create-fragment';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

import {TouchRipple, createRippleHandler} from '../Ripple';

export const styleSheet = createStyleSheet('ButtonBase', () => {
  return {
    root: {
      position: 'relative',
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      userSelect: 'none',
      appearance: 'none',
      textDecoration: 'none',
    },
  };
});

export default class ButtonBase extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onBlur: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    ripple: PropTypes.bool,
    type: PropTypes.string,
  };

  static defaultProps = {
    component: 'button',
    ripple: true,
    type: 'button',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  ripple = undefined;

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start');
  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');
  handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop');
  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');
  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');
  handleBlur = createRippleHandler(this, 'Blur', 'stop');

  render() {
    const {
      children,
      className,
      component,
      onBlur, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      onTouchEnd, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      ripple,
      type,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames(classes.root, className);

    const buttonProps = {
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      className: classNames,
      ...other,
    };

    let element = component;

    if (other.href) {
      element = 'a';
    }

    if (element === 'button') {
      buttonProps.type = type;
    }

    return React.createElement(
      element,
      buttonProps,
      createFragment({
        children: children,
        ripple: ripple ? <TouchRipple ref={(c) => this.ripple = c} /> : null,
      })
    );
  }
}

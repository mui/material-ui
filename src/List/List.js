// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('List', () => {
  return {
    root: {
      flex: '1 1 auto',
      overflow: 'auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  };
}, { index: -5 });

/**
 * A simple list component.
 */
export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    padding: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    padding: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      className: classNameProp,
      component,
      padding,
      ...other,
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.padding]: padding,
    }, classNameProp);

    return React.createElement(component, { className, ...other });
  }
}

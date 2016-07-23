// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('List', () => {
  return {
    root: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  };
});

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
    const { className, component, padding, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const classNames = ClassNames(classes.root, {
      [classes.padding]: padding,
    }, className);
    return React.createElement(component, { className: classNames, ...other });
  }
}

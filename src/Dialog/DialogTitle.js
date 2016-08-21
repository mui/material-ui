// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Text from '../Text';

export const styleSheet = createStyleSheet('DialogTitle', () => {
  const gutter = 24;
  return {
    root: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      flex: '0 0 auto',
    },
  };
}, { priority: 10 });

export default class DialogTitle extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div data-mui-test="DialogTitle" className={classNames(classes.root, className)} {...other}>
        {typeof children === 'string' ? (
          <Text type="title">{children}</Text>
        ) : children}
      </div>
    );
  }
}

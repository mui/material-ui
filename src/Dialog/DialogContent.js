// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('DialogContent', () => {
  const gutter = 24;
  return {
    root: {
      flex: '1 1 auto',
      overflowY: 'auto',
      padding: `0 ${gutter}px ${gutter}px ${gutter}px`,
      '&:first-child': {
        paddingTop: gutter,
      },
    },
  };
}, { priority: 10 });

export default class DialogContent extends Component {
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
      <div className={classNames(classes.root, className)} {...other}>{children}</div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableHead', (theme) => {
  return {
    root: {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
  };
});

export default class TableHead extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: PropTypes.object.isRequired,
  };

  static childContextTypes = { table: PropTypes.object };

  getChildContext() {
    return { table: { head: true } };
  }

  render() {
    const { className, children, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const classNames = ClassNames(classes.root, className);

    return (
      <thead className={classNames} {...other}>
        {children}
      </thead>
    );
  }
}

// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiTable', (theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    overflow: 'hidden',
  },
}));

class Table extends Component {
  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      table: {},
    };
  }

  render() {
    const {
      classes,
      className: classNameProp,
      children,
      ...other
    } = this.props;
    const className = classNames(classes.root, classNameProp);

    return (
      <table className={className} {...other}>
        {children}
      </table>
    );
  }
}

Table.propTypes = {
  /**
   * The content of the table, normally `TableHeader` and `TableBody`.
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
};

Table.childContextTypes = {
  table: PropTypes.object,
};

export default withStyles(styleSheet)(Table);

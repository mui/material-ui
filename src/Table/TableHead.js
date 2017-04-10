// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTableHead', (theme) => {
  return {
    root: {
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
  };
});

/**
 * A material table head.
 *
 * ```jsx
 * <TableHead>
 *   <TableRow>...</TableRow>
 * </TableHead>
 * ```
 */
export default class TableHead extends Component {
  static propTypes = {
    /**
     * Should be valid `<thead>` children such as `TableRow`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = { table: PropTypes.object };

  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true,
      },
    };
  }

  render() {
    const {
      className: classNameProp,
      children,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, classNameProp);

    return (
      <thead className={className} {...other}>
        {children}
      </thead>
    );
  }
}

// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTableBody', (theme) => {
  return {
    root: {
      fontSize: 13,
      color: theme.palette.text.primary,
    },
  };
});

/**
 * A material table body.
 *
 * ```jsx
 * <TableBody>
 *   <TableRow>...</TableRow>
 * </TableBody>
 * ```
 */
export default class TableBody extends Component {
  static propTypes = {
    /**
     * The content of the component, normally `TableRow`.
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
        body: true,
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
      <tbody className={className} {...other}>
        {children}
      </tbody>
    );
  }
}

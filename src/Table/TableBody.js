// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('TableBody', (theme) => {
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
 *   <TableRow>....</TableRow>
 * </TableBody>
 * ```
 */
export default class TableBody extends Component {
  static propTypes = {
    /**
     * Should be valid `<tbody>` children such as `TableRow`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    table: PropTypes.object,
    styleManager: PropTypes.object.isRequired,
  };

  static childContextTypes = { table: PropTypes.object };

  getChildContext() {
    return { table: { body: true } };
  }

  render() {
    const {
      className: classNameProp,
      children,
      ...other,
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

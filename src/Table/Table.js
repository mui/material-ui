// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('Table', () => {
  return {
    root: {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
    },
  };
});

/**
 * A material table root element.
 *
 * ```jsx
 * <Table>
 *   <TableHeader>....</TableHeader>
 *   <TableBody>....</TableBody>
 * </Table>
 * ```
 */
export default class Table extends Component {
  static propTypes = {
    /**
     * Should be valid `<table>` children such as
     * `TableHeader` and `TableBody`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static childContextTypes = { table: PropTypes.object };

  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      table: {},
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
      <table className={className} {...other}>
        {children}
      </table>
    );
  }
}

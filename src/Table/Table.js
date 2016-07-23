// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

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

  getChildContext() {
    return { table: {} };
  }

  render() {
    const { className, children, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const classNames = ClassNames(classes.root, className);

    return (
      <table className={classNames} {...other}>
        {children}
      </table>
    );
  }
}

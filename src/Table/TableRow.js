// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('TableRow', (theme) => {
  return {
    root: {
      height: 48,
      '&:focus': {
        outline: 'none',
        background: theme.palette.background.contentFrame,
      },
    },
    head: {
      height: 64,
    },
    footer: {
      height: 56,
    },
    hover: {
      '&:hover': {
        background: theme.palette.background.contentFrame,
      },
    },
    selected: {
      background: theme.palette.background.appBar,
    },
  };
});

/**
 * A material table row.
 *
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc)
 *
 * ```jsx
 * <TableRow>
 *   <TableCell>....</TableCell>
 * </TableRow>
 * ```
 */
export default function TableRow(props, context) {
  const { className, children, hover, selected, ...other } = props;
  const { table, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  const classNames = ClassNames(classes.root, {
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
    [classes.hover]: table && hover,
    [classes.selected]: table && selected,
  }, className);

  return (
    <tr className={classNames} {...other}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  /**
   * Should be valid `<tr>` children such as `TableCell`.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If set to true, the table row will shade on hover.
   */
  hover: PropTypes.bool,
  /**
   * If set to true, the table row will have the selected shading.
   */
  selected: PropTypes.bool,
};

TableRow.contextTypes = {
  table: PropTypes.object,
  styleManager: PropTypes.object.isRequired,
};

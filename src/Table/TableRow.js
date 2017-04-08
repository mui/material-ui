// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTableRow', (theme) => {
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
 *   <TableCell>...</TableCell>
 * </TableRow>
 * ```
 */
export default function TableRow(props, context) {
  const {
    className: classNameProp,
    children,
    hover,
    selected,
    ...other
  } = props;
  const { table, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  const className = classNames(classes.root, {
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
    [classes.hover]: table && hover,
    [classes.selected]: table && selected,
  }, classNameProp);

  return (
    <tr className={className} {...other}>
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
   * If `true`, the table row will shade on hover.
   */
  hover: PropTypes.bool,
  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: PropTypes.bool,
};

TableRow.defaultProps = {
  hover: false,
  selected: false,
};

TableRow.contextTypes = {
  table: PropTypes.object,
  styleManager: customPropTypes.muiRequired,
};

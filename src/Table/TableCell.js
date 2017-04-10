// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiTableCell', (theme) => {
  return {
    root: {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'left',
    },
    numeric: {
      textAlign: 'right',
      flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
    },
    head: {
      whiteSpace: 'pre',
    },
    padding: {
      padding: '0 56px 0 24px',
      '&:last-child': {
        paddingRight: 24,
      },
    },
    compact: {
      paddingRight: 24,
    },
    checkbox: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    footer: {},
  };
});

/**
 * A material table cell.
 *
 * When placed in a `TableHead`, this will automatically render a `th` element.
 *
 * ```jsx
 * <TableCell>...</TableCell>
 * ```
 */
export default function TableCell(props, context) {
  const {
    className: classNameProp,
    children,
    compact,
    checkbox,
    numeric,
    disablePadding,
    ...other
  } = props;
  const { table, styleManager } = context;
  const classes = styleManager.render(styleSheet);

  const Component = table && table.head ? 'th' : 'td';

  const className = classNames(classes.root, {
    [classes.numeric]: numeric,
    [classes.compact]: compact,
    [classes.checkbox]: checkbox,
    [classes.padding]: !disablePadding,
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
  }, classNameProp);

  return (
    <Component className={className} {...other}>
      {children}
    </Component>
  );
}

TableCell.propTypes = {
  /**
   * If `true`, the cell padding will be adjusted to accommodate a checkbox.
   */
  checkbox: PropTypes.bool,
  /**
   * The table cell contents.
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, compact cell padding will be used to accommodate more content.
   */
  compact: PropTypes.bool,
  /**
   * If `true`, left/right cell padding will be disabled.
   */
  disablePadding: PropTypes.bool,
  /**
   * If `true`, content will align to the right.
   */
  numeric: PropTypes.bool,
};

TableCell.defaultProps = {
  checkbox: false,
  compact: false,
  numeric: false,
  disablePadding: false,
};

TableCell.contextTypes = {
  table: PropTypes.object,
  styleManager: customPropTypes.muiRequired,
};

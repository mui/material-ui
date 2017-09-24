// @flow

import React from 'react';
import PropTypes from 'prop-types';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import deprecated from 'prop-types-extra/lib/deprecated';
import withStyles from '../styles/withStyles';

export type Context = {
  table: Object,
};

type Default = {
  padding: 'default' | 'checkbox' | 'compact' | 'none',
  numeric: boolean,
  component: ElementType,
};

export type Props = {
  /**
   * @ignore
   */
  checkbox?: boolean,
  /**
   * The table cell contents.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  compact?: boolean,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * @ignore
   */
  disablePadding?: boolean,
  /**
   * If `true`, content will align to the right.
   */
  numeric?: boolean,
  /**
   * Sets the padding applied to the cell.
   */
  padding?: 'default' | 'checkbox' | 'compact' | 'none',
};

export const styles = (theme: Object) => ({
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
    fontWeight: theme.typography.fontWeightMedium,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 7}px 0 ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
  },
  compact: {
    paddingRight: theme.spacing.unit * 3,
  },
  checkbox: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  footer: {
    borderBottom: 0,
  },
});

function TableCell(props: Default & Props, context: Context) {
  const {
    classes,
    className: classNameProp,
    children,
    compact,
    checkbox,
    numeric,
    disablePadding,
    padding,
    component,
    ...other
  } = props;

  const { table } = context;
  let Component;
  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }
  const className = classNames(
    classes.root,
    {
      [classes.numeric]: numeric,
      [classes.compact]: padding === 'compact' || compact,
      [classes.checkbox]: padding === 'checkbox' || checkbox,
      [classes.padding]: padding !== 'none' && !disablePadding,
      [classes.head]: table && table.head,
      [classes.footer]: table && table.footer,
    },
    classNameProp,
  );

  return (
    <Component className={className} {...other}>
      {children}
    </Component>
  );
}

TableCell.defaultProps = {
  component: null,
  numeric: false,
  padding: 'default',
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

let TableCellWrapper = TableCell;

if (process.env.NODE_ENV !== 'production') {
  TableCellWrapper = (props: any) => <TableCell {...props} />;

  TableCellWrapper.displayName = 'TableCell';
  TableCellWrapper.propTypes = {
    checbox: deprecated(PropTypes.bool, "Use padding='checkbox'"),
    compact: deprecated(PropTypes.bool, "Use padding='compact'"),
    disablePadding: deprecated(PropTypes.bool, "Use padding='none'"),
  };
}

export default withStyles(styles, { name: 'MuiTableCell' })(TableCellWrapper);

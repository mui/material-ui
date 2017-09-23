// @flow

import React from 'react';
import PropTypes from 'prop-types';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import requirePropFalseFactory from '../utils/requirePropFalseFactory';

export type Context = {
  table: Object,
};

type Default = {
  checkbox: boolean,
  compact: boolean,
  numeric: boolean,
  disablePadding: boolean,
  component: ElementType,
};

export type Props = {
  /**
   * If `true`, the cell padding will be adjusted to accommodate a checkbox.
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
   * If `true`, compact cell padding will be used to accommodate more content.
   */
  compact?: boolean,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * If `true`, left/right cell padding will be disabled.
   * If `compact` is also `true` then `disablePadding` will have no effect.
   */
  disablePadding?: boolean,
  /**
   * If `true`, content will align to the right.
   */
  numeric?: boolean,
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
      [classes.compact]: compact,
      [classes.checkbox]: checkbox,
      [classes.padding]: !disablePadding,
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
  checkbox: false,
  compact: false,
  numeric: false,
  disablePadding: false,
  component: null,
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

// Add a wrapper component to generate some helper messages in the development
// environment.
let TableCellWrapper = TableCell; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV !== 'production') {
  const requirePropFalse = requirePropFalseFactory('TableCell');
  TableCellWrapper = (props: any) => <TableCell {...props} />;

  TableCellWrapper.propTypes = {
    compact: requirePropFalse('checkbox'),
    disablePadding: requirePropFalse(['compact', 'checkbox']),
  };
}

export default withStyles(styles, { name: 'MuiTableCell' })(TableCellWrapper);

// @flow

import React from 'react';
import PropTypes from 'prop-types';
import type { ElementType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export type Context = {
  table: Object,
};

export type Padding = 'default' | 'checkbox' | 'dense' | 'none';

type ProvidedProps = {
  classes: Object,
  padding: Padding,
  numeric: boolean,
};

export type Props = {
  /**
   * The table cell contents.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType,
  /**
   * If `true`, content will align to the right.
   */
  numeric?: boolean,
  /**
   * Sets the padding applied to the cell.
   */
  padding?: Padding,
};

export const styles = (theme: Object) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    textAlign: 'left',
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
  },
  head: {
    fontWeight: theme.typography.fontWeightMedium,
    position: 'relative', // Workaround for Tooltip positioning issue.
  },
  paddingDefault: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit /
      2}px ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
  },
  paddingDense: {
    paddingRight: theme.spacing.unit * 3,
  },
  paddingCheckbox: {
    padding: '0 12px',
  },
  footer: {
    borderBottom: 0,
  },
});

function TableCell(props: ProvidedProps & Props, context: Context) {
  const {
    classes,
    className: classNameProp,
    children,
    numeric,
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
      [classes[`padding${capitalizeFirstLetter(padding)}`]]:
        padding !== 'none' && padding !== 'default',
      [classes.paddingDefault]: padding !== 'none',
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
  numeric: false,
  padding: 'default',
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);

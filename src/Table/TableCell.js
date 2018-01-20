import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';

export const styles = theme => ({
  root: {
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.8)
    }`,
    textAlign: 'left',
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
  },
  typeHead: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    position: 'relative', // Workaround for Tooltip positioning issue.
  },
  typeBody: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.primary,
  },
  typeFooter: {
    borderBottom: 0,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
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
});

function TableCell(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    sortDirection,
    numeric,
    padding,
    type,
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
      [classes.typeHead]: type ? type === 'head' : table && table.head,
      [classes.typeBody]: type ? type === 'body' : table && table.body,
      [classes.typeFooter]: type ? type === 'footer' : table && table.footer,
    },
    classNameProp,
  );

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <Component className={className} aria-sort={ariaSort} {...other}>
      {children}
    </Component>
  );
}

TableCell.propTypes = {
  /**
   * The table cell contents.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, content will align to the right.
   */
  numeric: PropTypes.bool,
  /**
   * Sets the padding applied to the cell.
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'dense', 'none']),
  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  type: PropTypes.oneOf(['head', 'body', 'footer']),
};

TableCell.defaultProps = {
  numeric: false,
  padding: 'default',
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);

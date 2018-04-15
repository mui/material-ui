import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';

export const styles = theme => ({
  root: {
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.8)
    }`,
    textAlign: 'left',
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit /
      2}px ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
  },
  head: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
  },
  body: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.primary,
  },
  footer: {
    borderBottom: 0,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse', // can be dynamically inherited at runtime by contents
  },
  paddingDense: {
    paddingRight: theme.spacing.unit * 3,
  },
  paddingCheckbox: {
    padding: '0 12px',
  },
  paddingNone: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
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
    scope: scopeProp,
    variant,
    ...other
  } = props;
  const { table } = context;
  let Component;
  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }

  let scope = scopeProp;
  if (!scope && table && table.head) {
    scope = 'col';
  }

  const className = classNames(
    classes.root,
    {
      [classes.head]: variant ? variant === 'head' : table && table.head,
      [classes.body]: variant ? variant === 'body' : table && table.body,
      [classes.footer]: variant ? variant === 'footer' : table && table.footer,
      [classes.numeric]: numeric,
      [classes[`padding${capitalize(padding)}`]]: padding !== 'default',
    },
    classNameProp,
  );

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <Component className={className} aria-sort={ariaSort} scope={scope} {...other}>
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
   * Set scope attribute.
   */
  scope: PropTypes.string,
  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: PropTypes.oneOf(['head', 'body', 'footer']),
};

TableCell.defaultProps = {
  numeric: false,
  padding: 'default',
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);

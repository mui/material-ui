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
        ? lighten(fade(theme.palette.text.lightDivider, 1), 0.925)
        : darken(fade(theme.palette.text.lightDivider, 1), 0.685)
    }`,
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

function TableCell(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    sortDirection,
    numeric,
    padding,
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
};

TableCell.defaultProps = {
  numeric: false,
  padding: 'default',
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);

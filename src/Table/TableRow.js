// @flow

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    height: 48,
    '&:focus': {
      outline: 'none',
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
});

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
function TableRow(props, context) {
  const {
    classes,
    className: classNameProp,
    children,
    component: Component,
    hover,
    selected,
    ...other
  } = props;
  const { table } = context;

  const className = classNames(
    classes.root,
    {
      [classes.head]: table && table.head,
      [classes.footer]: table && table.footer,
      [classes.hover]: table && hover,
      [classes.selected]: table && selected,
    },
    classNameProp,
  );

  return (
    <Component className={className} {...other}>
      {children}
    </Component>
  );
}

TableRow.propTypes = {
  /**
   * Should be valid `<tr>` children such as `TableCell`.
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
  component: PropTypes.string,
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
  component: 'tr',
};

TableRow.contextTypes = {
  table: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTableRow' })(TableRow);

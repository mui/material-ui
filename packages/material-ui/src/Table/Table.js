import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import TableContext from './TableContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
};

const Table = React.forwardRef(function Table(props, ref) {
  const {
    classes,
    className,
    component: Component = 'table',
    padding = 'default',
    size = 'medium',
    ...other
  } = props;
  const table = React.useMemo(() => ({ padding, size }), [padding, size]);

  return (
    <TableContext.Provider value={table}>
      <Component ref={ref} className={clsx(classes.root, className)} {...other} />
    </TableContext.Provider>
  );
});

Table.propTypes = {
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes.elementType,
  /**
   * Allows TableCells to inherit padding of the Table.
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'none']),
  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: PropTypes.oneOf(['small', 'medium']),
};

export default withStyles(styles, { name: 'MuiTable' })(Table);

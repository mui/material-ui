import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import TableContext from './TableContext';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    '& caption': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'left',
      captionSide: 'bottom',
    },
  },
  /* Styles applied to the root element if `stickyHeader={true}`. */
  stickyHeader: {
    borderCollapse: 'separate',
  },
});

const defaultComponent = 'table';

const Table = React.forwardRef(function Table(props, ref) {
  const {
    classes,
    className,
    component: Component = defaultComponent,
    padding = 'default',
    size = 'medium',
    stickyHeader = false,
    ...other
  } = props;
  const table = React.useMemo(() => ({ padding, size, stickyHeader }), [
    padding,
    size,
    stickyHeader,
  ]);

  return (
    <TableContext.Provider value={table}>
      <Component
        role={Component === defaultComponent ? null : 'table'}
        ref={ref}
        className={clsx(classes.root, { [classes.stickyHeader]: stickyHeader }, className)}
        {...other}
      />
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
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Allows TableCells to inherit padding of the Table.
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'none']),
  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE 11.
   */
  stickyHeader: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiTable' })(Table);

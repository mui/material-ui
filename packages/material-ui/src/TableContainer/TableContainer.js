import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto',
  },
};

const TableContainer = React.forwardRef(function TableContainer(props, ref) {
  const { classes, className, component: Component = 'div', ...other } = props;

  return <Component ref={ref} className={clsx(classes.root, className)} {...other} />;
});

TableContainer.propTypes = {
  /**
   * The table itself, normally `<Table />`
   */
  children: PropTypes.node,
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
};

export default withStyles(styles, { name: 'MuiTableContainer' })(TableContainer);

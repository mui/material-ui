import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '../styles/makeStyles';
import useThemeProps from '../styles/useThemeProps';
import Tablelvl2Context from '../Table/Tablelvl2Context';

const tablelvl2 = {
  variant: 'body',
};

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-row-group',
  },
};

const useStyles = makeStyles(styles, { name: 'MuiTableBody' });

const TableBody = React.forwardRef(function TableBody(props, ref) {
  const { classes: classesProp, className, component: Component, ...other } = useThemeProps(props, {
    name: 'MuiTableBody',
  });
  const classes = useStyles(props);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <Component className={clsx(classes.root, className)} ref={ref} {...other} />
    </Tablelvl2Context.Provider>
  );
});

TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
};

TableBody.defaultProps = {
  component: 'tbody',
};

TableBody.useStyles = useStyles;
TableBody.options = {
  name: 'MuiTableBody',
};

export default TableBody;

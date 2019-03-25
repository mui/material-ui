import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '../styles/makeStyles';
import useThemeProps from '../styles/useThemeProps';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import muiComponent from '../utils/muiComponent';

const tablelvl2 = {
  variant: 'footer',
};

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-footer-group',
  },
};

const options = { name: 'MuiTableFooter' };
const useStyles = makeStyles(styles, options);

const TableFooter = React.forwardRef(function TableFooter(props, ref) {
  const {
    classes: classesProp,
    className,
    component: Component = 'tfoot',
    ...other
  } = useThemeProps(props, options);
  const classes = useStyles(props);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <Component className={clsx(classes.root, className)} ref={ref} {...other} />
    </Tablelvl2Context.Provider>
  );
});

TableFooter.propTypes = {
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

if (process.env.NODE_ENV !== 'production') {
  TableFooter.docsDefaultProps = {
    component: 'tfoot',
  };
}

export default muiComponent(useStyles, TableFooter);

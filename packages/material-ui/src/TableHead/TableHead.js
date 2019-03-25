import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '../styles/makeStyles';
import useThemeProps from '../styles/useThemeProps';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import muiComponent from '../utils/muiComponent';

const tablelvl2 = {
  variant: 'head',
};

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-header-group',
  },
};

const options = { name: 'MuiTableHead' };
const useStyles = makeStyles(styles, options);

const TableHead = React.forwardRef(function TableHead(props, ref) {
  const {
    classes: classesProp,
    className,
    component: Component = 'thead',
    ...other
  } = useThemeProps(props, options);
  const classes = useStyles(props);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <Component className={clsx(classes.root, className)} ref={ref} {...other} />
    </Tablelvl2Context.Provider>
  );
});

TableHead.propTypes = {
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
  TableHead.docsDefaultProps = {
    component: 'thead',
  };
}

export default muiComponent(useStyles, TableHead);

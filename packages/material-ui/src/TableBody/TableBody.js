import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { componentPropType } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import Tablelvl2Context from '../Table/Tablelvl2Context';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-row-group',
  },
};

const contextValue = { variant: 'body' };

function TableBody(props) {
  const { classes, className, component: Component, ...other } = props;

  return (
    <Tablelvl2Context.Provider value={contextValue}>
      <Component className={clsx(classes.root, className)} {...other} />
    </Tablelvl2Context.Provider>
  );
}

TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
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
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType,
};

TableBody.defaultProps = {
  component: 'tbody',
};

export default withStyles(styles, { name: 'MuiTableBody' })(TableBody);

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Tablelvl2Context from '../Table/Tablelvl2Context';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-row-group',
  },
};

const tablelvl2 = {
  variant: 'body',
};

const defaultComponent = 'tbody';

const TableBody = React.forwardRef(function TableBody(props, ref) {
  const { classes, className, component: Component = defaultComponent, ...other } = props;

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <Component
        className={clsx(classes.root, className)}
        ref={ref}
        role={Component === defaultComponent ? null : 'rowgroup'}
        {...other}
      />
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

export default withStyles(styles, { name: 'MuiTableBody' })(TableBody);

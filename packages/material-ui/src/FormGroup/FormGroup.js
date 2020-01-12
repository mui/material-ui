import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  /* Styles applied to the root element if `row={true}`. */
  row: {
    flexDirection: 'row',
  },
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
const FormGroup = React.forwardRef(function FormGroup(props, ref) {
  const { classes, component: Component = 'div', className, row = false, ...other } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes.row]: row,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

FormGroup.propTypes = {
  /**
   * The content of the component.
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
  component: PropTypes.elementType,
  /**
   * Display group of elements in a compact row.
   */
  row: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiFormGroup' })(FormGroup);

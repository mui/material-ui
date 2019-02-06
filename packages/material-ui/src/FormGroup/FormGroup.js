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

const FormGroup = React.forwardRef(function FormGroup(props, ref) {
  const { classes, className, children, row, ...other } = props;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.row]: row,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {children}
    </div>
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
   * Display group of elements in a compact row.
   */
  row: PropTypes.bool,
};

FormGroup.defaultProps = {
  row: false,
};

export default withStyles(styles, { name: 'MuiFormGroup' })(FormGroup);

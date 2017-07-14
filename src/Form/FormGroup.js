// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormGroup', {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
});

/**
 * FormGroup wraps controls such as Checkbox and Switch.
 * It provides compact row layout and FormLabel awareness.
 */
function FormGroup(props) {
  const { classes, className, children, row, ...other } = props;
  const rootClassName = classNames(
    classes.root,
    {
      [classes.row]: row,
    },
    className,
  );

  return (
    <div className={rootClassName} {...other}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
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

export default withStyles(styleSheet)(FormGroup);

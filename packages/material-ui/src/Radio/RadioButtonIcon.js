import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    position: 'relative',
    width: '24px',
    height: '24px',
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  inner: {
    transform: 'translateY(12px) scale(0)',
    transition: 'transform 100ms',
  },
  innerChecked: {
    transform: 'none',
  },
};

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <div className={clsx(classes.inner, checked && classes.innerChecked)}>
        <RadioButtonCheckedIcon className={classes.icon} />
      </div>
      <RadioButtonUncheckedIcon className={classes.icon} />
    </div>
  );
}

RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiRadioButtonIcon' })(RadioButtonIcon);

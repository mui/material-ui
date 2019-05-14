import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
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
  outline: {
    clipPath:
      'polygon(0% 0%, 0% 100%, 5px 100%, 5px 5px, 19px 5px, 19px 19px, 5px 19px, 5px 100%, 100% 100%, 100% 0%)',
    transition: theme.transitions.create('clip-path', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
  },
  outlineChecked: {
    transition: theme.transitions.create('clip-path', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    clipPath:
      'polygon(0% 0%, 0% 100%, 7px 100%, 7px 50%, 15px 50%, 15px 50%, 7px 50%, 7px 100%, 100% 100%, 100% 0%)',
  },
});

/**
 * @ignore - internal component.
 */
function CheckboxButtonIcon(props) {
  const { checked, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <IndeterminateCheckBoxIcon
        className={clsx(classes.icon, classes.outline, checked && classes.outlineChecked)}
      />
    </div>
  );
}

CheckboxButtonIcon.propTypes = {
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

export default withStyles(styles, { name: 'MuiCheckboxButtonIcon' })(CheckboxButtonIcon);

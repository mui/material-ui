import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckBoxBlankIcon from '../internal/svg-icons/CheckBoxBlank';
import CheckIcon from '../internal/svg-icons/Check';
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
      'polygon(0% 0%, 0% 100%, 50% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 100% 100%, 100% 0%)',
  },
  check: {
    // This is not a good idea, but I'm not sure what else I can do.
    fill: 'white',
    clipPath: 'inset(0 100% 0 0)',
    transition: [
      theme.transitions.create('clip-path', {
        duration: 0,
        delay: theme.transitions.duration.shortest,
      }),
      theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
      }),
    ],
    opacity: 0,
  },
  checkChecked: {
    clipPath: 'inset(0 0 0 0)',
    opacity: 1,
    transition: theme.transitions.create('clip-path', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
      delay: 50,
    }),
  },
});

/**
 * @ignore - internal component.
 */
function CheckboxButtonIcon(props) {
  const { checked, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <CheckBoxBlankIcon
        className={clsx(classes.icon, classes.outline, checked && classes.outlineChecked)}
      />
      <CheckIcon className={clsx(classes.icon, classes.check, checked && classes.checkChecked)} />
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

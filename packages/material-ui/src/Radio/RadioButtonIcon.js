import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';

const duration = 83; // 1s / 60 FPS * 5 frames

export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    '&$checked $layer': {
      transform: 'scale(1)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeOut,
        duration,
      }),
    },
  },
  layer: {
    position: 'absolute',
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration,
    }),
  },
  checked: {},
});

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, { [classes.checked]: checked }, className)} {...other}>
      <RadioButtonUncheckedIcon />
      <RadioButtonCheckedIcon className={classes.layer} />
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

export default withStyles(styles, { name: 'PrivateRadioButtonIcon' })(RadioButtonIcon);

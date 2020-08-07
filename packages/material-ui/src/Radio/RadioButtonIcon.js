import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';

export const styles = (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    '&$checked $layer': {
      transform: 'scale(1)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
  },
  layer: {
    left: 0,
    position: 'absolute',
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
  },
  checked: {},
});

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked, classes, fontSize } = props;

  return (
    <div className={clsx(classes.root, { [classes.checked]: checked })}>
      <RadioButtonUncheckedIcon fontSize={fontSize} />
      <RadioButtonCheckedIcon fontSize={fontSize} className={classes.layer} />
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
   * The size of the radio.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'default']),
};

export default withStyles(styles, { name: 'PrivateRadioButtonIcon' })(RadioButtonIcon);

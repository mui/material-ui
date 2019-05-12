import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';
import Zoom from '../Zoom';

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
};

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked, classes, className, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Zoom in={checked} timeout={100}>
        <RadioButtonCheckedIcon className={classes.icon} />
      </Zoom>
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

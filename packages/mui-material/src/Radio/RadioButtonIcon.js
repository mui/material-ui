import * as React from 'react';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import styled from '../styles/styled';

const RadioButtonIconRoot = styled('span')({
  position: 'relative',
  display: 'flex',
});

const RadioButtonIconBackground = styled(RadioButtonUncheckedIcon)({
  // Scale applied to prevent dot misalignment in Safari
  transform: 'scale(1)',
});

const RadioButtonIconDot = styled(RadioButtonCheckedIcon)(({ theme, ownerState }) => ({
  left: 0,
  position: 'absolute',
  transform: 'scale(0)',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest,
  }),
  ...(ownerState.checked && {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
  }),
}));

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked = false, classes = {}, fontSize } = props;

  const ownerState = { ...props, checked };

  return (
    <RadioButtonIconRoot className={classes.root} ownerState={ownerState}>
      <RadioButtonIconBackground
        fontSize={fontSize}
        className={classes.background}
        ownerState={ownerState}
      />
      <RadioButtonIconDot fontSize={fontSize} className={classes.dot} ownerState={ownerState} />
    </RadioButtonIconRoot>
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
  classes: PropTypes.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'medium']),
};

export default RadioButtonIcon;

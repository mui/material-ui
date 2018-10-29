import clamp from '../utils/clamp';

export function getTransitionOptions(theme) {
  return {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeOut,
  };
}

export function getValueInPercent(props) {
  const { min, max, value } = props;
  return clamp(((value - min) * 100) / (max - min));
}

/**
 *
 * @param {Object} context
 * @param {Object} context.classes - jss classes
 * @param {boolean} context.disabled
 * @param {string} context.state - state of the slider
 * @param {boolean} context.vertical
 * @returns arg for classnames
 */
export function getVisualStateClasses(context) {
  const { classes, disabled, state, vertical } = context;
  return {
    [classes.disabled]: disabled,
    [classes.jumped]: !disabled && state === 'jumped',
    [classes.focused]: !disabled && state === 'focused',
    [classes.activated]: !disabled && state === 'activated',
    [classes.vertical]: vertical,
  };
}

export function percentToValue(percent, props) {
  const { min, max } = props;
  return ((max - min) * percent) / 100 + min;
}

export function roundToStep(number, step) {
  return Math.round(number / step) * step;
}

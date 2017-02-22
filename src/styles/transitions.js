// @flow weak
/* eslint-disable no-param-reassign */

import warning from 'warning';

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easingInternal = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
};

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
const durationInternal = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

const formatMs = (miliseconds) => `${Math.round(miliseconds)}ms`;
const isString = (value) => typeof value === 'string';
const isNumber = (value) => !isNaN(parseFloat(value));

/**
 * @param {string|Array} props
 * @param {object} param
 * @param {string} param.prop
 * @param {number} param.duration
 * @param {string} param.easing
 * @param {number} param.delay
*/
export default {
  easing: easingInternal,

  duration: durationInternal,

  create(props = ['all'], {
    duration = durationInternal.standard,
    easing = easingInternal.easeInOut,
    delay = 0,
    ...other
  } = {}) {
    warning(isString(props) || Array.isArray(props),
      'argument "props" must be a string or Array');
    warning(isNumber(duration),
      'argument "duration" must be a number');
    warning(isString(easing),
      'argument "easing" must be a string');
    warning(isNumber(delay),
      'argument "delay" must be a string');
    warning(Object.keys(other).length === 0,
      `unrecognized argument(s) [${Object.keys(other).join(',')}]`);

    return (Array.isArray(props) ? props : [props])
      .map((animatedProp) => `${animatedProp} ${formatMs(duration)} ${easing} ${formatMs(delay)}`)
      .join(',');
  },

  getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }

    const constant = height / 36;
    const duration = (4 + (15 * (constant ** 0.25)) + (constant / 5)) * 10;

    return Math.round(duration);
  },
};

/**
 * @deprecated Will be removed, please access via theme.transitions.easing
 */
export const easing = easingInternal;
/**
 * @deprecated Will be removed, please access via theme.transitions.duration
 */
export const duration = durationInternal;

// @flow weak
/* eslint-disable no-param-reassign */

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing = {
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
export const durations = {
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

export default {
  multi(property, duration, delay, easeFunction) {
    easeFunction = easeFunction || easing.easeInOut;

    if (property && Array.isArray(property)) {
      let transitions = '';
      for (let i = 0; i < property.length; i += 1) {
        if (transitions) transitions += ',';
        transitions += this.create(property[i], duration, delay, easeFunction);
      }

      return transitions;
    }

    return this.create(duration, property, delay, easeFunction);
  },

  create(property, duration, delay, easeFunction) {
    duration = duration || '300ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || easing.easeInOut;

    return `${property} ${duration} ${easeFunction} ${delay}`;
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

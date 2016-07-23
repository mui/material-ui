// @flow weak
/* eslint-disable no-param-reassign */

export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
};

export default {
  multi(property, duration, delay, easeFunction) {
    easeFunction = easeFunction || easing.easeInOut;

    if (property && Array.isArray(property)) {
      let transitions = '';
      for (let i = 0; i < property.length; i++) {
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
};

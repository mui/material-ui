let AutoPrefix = require('./auto-prefix');

module.exports = {

  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut(duration, property, delay, easeFunction) {

    easeFunction = easeFunction || this.easeOutFunction;

    if (property &&
      Object.prototype.toString.call(property) === '[object Array]' ) {

      let transitions = '';
      for (let i = 0; i < property.length; i++) {
        if (transitions) transitions += ',';
        transitions += this.create(duration, property[i], delay, easeFunction);
      }
      return transitions;

    }
    else {
      return this.create(duration, property, delay, easeFunction);
    }

  },

  create(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || "linear";

    return property + ' ' +
      duration + ' ' +
      easeFunction + ' ' +
      delay;
  },
};

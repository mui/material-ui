var AutoPrefix = require('../auto-prefix.js');

module.exports = {

  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',

  easeOut: function(duration, property, delay) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    return AutoPrefix.singleHyphened(property) + ' ' +
      duration + ' ' +
      this.easeOutFunction + ' ' +
      delay;
  }

}
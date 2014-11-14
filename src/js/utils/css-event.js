var Events = require('./events.js');

module.exports = {

  onTransitionEnd: function (el, callback) {
    Events.once(el, 'webkitTransitionEnd ' +
      'otransitionend ' +
      'oTransitionEnd ' +
      'msTransitionEnd ' +
      'transitionend', function() {
        return callback();
      }
    );
  },

  onAnimationEnd: function (el, callback) {
    Events.once(el, 'webkitAnimationEnd ' +
      'oanimationend ' +
      'msAnimationEnd ' +
      'animationend', function() {
        return callback();
      }
    );
  }

};
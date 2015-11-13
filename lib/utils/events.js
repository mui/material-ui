'use strict';

module.exports = {

  once: function once(el, type, callback) {
    var typeArray = type ? type.split(' ') : [];
    var recursiveFunction = function recursiveFunction(e) {
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },

  on: function on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      // IE8+ Support
      el.attachEvent('on' + type, function () {
        callback.call(el);
      });
    }
  },

  off: function off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      // IE8+ Support
      el.detachEvent('on' + type, callback);
    }
  },

  isKeyboard: function isKeyboard(e) {
    return ['keydown', 'keypress', 'keyup'].indexOf(e.type) !== -1;
  }
};
'use strict';

var isBrowser = typeof window !== 'undefined';
var Modernizr = isBrowser ? require('../utils/modernizr.custom') : undefined;

module.exports = {

  all: function all(styles) {
    var prefixedStyle = {};
    for (var key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set: function set(style, key, value) {
    style[this.single(key)] = value;
  },

  single: function single(key) {
    return isBrowser ? Modernizr.prefixed(key) : key;
  },

  singleHyphened: function singleHyphened(key) {
    var str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }

};
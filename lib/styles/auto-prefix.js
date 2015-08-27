'use strict';

var isBrowser = typeof window !== 'undefined';
var Modernizr = isBrowser ? require('../utils/modernizr.custom') : undefined;

//Keep track of already prefixed keys so we can skip Modernizr prefixing
var prefixedKeys = {};

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

    //If a browser doesn't exist, we can't prefix with Modernizr so
    //just return the key
    if (!isBrowser) return key;

    //Check if we've prefixed this key before, just return it
    if (prefixedKeys.hasOwnProperty(key)) return prefixedKeys[key];

    //Key hasn't been prefixed yet, prefix with Modernizr
    var prefKey = Modernizr.prefixed(key);

    // Windows 7 Firefox has an issue with the implementation of Modernizr.prefixed
    // and is capturing 'false' as the CSS property name instead of the non-prefixed version.
    if (prefKey === false) return key;

    //Save the key off for the future and return the prefixed key
    prefixedKeys[key] = prefKey;
    return prefKey;
  },

  singleHyphened: function singleHyphened(key) {
    var str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }

};
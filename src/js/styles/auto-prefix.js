var Modernizr = require('../utils/modernizr.custom.js');

module.exports = function(styles) {

  var prefixedStyle = {};

  for (var key in styles) {
    prefixedStyle[Modernizr.prefixed(key)] = styles[key];
  }

  return prefixedStyle;

}
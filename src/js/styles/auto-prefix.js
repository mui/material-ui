var Modernizr = require('../utils/modernizr.custom');

module.exports = {

  all: function(styles) {
    var prefixedStyle = {};
    for (var key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  single: function(key) {
    return Modernizr.prefixed(key);
  },

  singleHyphened: function(key) {
    var str = this.single(key);

    return str.replace(/([A-Z])/g, function(str,m1){ 
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  }

}
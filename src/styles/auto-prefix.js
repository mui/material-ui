let isBrowser = typeof window !== 'undefined';
let Modernizr = isBrowser ? require('../utils/modernizr.custom') : undefined;

module.exports = {

  all: function(styles) {
    let prefixedStyle = {};
    for (let key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set: function(style, key, value) {
    style[this.single(key)] = value;
  },

  single: function(key) {
    return isBrowser ? Modernizr.prefixed(key) : key;
  },

  singleHyphened: function(key) {
    let str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, function(str,m1){
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  }

};

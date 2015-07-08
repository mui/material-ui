const isBrowser = typeof window !== 'undefined';
let Modernizr = isBrowser ? require('../utils/modernizr.custom') : undefined;


module.exports = {

  all(styles) {
    let prefixedStyle = {};
    for (let key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set(style, key, value) {
    style[this.single(key)] = value;
  },

  single(key) {
    return isBrowser ? Modernizr.prefixed(key) : key;
  },

  singleHyphened(key) {
    let str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, (str,m1) => {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  },

};

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
    if (isBrowser) {
      // Windows 7 Firefox has an issue with the implementation of Modernizr.prefixed
      // and is capturing 'false' as the CSS property name instead of the non-prefixed version.
      let prefKey = Modernizr.prefixed(key);
      return prefKey === false ? key : prefKey;
    }
    else {
      return key;
    }
  },

  singleHyphened(key) {
    let str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, (str,m1) => {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  },

};

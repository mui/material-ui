import InlineStylePrefixer from 'inline-style-prefixer';

const prefixers = {};

module.exports = {

  getPrefixer() {
    let userAgent;

    // Server-side renderer needs to supply user agent
    if (typeof navigator === 'undefined') {
      console.warn(`Material-UI expects the global navigator.userAgent to be defined for server-side rendering. Set this property when receiving the request headers.`)
      userAgent = '*';
    } else {
      userAgent = navigator.userAgent;
    }

    // Get prefixing instance for this user agent
    let prefixer = prefixers[userAgent];
    // None found, create a new instance
    if (!prefixer) {
      prefixer = new InlineStylePrefixer(userAgent);
      prefixers[userAgent] = prefixer;
    }
    return prefixer;
  },

  all(styles) {
    if (!styles)
      return {};
    return this.getPrefixer().prefix(styles);
  },

  set(style, key, value) {
    style[key] = value;
    style = this.getPrefixer().prefix(style);
  },

  getPrefix(key) {
    let style = {};
    style[key] = true;
    let prefixes = Object.keys(this.getPrefixer().prefix(style));
    return prefixes ? prefixes[0] : key;
  },

};

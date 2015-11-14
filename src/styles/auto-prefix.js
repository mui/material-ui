import InlineStylePrefixer from 'inline-style-prefixer';

const prefixers = {};

export default {

  getPrefixer() {
    // Server-side renderer needs to supply user agent
    if (typeof navigator === 'undefined') {
      console.warn(`Material-UI expects the global navigator.userAgent to be defined for server-side rendering. Set this property when receiving the request headers.`)
      return null;
    }

    const userAgent = navigator.userAgent;

    // Get prefixing instance for this user agent
    let prefixer = prefixers[userAgent];
    // None found, create a new instance
    if (!prefixer) {
      prefixer = new InlineStylePrefixer(userAgent);
      prefixers[userAgent] = prefixer;
    }

    return prefixer;
  },

  all(style) {
    if (!style) {
      return {};
    }

    const prefixer = this.getPrefixer();

    if (prefixer) {
      return prefixer.prefix(style);
    } else {
      return InlineStylePrefixer.prefixAll(style);
    }
  },

  set(style, key, value) {
    style[key] = value;

    const prefixer = this.getPrefixer();

    if (prefixer) {
      style = prefixer.prefix(style);
    } else {
      style = InlineStylePrefixer.prefixAll(style);
    }
  },

  getPrefix(key) {
    let style = {};
    style[key] = true;

    const prefixer = this.getPrefixer();
    let prefixes;

    if (prefixer) {
      prefixes = Object.keys(prefixer.prefix(style));
    } else {
      prefixes = Object.keys(InlineStylePrefixer.prefixAll(style));
    }

    return prefixes ? prefixes[0] : key;
  },

};

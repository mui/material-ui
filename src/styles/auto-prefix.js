import InlineStylePrefixer from 'inline-style-prefixer';
import warning from 'warning';

const prefixers = {};

let hasWarnedAboutNavigator = false;

function getPrefixer() {
  // Server-side renderer needs to supply user agent
  if (typeof navigator === 'undefined' && !hasWarnedAboutNavigator) {
    warning(false, `Material-UI expects the global navigator.userAgent to be defined
      for server-side rendering. Set this property when receiving the request headers.`);

    hasWarnedAboutNavigator = true;

    return null;
  }

  const userAgent = navigator.userAgent;

  // Get prefixing instance for this user agent
  let prefixer = prefixers[userAgent];
  // None found, create a new instance
  if (!prefixer) {
    prefixer = new InlineStylePrefixer({
      userAgent: userAgent,
    });
    prefixers[userAgent] = prefixer;
  }

  return prefixer;
}

export default {

  getPrefixer() {
    warning(false, `getPrefixer() is private to this lib. Do not use it.`);
    return getPrefixer();
  },

  all(style) {
    if (!style) {
      return {};
    }

    const prefixer = getPrefixer();

    if (prefixer) {
      return prefixer.prefix(style);
    } else {
      return InlineStylePrefixer.prefixAll(style);
    }
  },

  set(style, key, value) {
    style[key] = value;

    const prefixer = getPrefixer();

    if (prefixer) {
      style = prefixer.prefix(style);
    } else {
      style = InlineStylePrefixer.prefixAll(style);
    }
  },

  getPrefix(key) {
    warning(false, `getPrefix() is no longer used, it will be removed. Do not use it`);

    let style = {};
    style[key] = true;

    const prefixer = getPrefixer();
    let prefixes;

    if (prefixer) {
      prefixes = Object.keys(prefixer.prefix(style));
    } else {
      prefixes = Object.keys(InlineStylePrefixer.prefixAll(style));
    }

    return prefixes ? prefixes[0] : key;
  },

};

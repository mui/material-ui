import InlineStylePrefixer from 'inline-style-prefixer';
import warning from 'warning';

const prefixers = {};

let hasWarnedAboutNavigator = false;

function getPrefixer(userAgent) {
  if (typeof navigator !== 'undefined') {
    userAgent = navigator.userAgent;
  }

  if (userAgent === null && !hasWarnedAboutNavigator) {
    warning(false, `Material-UI: userAgent should be supplied in the muiTheme context
      for server-side rendering.`);

    hasWarnedAboutNavigator = true;

    return null;
  }

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
    warning(false, `Material UI: getPrefixer() is private to this lib. Do not use it.`);
    return getPrefixer();
  },

  getTransform(userAgent) {
    const prefixer = getPrefixer(userAgent);

    if (prefixer) {
      return prefixer.prefix;
    } else {
      return InlineStylePrefixer.prefixAll;
    }
  },

  all(style) {
    if (!style) {
      return {};
    }

    warning(false, `Material UI: all() is no longer used, it will be removed. Do not use it`);

    const prefixer = getPrefixer();

    if (prefixer) {
      return prefixer.prefix(style);
    } else {
      return InlineStylePrefixer.prefixAll(style);
    }
  },

  set(style, key, value, muiTheme) {
    style[key] = value;

    if (muiTheme) {
      style = muiTheme.prefix(style);
    } else {
      warning(false, `Material UI: you need to provide the muiTheme to the autoPrefix.set()`);

      const prefixer = getPrefixer();

      if (prefixer) {
        style = prefixer.prefix(style);
      } else {
        style = InlineStylePrefixer.prefixAll(style);
      }
    }
  },

  getPrefix(key) {
    warning(false, `Material UI: getPrefix() is no longer used, it will be removed. Do not use it`);

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

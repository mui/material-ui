import InlineStylePrefixer from 'inline-style-prefixer';
import warning from 'warning';

const prefixers = {};

let hasWarnedAboutUserAgent = false;

export default {

  getTransform(userAgent) {
    if (userAgent === undefined && typeof navigator !== 'undefined') {
      userAgent = navigator.userAgent;
    }

    if (userAgent === undefined && !hasWarnedAboutUserAgent) {
      warning(false, `Material UI: userAgent should be supplied in the muiTheme context
        for server-side rendering.`);

      hasWarnedAboutUserAgent = true;
    }

    if (userAgent === false) { // Disabled autoprefixer
      return (style) => style;
    } else if (userAgent === 'all' || userAgent === undefined) { // Prefix for all user agent
      return InlineStylePrefixer.prefixAll;
    } else {
      const prefixer = new InlineStylePrefixer({
        userAgent: userAgent,
      });

      return prefixer.prefix;
    }
  },

  getPrefixer() {
    warning(false, `Material UI: getPrefixer() is no longer used. Do not use it.`);

    if (typeof navigator === 'undefined') {
      warning(false, `Material UI expects the global navigator.userAgent to be defined
        for server-side rendering. Set this property when receiving the request headers.`);

      return null;
    }

    const userAgent = navigator.userAgent;

    // Get prefixing instance for this user agent
    let prefixer = prefixers[userAgent];
    // None found, create a new instance
    if (!prefixer) {
      prefixer = new InlineStylePrefixer({userAgent: userAgent});
      prefixers[userAgent] = prefixer;
    }

    return prefixer;
  },

  all(style) {
    if (!style) {
      return {};
    }

    warning(false, `Material UI: all() is no longer used, it will be removed. Do not use it`);

    const prefixer = this.getPrefixer();

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

      const prefixer = this.getPrefixer();

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

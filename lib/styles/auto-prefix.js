'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var prefixers = {};

module.exports = {

  getPrefixer: function getPrefixer() {
    var userAgent = undefined;

    // Server-side renderer needs to supply user agent
    if (typeof navigator === 'undefined') {
      console.warn('Material-UI expects the global navigator.userAgent to be defined for server-side rendering. Set this property when receiving the request headers.');
      userAgent = '*';
    } else {
      userAgent = navigator.userAgent;
    }

    // Get prefixing instance for this user agent
    var prefixer = prefixers[userAgent];
    // None found, create a new instance
    if (!prefixer) {
      prefixer = new _inlineStylePrefixer2['default'](userAgent);
      prefixers[userAgent] = prefixer;
    }
    return prefixer;
  },

  all: function all(styles) {
    if (!styles) return {};
    return this.getPrefixer().prefix(styles);
  },

  set: function set(style, key, value) {
    style[key] = value;
    style = this.getPrefixer().prefix(style);
  },

  getPrefix: function getPrefix(key) {
    var style = {};
    style[key] = true;
    var prefixes = Object.keys(this.getPrefixer().prefix(style));
    return prefixes ? prefixes[0] : key;
  }

};
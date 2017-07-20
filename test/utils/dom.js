// @flow

const { JSDOM } = require('jsdom');

// We can use jsdom-global at some point if maintaining that list turns out to be a burden.
const KEYS = ['HTMLElement'];

function createDOM() {
  const dom = new JSDOM('');
  global.document = dom.document;
  global.window = dom.window;

  Object.keys(dom.window).forEach(property => {
    if (typeof global[property] === 'undefined') {
      global[property] = dom.window[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };

  KEYS.forEach(key => {
    global[key] = window[key];
  });
}

module.exports = createDOM;

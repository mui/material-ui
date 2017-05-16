// @flow

const { JSDOM } = require('jsdom');

function createDOM() {
  const dom = new JSDOM('');
  global.document = dom.document;
  global.window = dom.window;

  Object.keys(dom.window).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = dom.window[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };
}

module.exports = createDOM;

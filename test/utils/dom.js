// @flow weak
const { jsdom } = require('jsdom');

function createDOM() {
  global.document = jsdom('');
  global.window = document.defaultView;

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };
}

module.exports = createDOM;

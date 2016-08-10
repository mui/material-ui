// @flow weak
const { jsdom } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

module.exports = createDOM;

function createDOM() {
  global.document = jsdom('');
  global.window = document.defaultView;

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property);
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };
}

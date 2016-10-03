// @flow weak
const { jsdom } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

<<<<<<< HEAD
/* Stubbing `window.matchMedia` */
function matchMedia() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
}

=======
>>>>>>> [test] Run eslint on more files
function createDOM() {
  global.document = jsdom('');
  global.window = document.defaultView;
  global.window.matchMedia = matchMedia;
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

module.exports = createDOM;

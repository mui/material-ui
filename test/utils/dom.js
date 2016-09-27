// @flow weak
const { jsdom } = require('jsdom');

<<<<<<< HEAD
<<<<<<< HEAD
const exposedProperties = ['window', 'navigator', 'document'];

<<<<<<< HEAD
=======
>>>>>>> [mocha]: jsdom stub `window.matchMedia` function
/* Stubbing `window.matchMedia` */
function matchMedia() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
}

<<<<<<< HEAD
=======
>>>>>>> [test] Run eslint on more files
=======
>>>>>>> [Dialog] Fix an issue with the SSR
=======
>>>>>>> [mocha]: jsdom stub `window.matchMedia` function
function createDOM() {
  global.document = jsdom('');
  global.window = document.defaultView;
  global.window.matchMedia = matchMedia;
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

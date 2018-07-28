// @flow

const { JSDOM } = require('jsdom');
const Node = require('jsdom/lib/jsdom/living/node-document-position');

// We can use jsdom-global at some point if maintaining that list turns out to be a burden.
const whiteList = ['HTMLElement', 'Performance'];
const blackList = ['sessionStorage', 'localStorage'];

function createDOM() {
  const dom = new JSDOM('', { pretendToBeVisual: true });
  global.window = dom.window;
  global.Node = Node;
  global.document = dom.window.document;
  // Not yet supported: https://github.com/jsdom/jsdom/issues/317
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
  global.navigator = {
    userAgent: 'node.js',
  };

  Object.keys(dom.window)
    .filter(key => !blackList.includes(key))
    .concat(whiteList)
    .forEach(key => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key];
      }
    });
}

module.exports = createDOM;

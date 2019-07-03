const { JSDOM } = require('jsdom');
const Node = require('jsdom/lib/jsdom/living/node-document-position');

// We can use jsdom-global at some point if maintaining these lists is a burden.
const whitelist = ['Element', 'HTMLElement', 'HTMLInputElement', 'Performance'];
const blacklist = ['sessionStorage', 'localStorage'];

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
  // Not yet supported: https://github.com/jsdom/jsdom/issues/2152
  class Touch {
    constructor(instance) {
      this.instance = instance;
    }

    get identifier() {
      return this.instance.identifier;
    }

    get pageX() {
      return this.instance.pageX;
    }

    get pageY() {
      return this.instance.pageY;
    }

    get clientX() {
      return this.instance.clientX;
    }

    get clientY() {
      return this.instance.clientY;
    }
  }
  global.window.Touch = Touch;

  global.navigator = {
    userAgent: 'node.js',
  };

  Object.keys(dom.window)
    .filter(key => !blacklist.includes(key))
    .concat(whitelist)
    .forEach(key => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key];
      }
    });

  // required for wait-for-expect
  // not added by jsdom by default
  window.Date = global.Date;
}

module.exports = createDOM;

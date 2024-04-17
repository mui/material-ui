import { JSDOM } from 'jsdom';

// We can use jsdom-global at some point if maintaining these lists is a burden.
const whitelist = [
  // used by React's experimental cache API
  // Always including it to reduce churn when switching between React builds
  'AbortController',
  // required for fake getComputedStyle
  'CSSStyleDeclaration',
  'Element',
  'Event',
  'TouchEvent',
  'Image',
  'HTMLElement',
  'HTMLInputElement',
  'Node',
  'Performance',
  'document',
  'DocumentFragment',
];
const blacklist = ['sessionStorage', 'localStorage'];

function createDOM() {
  const dom = new JSDOM('', {
    pretendToBeVisual: true,
    url: 'http://localhost',
  });
  global.window = dom.window;
  // Not yet supported: https://github.com/jsdom/jsdom/issues/2152
  class Touch {
    instance;

    constructor(options) {
      this.instance = options;
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

    get force() {
      return this.instance.force;
    }

    get radiusX() {
      return this.instance.radiusX;
    }

    get radiusY() {
      return this.instance.radiusY;
    }

    get rotationAngle() {
      return this.instance.rotationAngle;
    }

    get screenX() {
      return this.instance.screenX;
    }

    get screenY() {
      return this.instance.screenY;
    }

    get target() {
      return this.instance.target;
    }
  }
  global.window.Touch = Touch;

  global.navigator = {
    ...global.navigator,
    userAgent: 'node.js',
  };

  Object.keys(dom.window)
    .filter((key) => !blacklist.includes(key))
    .concat(whitelist)
    .forEach((key) => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key];
      }
    });
}

export default createDOM;

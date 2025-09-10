import { configure } from '@testing-library/dom';
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
const blacklist = new Set(['sessionStorage', 'localStorage']);

function initDom() {
  if (globalThis.window) {
    return;
  }

  const dom = new JSDOM('', {
    pretendToBeVisual: true,
    url: 'http://localhost',
  });

  (globalThis as any).window = dom.window;

  // Not yet supported: https://github.com/jsdom/jsdom/issues/2152
  class Touch {
    instance: any;

    constructor(instance: any) {
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
  (globalThis as any).window.Touch = Touch;

  Object.keys(dom.window)
    .filter((key) => !blacklist.has(key))
    .concat(whitelist)
    .forEach((key) => {
      if (typeof (globalThis as any)[key] === 'undefined') {
        (globalThis as any)[key] = dom.window[key];
      }
    });
}

initDom();

configure({
  // JSDOM logs errors otherwise on `getComputedStyle(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});

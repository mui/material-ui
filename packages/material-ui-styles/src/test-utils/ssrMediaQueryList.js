import cssMatchMedia from 'css-mediaquery';

export default function ssrMediaQueryList(media, screen) {
  // wrap new into something else
  if (this instanceof ssrMediaQueryList) {
    return ssrMediaQueryList(media, screen);
  }
  const listeners = new Set();
  const obj = {};
  let onchange;
  let matches = cssMatchMedia.match(media, { width: screen.getWidth() } );
  //console.log(media, screen.getWidth(), matches);
  Object.defineProperties(obj, {
    matches: {
      //writable: false,
      //configurable: false,
      get: () => {
        return matches;
      },
    },
    media: {
      get: () => {
        return media;
      },
      //writable: false,
      //configurable: false,
    },
    addListener: {
      value: (fn) => {
        listeners.add(fn);
      },
      //writable: false,
      //configurable: false,
    },
    removeListener: {
      value: (fn) => {
        listeners.delete(fn);
      },
      //writable: false,
      //enumerable: false,
    },

    dispatchEvent: {
      // { type: 'change', matched: current, media: k, width }
      value: e => {
        if (e.matched === matches) return; // no changes? do nothing
        matches = e.matched;
        listeners.forEach(fn => fn(e));
        if (onchange) {
          this.onchange(e);
        }
      },
      //writable: false,
      //configurable: false,
    },
    onchange: {
      set: fn => {
        if (typeof fn !== 'function') {
          throw new Error('the value must be a function');
        }
        onchange = fn;
      },
      get: () => {
        return onchange;
      },
      //writable: false,
      //configurable: false,
    },
  });
  screen.register(media, obj);
  return obj;
}

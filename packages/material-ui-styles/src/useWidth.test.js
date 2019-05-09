import React from 'react';

import {
  assert
} from 'chai';

import {
  createMount
} from '@material-ui/core/test-utils';

import useTheme from './useTheme';
import useWidth from './useWidth';
import ThemeProvider from './ThemeProvider';

import ssrMatchMedia from 'css-mediaquery';
// mediaQuerus 1 -> n mediaQueryList -> 1->n listeners

function createScreen(){
  let width = 640;
  const mqls = new Map(); // mqls
  return {
    getWidth(){
       width
    },
    setWidth(w){
      width = w;
      mqls.forEach( (mSet, k, map) => {
        const current = sstMatchMedia(k, { width });
         // v is a set
        mSet.forEach(mql =>{
          if (current === mql.matches) return; // no changes? do nothing
          mql.dipatchEvent({type: 'change', matched: current, media:k, width });
        });
      });
    },
    register(media, l){
      const mSet = mqls.get(media) || new Set();
      mSet.add(l);
      mqls.set(media, mSet);
    }
  }
}

function ssrMediaQueryList(media, screen) {
  // wrap new into something else
  if (this instanceof global.MediaQueryList) {
    return ssrMediaQueryList(media, screen);
  }
  const listeners = new Set();
  const obj = {};
  let onchange = undefined;
  Object.defineProperties(obj, {
    matches: {
      writable: false,
      configurable: false,
      get: () => {
        return ssrMatchMedia(media, screen.getWidth());
      },
    },
    media:{
      get: ()=>{
        return media;
      },
      writable: false,
      configurable: false,
    },
    addListener: {
      value: (fn) => {
        listeners.add(fn);
      },
      writable: false,
      configurable: false,
    },
    removeListener: {
       value: (fn) => {
         listeners.delete(fn);
       },
       writable: false,
       enumerable: false,
    },
    dispatchEvent: {
      value:(e) => {
        for(const fn of listeners){
          fn(e);
        }
        if (this.onchange){
          this.onchange(e);
        }
      },
      writable: false,
      configurable: false
    },
    onchange:{
      set:(fn)=>{
        if (typeof fn !== 'function'){
          throw new Error('the value must be a function');
        }
        change = fn;
      },
      get: () => {
        return change;
      },
      writable: false,
      configurable: false
    }
  })
  screen.register(media, obj)
  return obj;
}

const screen = createScreen();

function ssrMatchMedia(query){
  return ssrMediaQueryList(query, screen);
}

describe('useTheme', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should use the theme', () => {
    function Test() {
      const theme = useTheme();

      return <span>{theme.foo}</span>;
    }

    const wrapper = mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    assert.strictEqual(wrapper.text(), 'foo');
  });
});

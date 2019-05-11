'use strict';


import matchMedia from 'css-mediaquery';

function createScreen(){
  if (this instanceof createScreen){
    return createScreen();
  }
  let width = 640;
  const mqls = new Map(); // could be degenerate,
  const obj = {};

  return Object.defineProperties(obj, {
    width:{
      get:() => width,
      set:(w) => {
        width = w;
        msqs.forEach((mqlSet, media)=>{
          // prefilter based on media
          mqlSet
        });
        const mqlsSet = mqls.get().
      },
      writable: false,
      configurable: false,
    },
    width:{
      set
    },
    {}
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

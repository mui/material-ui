import {
  useState,
  useEffect
} from 'react';

function initial(theme, matchMedia) {
  return () => {
    const found = theme.breakpoints.keys.find(key => {
      const isMatch = matchMedia(theme.breakpoints.only(key).replace(/^@media\s+(.*)$/, '$1')).matches;
      return isMatch;
    });
    return found;
  }
}

export default function useWidth(theme) {

  // if you are not in a browser environment you need to provide an "mediaQueryMatcher"
  //    in theme.props.MuiUseMediaQuery.ssrMatchMedia
  const windowMatchMedia = typeof window ? (window && window.matchMedia) : undefined;
  const {
    props: {
      MuiUseMediaQuery: {
        ssrMatchMedia
      }
    }
  } = theme;
  const matchMedia = windowMatchMedia ? windowMatchMedia : ssrMatchMedia;
  if (matchMedia === undefined) {
    throw new Error('No global "window.matchMedia" or "ssrMatchMedia" found');
  }

  const [width, setWidth] = useState(initial(theme, matchMedia));

  // differs from use
  // always run on when media match fires, not only on mount unmount
  useEffect(() => {
    function listener(e) {
      this.matched = e.matches;
      if (e.matches) {
        setWidth(this.name);
      }
    }
    const state = {};
    const filter = theme.breakpoints.keys;
    for (let i = 0; i < filter.length; i++) {
      const propName = filter[i];
      const obj = {};
      state[propName] = obj;
      obj.name = propName;
      obj.only = theme.breakpoints.only(propName).replace(/^@media\s+(.*)$/, '$1');
      obj.mql = matchMedia(obj.only);
      //console.log(obj.mql.matches, obj.name);
      obj.listener = listener; // because of "this"
      obj.mql.addListener(listener);
      // kickoff
      if (obj.mql.matches && width !== obj.name) {
        //console.log(`size:${propName}:${obj.only}`);
        setWidth(obj.name);
      }
    }
    return function removeAll() {
      for (let i = 0; i < filter.length; i++) {
        const propName = filter[i];
        state[propName].mql.removeListener(listener);
      }
    };
  });
  return width;
}

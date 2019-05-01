import React from 'react';

function getScrollY(ref = window) {
  if (ref && ref.pageYOffset !== undefined && ref.pageYOffset !== null) {
    return ref.pageYOffset;
  }
  if (ref && ref.scrollTop !== undefined && ref.pageYOffset !== null) {
    return ref.scrollTop;
  }
  return document
    ? (document.documentElement || document.body.parentNode || document.body).scrollTop
    : 0;
}

function defaultTrigger(next, current, props = {}) {
  const { directional = true, threshold = 100 } = props;
  if (directional) {
    return next < current ? false : !!(next > current && next > threshold);
  }
  return next > threshold;
}

const useScrollTrigger = (props = {}) => {
  const { triggerFunc = defaultTrigger, ...triggerProps } = props;
  const [ref, setRef] = React.useState();
  const yRef = React.useRef(0);
  const [trigger, setTrigger] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    const scrollY = getScrollY(ref);
    setTrigger(triggerFunc(scrollY, yRef.current, triggerProps));
    yRef.current = scrollY;
  }, [triggerProps, ref, triggerFunc]);

  React.useEffect(() => {
    (ref || window).addEventListener('scroll', handleScroll);
    return () => {
      (ref || window).removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, ref, setRef]);

  return [trigger, setRef];
};

export default useScrollTrigger;

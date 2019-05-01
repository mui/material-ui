import React from 'react';

function getScrollY(ref = window) {
  if (ref && ref.pageYOffset !== undefined) {
    return ref.pageYOffset;
  }
  if (ref && ref.scrollTop !== undefined) {
    return ref.scrollTop;
  }
  return document
    ? (document.documentElement || document.body.parentNode || document.body).scrollTop
    : 0;
}

function defaultTrigger(event, value, props = {}) {
  const { directional = true, threshold = 100 } = props;
  const scrollY = getScrollY(event.currentTarget);
  if (directional) {
    return scrollY < value.current ? false : !!(scrollY > value.current && scrollY > threshold);
  }
  value.current = scrollY;
  return scrollY > threshold;
}

const useScrollTrigger = (props = {}) => {
  const { onTriggerEval = defaultTrigger, ...triggerProps } = props;
  const [target, setTarget] = React.useState();
  const value = React.useRef(0);
  const [trigger, setTrigger] = React.useState(false);

  const handleScroll = React.useCallback(
    event => {
      setTrigger(onTriggerEval(event, value, triggerProps));
    },
    [triggerProps, onTriggerEval],
  );

  React.useEffect(() => {
    (target || window).addEventListener('scroll', handleScroll);
    return () => {
      (target || window).removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, target]);

  return [trigger, setTarget];
};

export default useScrollTrigger;

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
  // eslint-disable-next-line no-nested-ternary
  const trigger = directional
    ? scrollY < value.current
      ? false
      : !!(scrollY > value.current && scrollY > threshold)
    : scrollY > threshold;

  value.current = scrollY;
  return trigger;
}

const useScrollTrigger = (props = {}) => {
  const { onTriggerEval = defaultTrigger, ...initialOptions } = props;
  const [target, setTarget] = React.useState();
  const value = React.useRef(0);
  const [trigger, setTrigger] = React.useState(false);
  const [options, setOptions] = React.useState(initialOptions);

  const handleScroll = React.useCallback(
    event => {
      setTrigger(onTriggerEval(event, value, options));
    },
    [onTriggerEval, options],
  );

  React.useEffect(() => {
    (target || window).addEventListener('scroll', handleScroll);
    return () => {
      (target || window).removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, target]);

  return [trigger, setTarget, setOptions];
};

export default useScrollTrigger;

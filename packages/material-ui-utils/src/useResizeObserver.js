import * as React from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

export default function useResizeObserver() {
  const [rect, setRect] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    let observer;
    try {
      observer = new ResizeObserver(([item]) => {
        setRect(item);
      });
    } catch (err) {
      observer = new ResizeObserverPolyfill(([item]) => {
        setRect(item);
      });
    }
    const item = ref.current;
    observer.observe(item);
    return () => {
      observer.unobserve(item);
    };
  }, [ref]);

  return [rect, ref];
}

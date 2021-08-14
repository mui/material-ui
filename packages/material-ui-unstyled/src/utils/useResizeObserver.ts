import * as React from 'react';

interface Rect {
  width: number;
  height: number;
}

export default function useResizeObserver(): [Rect | null, (elem: Element) => () => void] {
  const [rect, setRect] = React.useState<Rect | null>(null);
  const ref = React.useCallback((elem: Element) => {
    if (!elem) return () => {};
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const target = entries[0];
      setRect(target.contentRect);
    });
    observer.observe(elem);
    return () => {
      observer.unobserve(elem);
    };
  }, []);
  return [rect, ref];
}

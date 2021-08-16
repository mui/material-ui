import * as React from 'react';

interface Rect {
  width: number;
  height: number;
}

export default function useResizeObserver(
  resizeItemRef: React.RefObject<Element | null>,
  resizeHandler?: () => void,
  observeChildren?: boolean,
): Rect[] | null {
  const [items, setItems] = React.useState<Rect[] | null>(null);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const resizeHandlerRef = React.useRef<() => void>();
  resizeHandlerRef.current = resizeHandler;

  React.useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      setItems(entries.map((entry) => entry.contentRect));
      if (resizeHandlerRef.current) {
        resizeHandlerRef.current();
      }
    });
    if (resizeItemRef.current) {
      if (observeChildren) {
        Array.from(resizeItemRef.current.children).forEach((child) => {
          resizeObserverRef.current?.observe(child);
        });
      } else {
        resizeObserverRef.current?.observe(resizeItemRef.current);
      }
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [resizeItemRef, observeChildren]);
  return items;
}

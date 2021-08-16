import * as React from 'react';

export default function useResizeObserver(
  resizeItemRef: React.RefObject<Element | null>,
  resizeHandler?: () => void,
  observeChildren?: boolean,
): void {
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const resizeHandlerRef = React.useRef<() => void>();
  resizeHandlerRef.current = resizeHandler;

  React.useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(() => {
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
}

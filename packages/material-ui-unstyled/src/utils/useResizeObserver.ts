import * as React from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from 'resize-observer';

export default function useResizeObserver(
  resizeItemRef: React.RefObject<Element | null>,
  resizeHandler?: () => void,
  observeChildren?: boolean,
): void {
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);
  const resizeHandlerRef = React.useRef<() => void>();
  resizeHandlerRef.current = resizeHandler;

  React.useEffect(() => {
    try {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (resizeHandlerRef.current) {
          resizeHandlerRef.current();
        }
      });
    } catch (err) {
      resizeObserverRef.current = new ResizeObserverPolyfill(() => {
        if (resizeHandlerRef.current) {
          resizeHandlerRef.current();
        }
      });
    } finally {
      if (resizeItemRef.current) {
        if (observeChildren) {
          Array.from(resizeItemRef.current.children).forEach((child) => {
            resizeObserverRef.current!.observe(child);
          });
        } else {
          resizeObserverRef.current!.observe(resizeItemRef.current);
        }
      }
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [resizeItemRef, observeChildren]);
}

'use client';
import * as React from 'react';
import type { DndMonitorCallbacks } from './DndContextTypes';

/**
 * Listener entry stored in the monitors set.
 */
export type DndMonitorListener = DndMonitorCallbacks;

/**
 * Context value for the monitor system.
 */
export interface DndMonitorContextValue {
  registerMonitor: (callbacks: DndMonitorListener) => () => void;
}

/**
 * Context for registering drag event monitors.
 */
export const DndMonitorContext = React.createContext<DndMonitorContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  DndMonitorContext.displayName = 'DndMonitorContext';
}

/**
 * Hook to subscribe to drag and drop lifecycle events.
 *
 * Use this hook to react to drag events from anywhere in your component tree,
 * as long as you're within a DndContext provider.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useDndMonitor({
 *     onDragStart: (event) => {
 *       console.log('Started dragging:', event.active.id);
 *     },
 *     onDragEnd: (event) => {
 *       if (event.over) {
 *         console.log('Dropped on:', event.over.id);
 *         // Update your state here
 *       }
 *     },
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useDndMonitor(callbacks: DndMonitorCallbacks): void {
  const context = React.useContext(DndMonitorContext);

  // Store callbacks in a ref to avoid re-registering on every render
  const callbacksRef = React.useRef(callbacks);
  callbacksRef.current = callbacks;

  React.useEffect(() => {
    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'MUI: useDndMonitor was called outside of a DndContext. ' +
            'The callbacks will not be invoked.',
        );
      }
      return undefined;
    }

    // Create a stable listener object that reads from the ref
    const listener: DndMonitorListener = {
      onDragStart: (event) => callbacksRef.current.onDragStart?.(event),
      onDragMove: (event) => callbacksRef.current.onDragMove?.(event),
      onDragOver: (event) => callbacksRef.current.onDragOver?.(event),
      onDragEnd: (event) => callbacksRef.current.onDragEnd?.(event),
      onDragCancel: (event) => callbacksRef.current.onDragCancel?.(event),
    };

    const unregister = context.registerMonitor(listener);

    return unregister;
  }, [context]);
}

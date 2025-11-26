'use client';
import * as React from 'react';
import type {
  Active,
  Coordinates,
  DndContextProps,
  DndContextValue,
  DraggableEntry,
  DroppableEntry,
  Over,
  UniqueIdentifier,
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from './DndContextTypes';
import { DndInternalContext } from './useDndContext';
import { DndMonitorContext, DndMonitorListener } from './useDndMonitor';
import { rectIntersection } from './collision';
import { getAnnouncement, defaultScreenReaderInstructions } from './announcements';

/**
 * Styles for the visually hidden live region used for screen reader announcements.
 */
const liveRegionStyles: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

/**
 * DndContext provider component.
 *
 * Manages global drag-and-drop state and coordinates between draggable and droppable elements.
 * Wrap your application (or the section that needs DnD) with this provider.
 *
 * @example
 * ```tsx
 * function App() {
 *   const handleDragEnd = (event: DragEndEvent) => {
 *     const { active, over } = event;
 *     if (over && active.id !== over.id) {
 *       // Reorder items
 *     }
 *   };
 *
 *   return (
 *     <DndContext onDragEnd={handleDragEnd}>
 *       <MyDraggableList />
 *     </DndContext>
 *   );
 * }
 * ```
 */
export function DndContext(props: DndContextProps): React.JSX.Element {
  const {
    children,
    collisionDetection = rectIntersection,
    accessibility,
    onDragStart: onDragStartProp,
    onDragMove: onDragMoveProp,
    onDragOver: onDragOverProp,
    onDragEnd: onDragEndProp,
    onDragCancel: onDragCancelProp,
  } = props;

  // Registries for draggables and droppables
  const draggablesRef = React.useRef<Map<UniqueIdentifier, DraggableEntry>>(new Map());
  const droppablesRef = React.useRef<Map<UniqueIdentifier, DroppableEntry>>(new Map());

  // Monitor callbacks registry
  const monitorsRef = React.useRef<Set<DndMonitorListener>>(new Set());

  // Active drag state
  const [active, setActive] = React.useState<Active | null>(null);
  const [over, setOver] = React.useState<Over | null>(null);

  // Ref to track active state synchronously (React state updates are async)
  const activeRef = React.useRef<Active | null>(null);

  // Track previous over state to detect changes
  const previousOverRef = React.useRef<Over | null>(null);

  // Track the latest over value for immediate access in dragEnd
  // (React state might not be updated yet if RAF is pending)
  const latestOverRef = React.useRef<Over | null>(null);

  // Track the starting coordinates for delta calculation
  const startCoordinatesRef = React.useRef<Coordinates | null>(null);

  // Track the initial rect of the dragged element for virtual rect calculation
  const initialRectRef = React.useRef<DOMRect | null>(null);

  // Track the last pointer coordinates for synchronous collision detection on dragEnd
  const lastPointerCoordinatesRef = React.useRef<Coordinates | null>(null);

  // Live region for screen reader announcements
  const [announcement, setAnnouncement] = React.useState<string>('');

  // Throttle collision detection with requestAnimationFrame
  const rafRef = React.useRef<number | null>(null);

  /**
   * Dispatch an event to all registered monitors.
   */
  const dispatchMonitorEvent = React.useCallback(
    (
      type: 'onDragStart' | 'onDragMove' | 'onDragOver' | 'onDragEnd' | 'onDragCancel',
      event: DragStartEvent | DragMoveEvent | DragOverEvent | DragEndEvent | DragCancelEvent,
    ) => {
      monitorsRef.current.forEach((monitor) => {
        const callback = monitor[type];
        if (callback) {
          // Type assertion needed due to union type complexity
          (callback as (e: typeof event) => void)(event);
        }
      });
    },
    [],
  );

  /**
   * Make a screen reader announcement.
   */
  const announce = React.useCallback(
    (
      type: 'onDragStart' | 'onDragOver' | 'onDragEnd' | 'onDragCancel',
      activeItem: Active,
      overItem: Over | null,
    ) => {
      const text = getAnnouncement(type, activeItem, overItem, accessibility?.announcements);
      if (text) {
        setAnnouncement(text);
      }
    },
    [accessibility?.announcements],
  );

  /**
   * Register a draggable element.
   */
  const registerDraggable = React.useCallback(
    (id: UniqueIdentifier, node: HTMLElement, data: Record<string, unknown> = {}) => {
      draggablesRef.current.set(id, { id, node, data });
    },
    [],
  );

  /**
   * Unregister a draggable element.
   */
  const unregisterDraggable = React.useCallback((id: UniqueIdentifier) => {
    draggablesRef.current.delete(id);
  }, []);

  /**
   * Register a droppable element.
   */
  const registerDroppable = React.useCallback(
    (id: UniqueIdentifier, node: HTMLElement, data: Record<string, unknown> = {}) => {
      droppablesRef.current.set(id, { id, node, data });
    },
    [],
  );

  /**
   * Unregister a droppable element.
   */
  const unregisterDroppable = React.useCallback((id: UniqueIdentifier) => {
    droppablesRef.current.delete(id);
  }, []);

  /**
   * Start a drag operation.
   */
  const dragStart = React.useCallback(
    (id: UniqueIdentifier) => {
      const draggable = draggablesRef.current.get(id);
      if (!draggable) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`MUI: Attempted to start dragging unregistered draggable: ${id}`);
        }
        return;
      }

      const rect = draggable.node.getBoundingClientRect();
      const newActive: Active = {
        id: draggable.id,
        data: draggable.data,
        rect,
      };

      // Store starting position for delta calculations
      startCoordinatesRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Store initial rect for virtual rect calculation during drag
      initialRectRef.current = rect;

      // Set ref synchronously for immediate access in dragMove
      activeRef.current = newActive;
      setActive(newActive);
      setOver(null);
      previousOverRef.current = null;
      latestOverRef.current = null;

      const event: DragStartEvent = { active: newActive };
      dispatchMonitorEvent('onDragStart', event);
      onDragStartProp?.(event);
      announce('onDragStart', newActive, null);
    },
    [dispatchMonitorEvent, announce, onDragStartProp],
  );

  /**
   * Update during drag movement.
   * Collision detection runs synchronously for immediate visual feedback,
   * while event callbacks are throttled with RAF for performance.
   */
  const dragMove = React.useCallback(
    (coordinates: Coordinates) => {
      // Store coordinates for synchronous access in dragEnd
      lastPointerCoordinatesRef.current = coordinates;

      // Use ref for synchronous access (state might not be updated yet)
      const currentActive = activeRef.current;
      if (!currentActive || !initialRectRef.current || !startCoordinatesRef.current) {
        return;
      }

      // Calculate delta from start position
      const delta: Coordinates = {
        x: coordinates.x - startCoordinatesRef.current.x,
        y: coordinates.y - startCoordinatesRef.current.y,
      };

      // Calculate virtual rect based on initial rect + delta
      // This represents where the dragged element visually appears
      const initialRect = initialRectRef.current;
      const virtualRect = {
        left: initialRect.left + delta.x,
        top: initialRect.top + delta.y,
        right: initialRect.right + delta.x,
        bottom: initialRect.bottom + delta.y,
        width: initialRect.width,
        height: initialRect.height,
        x: initialRect.x + delta.x,
        y: initialRect.y + delta.y,
        toJSON: () => ({}),
      } as DOMRect;

      const updatedActive: Active = {
        ...currentActive,
        rect: virtualRect,
      };

      // Also update the ref with the latest active state
      activeRef.current = updatedActive;

      // Run collision detection synchronously for immediate visual feedback
      const collidingId = collisionDetection({
        active: updatedActive,
        droppables: droppablesRef.current,
        pointerCoordinates: coordinates,
      });

      let newOver: Over | null = null;
      if (collidingId !== null) {
        const droppable = droppablesRef.current.get(collidingId);
        if (droppable) {
          newOver = {
            id: droppable.id,
            data: droppable.data,
            rect: droppable.node.getBoundingClientRect(),
          };
        }
      }

      // Update state synchronously for immediate visual feedback
      latestOverRef.current = newOver;
      setOver(newOver);
      setActive(updatedActive);

      // Throttle event callbacks with RAF for performance
      // Cancel any pending callback
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        // Dispatch move event
        const moveEvent: DragMoveEvent = {
          active: updatedActive,
          over: newOver,
          delta,
        };
        dispatchMonitorEvent('onDragMove', moveEvent);
        onDragMoveProp?.(moveEvent);

        // Check if we entered a new droppable
        const previousOverId = previousOverRef.current?.id;
        const currentOverId = newOver?.id;

        if (currentOverId !== previousOverId && newOver !== null) {
          const overEvent: DragOverEvent = {
            active: updatedActive,
            over: newOver,
          };
          dispatchMonitorEvent('onDragOver', overEvent);
          onDragOverProp?.(overEvent);
          announce('onDragOver', updatedActive, newOver);
        }

        previousOverRef.current = newOver;
      });
    },
    [collisionDetection, dispatchMonitorEvent, announce, onDragMoveProp, onDragOverProp],
  );

  /**
   * End a drag operation.
   */
  const dragEnd = React.useCallback(() => {
    // Cancel any pending collision detection
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Use ref for synchronous access (state might not be updated yet)
    const currentActive = activeRef.current;
    if (!currentActive) {
      return;
    }

    // Run synchronous collision detection with the last known coordinates
    // This ensures we have the correct "over" target even if RAF hasn't fired
    let finalOver: Over | null = latestOverRef.current;

    if (lastPointerCoordinatesRef.current && initialRectRef.current && startCoordinatesRef.current) {
      const coordinates = lastPointerCoordinatesRef.current;

      // Calculate delta from start position
      const delta: Coordinates = {
        x: coordinates.x - startCoordinatesRef.current.x,
        y: coordinates.y - startCoordinatesRef.current.y,
      };

      // Calculate virtual rect based on initial rect + delta
      const initialRect = initialRectRef.current;
      const virtualRect = {
        left: initialRect.left + delta.x,
        top: initialRect.top + delta.y,
        right: initialRect.right + delta.x,
        bottom: initialRect.bottom + delta.y,
        width: initialRect.width,
        height: initialRect.height,
        x: initialRect.x + delta.x,
        y: initialRect.y + delta.y,
        toJSON: () => ({}),
      } as DOMRect;

      const updatedActive: Active = {
        ...currentActive,
        rect: virtualRect,
      };

      // Run collision detection synchronously
      const collidingId = collisionDetection({
        active: updatedActive,
        droppables: droppablesRef.current,
        pointerCoordinates: coordinates,
      });

      if (collidingId !== null) {
        const droppable = droppablesRef.current.get(collidingId);
        if (droppable) {
          finalOver = {
            id: droppable.id,
            data: droppable.data,
            rect: droppable.node.getBoundingClientRect(),
          };
        }
      }
    }

    const event: DragEndEvent = {
      active: currentActive,
      over: finalOver,
    };

    dispatchMonitorEvent('onDragEnd', event);
    onDragEndProp?.(event);
    announce('onDragEnd', currentActive, finalOver);

    // Clear both ref and state
    activeRef.current = null;
    setActive(null);
    setOver(null);
    previousOverRef.current = null;
    latestOverRef.current = null;
    startCoordinatesRef.current = null;
    initialRectRef.current = null;
    lastPointerCoordinatesRef.current = null;
  }, [collisionDetection, dispatchMonitorEvent, announce, onDragEndProp]);

  /**
   * Cancel a drag operation.
   */
  const dragCancel = React.useCallback(() => {
    // Cancel any pending collision detection
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Use ref for synchronous access (state might not be updated yet)
    const currentActive = activeRef.current;
    if (!currentActive) {
      return;
    }

    const event: DragCancelEvent = { active: currentActive };

    dispatchMonitorEvent('onDragCancel', event);
    onDragCancelProp?.(event);
    announce('onDragCancel', currentActive, null);

    // Clear both ref and state
    activeRef.current = null;
    setActive(null);
    setOver(null);
    previousOverRef.current = null;
    latestOverRef.current = null;
    startCoordinatesRef.current = null;
    initialRectRef.current = null;
    lastPointerCoordinatesRef.current = null;
  }, [dispatchMonitorEvent, announce, onDragCancelProp]);

  /**
   * Register a monitor to receive drag events.
   */
  const registerMonitor = React.useCallback((callbacks: DndMonitorListener) => {
    monitorsRef.current.add(callbacks);

    return () => {
      monitorsRef.current.delete(callbacks);
    };
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Memoize the internal context value to prevent unnecessary re-renders
  const internalContextValue = React.useMemo<DndContextValue>(
    () => ({
      active,
      over,
      registerDraggable,
      unregisterDraggable,
      registerDroppable,
      unregisterDroppable,
      dragStart,
      dragMove,
      dragEnd,
      dragCancel,
    }),
    [
      active,
      over,
      registerDraggable,
      unregisterDraggable,
      registerDroppable,
      unregisterDroppable,
      dragStart,
      dragMove,
      dragEnd,
      dragCancel,
    ],
  );

  // Memoize the monitor context value
  const monitorContextValue = React.useMemo(
    () => ({
      registerMonitor,
    }),
    [registerMonitor],
  );

  const screenReaderInstructions =
    accessibility?.screenReaderInstructions ?? defaultScreenReaderInstructions;

  return (
    <DndMonitorContext.Provider value={monitorContextValue}>
      <DndInternalContext.Provider value={internalContextValue}>
        {children}
        {/* Visually hidden live region for screen reader announcements */}
        <div
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          style={liveRegionStyles}
        >
          {announcement}
        </div>
        {/* Visually hidden instructions for screen readers */}
        <div id="dnd-instructions" style={liveRegionStyles}>
          {screenReaderInstructions}
        </div>
      </DndInternalContext.Provider>
    </DndMonitorContext.Provider>
  );
}

export default DndContext;

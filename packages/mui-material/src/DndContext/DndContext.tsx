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
 *   return (
 *     <DndContext>
 *       <MyDraggableList />
 *     </DndContext>
 *   );
 * }
 * ```
 */
export function DndContext(props: DndContextProps): React.JSX.Element {
  const { children, collisionDetection = rectIntersection, accessibility } = props;

  // Registries for draggables and droppables
  const draggablesRef = React.useRef<Map<UniqueIdentifier, DraggableEntry>>(new Map());
  const droppablesRef = React.useRef<Map<UniqueIdentifier, DroppableEntry>>(new Map());

  // Monitor callbacks registry
  const monitorsRef = React.useRef<Set<DndMonitorListener>>(new Set());

  // Active drag state
  const [active, setActive] = React.useState<Active | null>(null);
  const [over, setOver] = React.useState<Over | null>(null);

  // Track previous over state to detect changes
  const previousOverRef = React.useRef<Over | null>(null);

  // Track the starting coordinates for delta calculation
  const startCoordinatesRef = React.useRef<Coordinates | null>(null);

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

      setActive(newActive);
      setOver(null);
      previousOverRef.current = null;

      const event: DragStartEvent = { active: newActive };
      dispatchMonitorEvent('onDragStart', event);
      announce('onDragStart', newActive, null);
    },
    [dispatchMonitorEvent, announce],
  );

  /**
   * Update during drag movement.
   */
  const dragMove = React.useCallback(
    (coordinates: Coordinates) => {
      // Cancel any pending collision detection
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Throttle collision detection to animation frame
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        if (!active) {
          return;
        }

        // Update active rect based on movement
        const draggable = draggablesRef.current.get(active.id);
        if (!draggable) {
          return;
        }

        const currentRect = draggable.node.getBoundingClientRect();
        const updatedActive: Active = {
          ...active,
          rect: currentRect,
        };

        // Run collision detection
        const collidingId = collisionDetection({
          active: updatedActive,
          droppables: droppablesRef.current,
          pointerCoordinates: coordinates,
        });

        // Calculate delta from start position
        const delta: Coordinates = startCoordinatesRef.current
          ? {
              x: coordinates.x - startCoordinatesRef.current.x,
              y: coordinates.y - startCoordinatesRef.current.y,
            }
          : { x: 0, y: 0 };

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

        // Update over state
        setOver(newOver);
        setActive(updatedActive);

        // Dispatch move event
        const moveEvent: DragMoveEvent = {
          active: updatedActive,
          over: newOver,
          delta,
        };
        dispatchMonitorEvent('onDragMove', moveEvent);

        // Check if we entered a new droppable
        const previousOverId = previousOverRef.current?.id;
        const currentOverId = newOver?.id;

        if (currentOverId !== previousOverId && newOver !== null) {
          const overEvent: DragOverEvent = {
            active: updatedActive,
            over: newOver,
          };
          dispatchMonitorEvent('onDragOver', overEvent);
          announce('onDragOver', updatedActive, newOver);
        }

        previousOverRef.current = newOver;
      });
    },
    [active, collisionDetection, dispatchMonitorEvent, announce],
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

    if (!active) {
      return;
    }

    const event: DragEndEvent = {
      active,
      over,
    };

    dispatchMonitorEvent('onDragEnd', event);
    announce('onDragEnd', active, over);

    setActive(null);
    setOver(null);
    previousOverRef.current = null;
    startCoordinatesRef.current = null;
  }, [active, over, dispatchMonitorEvent, announce]);

  /**
   * Cancel a drag operation.
   */
  const dragCancel = React.useCallback(() => {
    // Cancel any pending collision detection
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!active) {
      return;
    }

    const event: DragCancelEvent = { active };

    dispatchMonitorEvent('onDragCancel', event);
    announce('onDragCancel', active, null);

    setActive(null);
    setOver(null);
    previousOverRef.current = null;
    startCoordinatesRef.current = null;
  }, [active, dispatchMonitorEvent, announce]);

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

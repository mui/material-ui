/**
 * Type definitions for the DnD Context system.
 */

/**
 * Unique identifier for draggable and droppable elements.
 */
export type UniqueIdentifier = string | number;

/**
 * 2D coordinates representing a position.
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Information about the currently active (being dragged) element.
 */
export interface Active {
  id: UniqueIdentifier;
  data: Record<string, unknown>;
  rect: DOMRect;
}

/**
 * Information about the current drop target being hovered.
 */
export interface Over {
  id: UniqueIdentifier;
  data: Record<string, unknown>;
  rect: DOMRect;
}

/**
 * Registry entry for a draggable element.
 */
export interface DraggableEntry {
  id: UniqueIdentifier;
  node: HTMLElement;
  data: Record<string, unknown>;
}

/**
 * Registry entry for a droppable element.
 */
export interface DroppableEntry {
  id: UniqueIdentifier;
  node: HTMLElement;
  data: Record<string, unknown>;
}

/**
 * Event fired when a drag operation starts.
 */
export interface DragStartEvent {
  active: Active;
}

/**
 * Event fired during drag movement.
 */
export interface DragMoveEvent {
  active: Active;
  over: Over | null;
  delta: Coordinates;
}

/**
 * Event fired when dragging over a droppable target.
 */
export interface DragOverEvent {
  active: Active;
  over: Over;
}

/**
 * Event fired when a drag operation ends.
 */
export interface DragEndEvent {
  active: Active;
  over: Over | null;
}

/**
 * Event fired when a drag operation is cancelled.
 */
export interface DragCancelEvent {
  active: Active;
}

/**
 * Collision detection function type.
 * Given the active draggable, all droppables, and pointer position,
 * returns the ID of the droppable being hovered (or null).
 */
export type CollisionDetection = (args: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}) => UniqueIdentifier | null;

/**
 * Callbacks for customizing screen reader announcements.
 */
export interface AnnouncementCallbacks {
  onDragStart?: (active: Active) => string;
  onDragOver?: (active: Active, over: Over) => string;
  onDragEnd?: (active: Active, over: Over | null) => string;
  onDragCancel?: (active: Active) => string;
}

/**
 * Accessibility configuration for the DnD context.
 */
export interface DndAccessibility {
  announcements?: AnnouncementCallbacks;
  screenReaderInstructions?: string;
}

/**
 * Props for the DndContext provider component.
 */
export interface DndContextProps {
  children: React.ReactNode;
  /**
   * Custom collision detection algorithm.
   * @default rectIntersection
   */
  collisionDetection?: CollisionDetection;
  /**
   * Accessibility configuration for screen readers.
   */
  accessibility?: DndAccessibility;
}

/**
 * Internal context value exposed to useDraggable/useDroppable hooks.
 */
export interface DndContextValue {
  /** Currently active (dragged) element, or null if not dragging */
  active: Active | null;
  /** Current drop target being hovered, or null */
  over: Over | null;

  // Registry methods (called by useDraggable/useDroppable)
  registerDraggable: (
    id: UniqueIdentifier,
    node: HTMLElement,
    data?: Record<string, unknown>,
  ) => void;
  unregisterDraggable: (id: UniqueIdentifier) => void;
  registerDroppable: (
    id: UniqueIdentifier,
    node: HTMLElement,
    data?: Record<string, unknown>,
  ) => void;
  unregisterDroppable: (id: UniqueIdentifier) => void;

  // Drag lifecycle (called by useDraggable)
  dragStart: (id: UniqueIdentifier) => void;
  dragMove: (coordinates: Coordinates) => void;
  dragEnd: () => void;
  dragCancel: () => void;
}

/**
 * Callbacks for useDndMonitor hook.
 */
export interface DndMonitorCallbacks {
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
}

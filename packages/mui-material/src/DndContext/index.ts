'use client';

// Main component
export { DndContext, default } from './DndContext';

// Types
export type {
  UniqueIdentifier,
  Coordinates,
  Active,
  Over,
  DraggableEntry,
  DroppableEntry,
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
  CollisionDetection,
  AnnouncementCallbacks,
  DndAccessibility,
  DndContextProps,
  DndContextValue,
  DndMonitorCallbacks,
} from './DndContextTypes';

// Hooks
export { useDndContext, useDndContextOptional } from './useDndContext';
export { useDndMonitor } from './useDndMonitor';

// Collision detection algorithms
export { rectIntersection, pointerWithin } from './collision';

// Announcement utilities (for customization)
export { defaultAnnouncements, defaultScreenReaderInstructions } from './announcements';

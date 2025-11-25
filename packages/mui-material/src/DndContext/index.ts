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
export { rectIntersection, pointerWithin, closestCenter, closestCorners } from './collision';

// Transform utilities
export { getTransformStyle, getRelativePosition, applyTransform, CSS_TRANSFORM } from './transform';

// Announcement utilities (for customization)
export { defaultAnnouncements, defaultScreenReaderInstructions } from './announcements';

'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { useDraggable } from '../useDraggable';
import { useDroppable } from '../useDroppable';
import { useDndContext } from '../DndContext/useDndContext';
import { useSortableContextOptional } from '../SortableContext/SortableContext';
import type { UniqueIdentifier, Coordinates, Active } from '../DndContext/DndContextTypes';

/**
 * Options for the useSortable hook.
 */
export interface UseSortableOptions {
  /**
   * Unique identifier for this sortable element.
   */
  id: UniqueIdentifier;
  /**
   * Optional data to attach to the sortable element.
   * This data will be accessible in drag event handlers.
   */
  data?: Record<string, unknown>;
  /**
   * If true, the element will not be sortable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Transition configuration for smooth animations when items reorder.
   */
  transition?: {
    /**
     * Duration of the transition in milliseconds.
     * @default 200
     */
    duration?: number;
    /**
     * CSS easing function for the transition.
     * @default 'ease'
     */
    easing?: string;
  };
}

/**
 * Return value from the useSortable hook.
 */
export interface UseSortableReturn {
  /**
   * ARIA and other attributes to apply to the sortable element.
   * These provide accessibility support and proper touch behavior.
   */
  attributes: {
    role: 'button';
    tabIndex: number;
    'aria-describedby': string;
    'aria-pressed': boolean;
    'aria-disabled': boolean;
    style?: React.CSSProperties;
  };
  /**
   * Event listeners to attach to the sortable element.
   * Spread these onto your element to enable sorting.
   */
  listeners: {
    onPointerDown: (event: React.PointerEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
  } | undefined;
  /**
   * Ref callback to attach to the sortable DOM element.
   * This allows the hook to track the element's position.
   */
  setNodeRef: (node: HTMLElement | null) => void;
  /**
   * Current transform coordinates for the sortable element.
   * Null when not dragging. Use this to position the element during sorting.
   */
  transform: Coordinates | null;
  /**
   * True if this element is currently being dragged.
   */
  isDragging: boolean;
  /**
   * True if the currently dragged item is over this sortable.
   */
  isOver: boolean;
  /**
   * Information about the currently active (being dragged) item.
   * Null if nothing is being dragged.
   */
  active: Active | null;
  /**
   * CSS transition string for smooth reordering animations.
   * Undefined when the element is being dragged (for immediate movement).
   */
  transition: string | undefined;
  /**
   * True when any item in the sortable context is being sorted.
   * Useful for applying styles to the entire list during sorting.
   */
  isSorting: boolean;
}

/**
 * Hook to make an element sortable within a list by combining draggable and droppable functionality.
 *
 * This hook composes useDraggable and useDroppable internally, providing a unified API
 * for sortable lists. It handles smooth transitions between positions and provides
 * state about the sorting operation.
 *
 * @example
 * ```tsx
 * function SortableItem({ id, children }) {
 *   const {
 *     attributes,
 *     listeners,
 *     setNodeRef,
 *     transform,
 *     transition,
 *     isDragging,
 *     isSorting,
 *   } = useSortable({ id });
 *
 *   const style = {
 *     transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
 *     transition,
 *     opacity: isDragging ? 0.5 : 1,
 *     cursor: isSorting ? 'grabbing' : 'grab',
 *   };
 *
 *   return (
 *     <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Vertical sortable list with custom transition
 * function SortableList({ items }) {
 *   return (
 *     <DndContext onDragEnd={handleDragEnd}>
 *       {items.map((item) => (
 *         <SortableItem
 *           key={item.id}
 *           id={item.id}
 *           data={{ type: 'list-item' }}
 *           transition={{ duration: 300, easing: 'ease-in-out' }}
 *         >
 *           {item.content}
 *         </SortableItem>
 *       ))}
 *     </DndContext>
 *   );
 * }
 * ```
 */
export function useSortable(options: UseSortableOptions): UseSortableReturn {
  const { id, data = {}, disabled = false, transition: transitionConfig } = options;

  // Get the active state from DndContext to determine if any item is being sorted
  const { active } = useDndContext();

  // Optionally get SortableContext - may be null if not wrapped in SortableContext
  const sortableContext = useSortableContextOptional();

  // Compose both hooks with the same id
  const draggable = useDraggable({ id, data, disabled });
  const droppable = useDroppable({ id, data, disabled });

  // Track the DOM node for rect registration with SortableContext
  const nodeRef = React.useRef<HTMLElement | null>(null);

  // Merge refs - call both setNodeRef functions when the ref changes
  // Also register rect with SortableContext if available
  const setNodeRef = useEventCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
    draggable.setNodeRef(node);
    droppable.setNodeRef(node);

    // Register/update rect with SortableContext
    if (sortableContext && node) {
      const rect = node.getBoundingClientRect();
      sortableContext.registerItemRect(id, rect);
    }
  });

  // Unregister from SortableContext on unmount
  useEnhancedEffect(() => {
    return () => {
      if (sortableContext) {
        sortableContext.unregisterItemRect(id);
      }
    };
  }, [sortableContext, id]);

  // Calculate transform - use SortableContext for non-dragged items when available
  const transform = React.useMemo((): Coordinates | null => {
    if (draggable.isDragging) {
      // Dragged item uses useDraggable's transform (follows pointer)
      return draggable.transform;
    }
    if (sortableContext) {
      // Non-dragged items get transform from SortableContext (shift to make room)
      return sortableContext.getItemTransform(id);
    }
    // No SortableContext - no transform for non-dragged items
    return null;
  }, [draggable.isDragging, draggable.transform, sortableContext, id]);

  // Calculate transition CSS string
  // Disable transition when this element is being dragged for immediate movement
  const transition = React.useMemo(() => {
    if (draggable.isDragging) {
      // No transition while actively dragging for immediate feedback
      return undefined;
    }
    // Apply transition when not dragging (for smooth reordering of other items)
    const { duration = 200, easing = 'ease' } = transitionConfig ?? {};
    return `transform ${duration}ms ${easing}`;
  }, [draggable.isDragging, transitionConfig]);

  // Derive isSorting from context state - true if any item is being dragged
  // Prefer SortableContext's isSorting if available (more accurate)
  const isSorting = sortableContext?.isSorting ?? active !== null;

  return {
    // From useDraggable
    attributes: draggable.attributes,
    listeners: draggable.listeners,
    isDragging: draggable.isDragging,
    // From useDroppable
    isOver: droppable.isOver,
    active: droppable.active,
    // Combined/computed
    setNodeRef,
    transform,
    transition,
    isSorting,
  };
}

export default useSortable;

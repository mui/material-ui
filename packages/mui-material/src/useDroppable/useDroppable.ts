'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { useDndContext } from '../DndContext/useDndContext';
import type { UniqueIdentifier, Active } from '../DndContext/DndContextTypes';

/**
 * Options for the useDroppable hook.
 */
export interface UseDroppableOptions {
  /**
   * Unique identifier for this droppable element.
   */
  id: UniqueIdentifier;
  /**
   * Optional data to attach to the droppable element.
   * This data will be accessible in drag event handlers.
   */
  data?: Record<string, unknown>;
  /**
   * If true, the element will not act as a drop target.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Return value from the useDroppable hook.
 */
export interface UseDroppableReturn {
  /**
   * Ref callback to attach to the droppable DOM element.
   * This allows the hook to track the element's position for collision detection.
   */
  setNodeRef: (node: HTMLElement | null) => void;
  /**
   * True if the currently dragged item is over this droppable.
   */
  isOver: boolean;
  /**
   * Information about the currently active (being dragged) item.
   * Null if nothing is being dragged.
   */
  active: Active | null;
}

/**
 * Hook to designate an element as a drop target for drag operations.
 *
 * This hook is simpler than useDraggable as it doesn't handle events directly.
 * Collision detection is performed by DndContext, and this hook simply
 * registers the element and provides state about whether a draggable is over it.
 *
 * @example
 * ```tsx
 * function DroppableZone({ id, children }) {
 *   const { setNodeRef, isOver, active } = useDroppable({
 *     id,
 *   });
 *
 *   const style = {
 *     backgroundColor: isOver ? 'lightgreen' : 'white',
 *     border: active ? '2px dashed gray' : '2px solid transparent',
 *   };
 *
 *   return (
 *     <div ref={setNodeRef} style={style}>
 *       {children}
 *       {isOver && <span>Drop here!</span>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom data for filtering drop targets
 * function CategoryDropZone({ category }) {
 *   const { setNodeRef, isOver, active } = useDroppable({
 *     id: `category-${category}`,
 *     data: { category, accepts: ['item', 'card'] },
 *   });
 *
 *   // Only highlight if dragged item type is accepted
 *   const canDrop = active?.data?.type &&
 *     ['item', 'card'].includes(active.data.type as string);
 *
 *   return (
 *     <div
 *       ref={setNodeRef}
 *       style={{
 *         backgroundColor: isOver && canDrop ? 'lightgreen' : 'white'
 *       }}
 *     >
 *       Drop {category} items here
 *     </div>
 *   );
 * }
 * ```
 */
export function useDroppable(options: UseDroppableOptions): UseDroppableReturn {
  const { id, data = {}, disabled = false } = options;

  const { active, over, registerDroppable, unregisterDroppable } = useDndContext();

  const nodeRef = React.useRef<HTMLElement | null>(null);

  // Derive isOver from context state
  const isOver = over?.id === id;

  // Register/unregister with DndContext
  useEnhancedEffect(() => {
    const node = nodeRef.current;
    if (!node || disabled) {
      return undefined;
    }

    registerDroppable(id, node, data);

    return () => {
      unregisterDroppable(id);
    };
  }, [id, data, disabled, registerDroppable, unregisterDroppable]);

  /**
   * Ref callback to track the DOM node
   */
  const setNodeRef = useEventCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  });

  return {
    setNodeRef,
    isOver,
    active,
  };
}

export default useDroppable;

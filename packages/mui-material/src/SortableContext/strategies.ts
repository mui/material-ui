'use client';
import type { UniqueIdentifier, Coordinates } from '../DndContext/DndContextTypes';

/**
 * Sorting strategy type.
 */
export type SortingStrategy = 'vertical' | 'horizontal' | 'grid';

/**
 * Arguments passed to sorting strategy functions.
 */
export interface SortingStrategyArgs {
  /** ID of the item to calculate transform for */
  id: UniqueIdentifier;
  /** ID of the currently dragged item */
  activeId: UniqueIdentifier;
  /** ID of the item being hovered over (drop target) */
  overId: UniqueIdentifier | null;
  /** Ordered array of all item IDs */
  items: UniqueIdentifier[];
  /** Map of item IDs to their bounding rects */
  itemRects: Map<UniqueIdentifier, DOMRect>;
  /** Number of columns (for grid strategy) */
  columns?: number;
}

/**
 * Calculate transform for vertical list sorting.
 *
 * When an item is dragged, other items between its original position
 * and the current hover position shift up or down to make room.
 *
 * @example
 * ```tsx
 * // Items shift vertically when dragging in a list
 * const transform = verticalListSortingStrategy({
 *   id: 'item-2',
 *   activeId: 'item-1',
 *   overId: 'item-3',
 *   items: ['item-1', 'item-2', 'item-3'],
 *   itemRects,
 * });
 * // Returns { x: 0, y: -50 } if item-1 is 50px tall (item-2 shifts up)
 * ```
 */
export function verticalListSortingStrategy(args: SortingStrategyArgs): Coordinates | null {
  const { id, activeId, overId, items, itemRects } = args;

  // No transform needed if not hovering over anything or this is the dragged item
  if (!overId || id === activeId) {
    return null;
  }

  const activeIndex = items.indexOf(activeId);
  const overIndex = items.indexOf(overId);
  const currentIndex = items.indexOf(id);

  // Invalid indices
  if (activeIndex === -1 || overIndex === -1 || currentIndex === -1) {
    return null;
  }

  // Item not in the affected range
  if (activeIndex < overIndex) {
    // Dragging down: items between activeIndex (exclusive) and overIndex (inclusive) shift UP
    if (currentIndex > activeIndex && currentIndex <= overIndex) {
      const activeRect = itemRects.get(activeId);
      const height = activeRect?.height ?? 0;
      return { x: 0, y: -height };
    }
  } else if (activeIndex > overIndex) {
    // Dragging up: items between overIndex (inclusive) and activeIndex (exclusive) shift DOWN
    if (currentIndex >= overIndex && currentIndex < activeIndex) {
      const activeRect = itemRects.get(activeId);
      const height = activeRect?.height ?? 0;
      return { x: 0, y: height };
    }
  }

  return null;
}

/**
 * Calculate transform for horizontal list sorting.
 *
 * When an item is dragged, other items between its original position
 * and the current hover position shift left or right to make room.
 *
 * @example
 * ```tsx
 * // Items shift horizontally when dragging in a row
 * const transform = horizontalListSortingStrategy({
 *   id: 'item-2',
 *   activeId: 'item-1',
 *   overId: 'item-3',
 *   items: ['item-1', 'item-2', 'item-3'],
 *   itemRects,
 * });
 * // Returns { x: -100, y: 0 } if item-1 is 100px wide (item-2 shifts left)
 * ```
 */
export function horizontalListSortingStrategy(args: SortingStrategyArgs): Coordinates | null {
  const { id, activeId, overId, items, itemRects } = args;

  // No transform needed if not hovering over anything or this is the dragged item
  if (!overId || id === activeId) {
    return null;
  }

  const activeIndex = items.indexOf(activeId);
  const overIndex = items.indexOf(overId);
  const currentIndex = items.indexOf(id);

  // Invalid indices
  if (activeIndex === -1 || overIndex === -1 || currentIndex === -1) {
    return null;
  }

  // Item not in the affected range
  if (activeIndex < overIndex) {
    // Dragging right: items between activeIndex (exclusive) and overIndex (inclusive) shift LEFT
    if (currentIndex > activeIndex && currentIndex <= overIndex) {
      const activeRect = itemRects.get(activeId);
      const width = activeRect?.width ?? 0;
      return { x: -width, y: 0 };
    }
  } else if (activeIndex > overIndex) {
    // Dragging left: items between overIndex (inclusive) and activeIndex (exclusive) shift RIGHT
    if (currentIndex >= overIndex && currentIndex < activeIndex) {
      const activeRect = itemRects.get(activeId);
      const width = activeRect?.width ?? 0;
      return { x: width, y: 0 };
    }
  }

  return null;
}

/**
 * Calculate transform for grid sorting.
 *
 * When an item is dragged in a grid, other items shift to fill the gap
 * and make room at the new position. Items may shift both horizontally
 * and vertically depending on their position relative to the drag path.
 *
 * @example
 * ```tsx
 * // 3-column grid: items reflow when dragging
 * const transform = gridSortingStrategy({
 *   id: 'item-4',
 *   activeId: 'item-1',
 *   overId: 'item-5',
 *   items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
 *   itemRects,
 *   columns: 3,
 * });
 * ```
 */
export function gridSortingStrategy(args: SortingStrategyArgs): Coordinates | null {
  const { id, activeId, overId, items, itemRects, columns } = args;

  // No transform needed if not hovering over anything or this is the dragged item
  if (!overId || id === activeId) {
    return null;
  }

  // columns is required for grid strategy
  if (!columns || columns < 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('MUI: gridSortingStrategy requires a valid columns prop');
    }
    return null;
  }

  const activeIndex = items.indexOf(activeId);
  const overIndex = items.indexOf(overId);
  const currentIndex = items.indexOf(id);

  // Invalid indices
  if (activeIndex === -1 || overIndex === -1 || currentIndex === -1) {
    return null;
  }

  // Check if current item is in the affected range
  const minIndex = Math.min(activeIndex, overIndex);
  const maxIndex = Math.max(activeIndex, overIndex);

  if (currentIndex < minIndex || currentIndex > maxIndex || currentIndex === activeIndex) {
    return null;
  }

  const activeRect = itemRects.get(activeId);
  const width = activeRect?.width ?? 0;
  const height = activeRect?.height ?? 0;

  // Calculate current and target grid positions
  const currentRow = Math.floor(currentIndex / columns);
  const currentCol = currentIndex % columns;

  // Determine shift direction based on whether we're filling the gap (item moved away)
  // or making room (item moving towards)
  let newIndex: number;
  if (activeIndex < overIndex) {
    // Dragging forward: items shift backward to fill the gap
    newIndex = currentIndex - 1;
  } else {
    // Dragging backward: items shift forward to make room
    newIndex = currentIndex + 1;
  }

  const newRow = Math.floor(newIndex / columns);
  const newCol = newIndex % columns;

  // Calculate the transform based on position change
  const colDiff = newCol - currentCol;
  const rowDiff = newRow - currentRow;

  return {
    x: colDiff * width,
    y: rowDiff * height,
  };
}

/**
 * Get the appropriate sorting strategy function for a given strategy name.
 */
export function getSortingStrategy(
  strategy: SortingStrategy,
): (args: SortingStrategyArgs) => Coordinates | null {
  switch (strategy) {
    case 'horizontal':
      return horizontalListSortingStrategy;
    case 'grid':
      return gridSortingStrategy;
    case 'vertical':
    default:
      return verticalListSortingStrategy;
  }
}

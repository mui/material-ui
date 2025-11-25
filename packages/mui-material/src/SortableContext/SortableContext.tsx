'use client';
import * as React from 'react';
import { useDndContext } from '../DndContext/useDndContext';
import type { UniqueIdentifier, Coordinates } from '../DndContext/DndContextTypes';
import { getSortingStrategy, type SortingStrategy } from './strategies';

/**
 * Base props shared by all sorting strategies.
 */
export interface SortableContextBaseProps {
  children: React.ReactNode;
  /**
   * Ordered array of item identifiers.
   * The order of this array determines the sort order of items.
   */
  items: UniqueIdentifier[];
}

/**
 * Props for the SortableContext component.
 * Uses a discriminated union to require `columns` only for grid strategy.
 */
export type SortableContextProps = SortableContextBaseProps &
  (
    | {
        /**
         * Sorting strategy for calculating item positions.
         * @default 'vertical'
         */
        strategy?: 'vertical' | 'horizontal';
        columns?: never;
      }
    | {
        /**
         * Grid sorting strategy - requires columns prop.
         */
        strategy: 'grid';
        /**
         * Number of columns in the grid.
         * Required when using 'grid' strategy.
         */
        columns: number;
      }
  );

/**
 * Context value provided to useSortable hooks.
 */
export interface SortableContextValue {
  /** Ordered array of item identifiers */
  items: UniqueIdentifier[];
  /** Current sorting strategy */
  strategy: SortingStrategy;
  /** Number of columns (for grid strategy) */
  columns?: number;
  /**
   * Get the index of an item in the sorted list.
   * @param id - Item identifier
   * @returns Index of the item, or -1 if not found
   */
  getIndex: (id: UniqueIdentifier) => number;
  /**
   * Get calculated transform for an item during active sorting.
   * @param id - Item identifier
   * @returns Transform coordinates or null if no transform needed
   */
  getItemTransform: (id: UniqueIdentifier) => Coordinates | null;
  /**
   * Whether any item is currently being sorted.
   */
  isSorting: boolean;
  /**
   * Get the new index an item would have if dropped at the current position.
   * @param activeId - ID of the dragged item
   * @param overId - ID of the item being hovered over
   * @returns New index for the active item
   */
  getNewIndex: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => number;
  /**
   * Register an item's DOM rect for transform calculations.
   * Called by useSortable when the element ref is set.
   */
  registerItemRect: (id: UniqueIdentifier, rect: DOMRect) => void;
  /**
   * Unregister an item's DOM rect.
   * Called by useSortable on unmount.
   */
  unregisterItemRect: (id: UniqueIdentifier) => void;
}

/**
 * Internal context for SortableContext.
 */
const SortableInternalContext = React.createContext<SortableContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  SortableInternalContext.displayName = 'SortableContext';
}

/**
 * Hook to access the SortableContext.
 * Throws an error if used outside of a SortableContext provider.
 *
 * @returns The SortableContext value
 * @throws Error if not wrapped in SortableContext
 */
export function useSortableContext(): SortableContextValue {
  const context = React.useContext(SortableInternalContext);

  if (context === null) {
    throw new Error(
      'MUI: useSortableContext must be used within a SortableContext provider. ' +
        'Wrap your sortable items with <SortableContext items={[...]}> or use ' +
        'useSortableContextOptional() if the context is optional.',
    );
  }

  return context;
}

/**
 * Hook to optionally access the SortableContext.
 * Returns null if used outside of a SortableContext provider.
 *
 * This is useful for useSortable which can work both with and without
 * a SortableContext wrapper.
 *
 * @returns The SortableContext value or null
 */
export function useSortableContextOptional(): SortableContextValue | null {
  return React.useContext(SortableInternalContext);
}

/**
 * SortableContext provider component.
 *
 * Provides sorting intelligence to child useSortable hooks, including:
 * - Item order tracking
 * - Sorting strategy (vertical, horizontal, grid)
 * - Transform calculations for smooth reordering animations
 *
 * Must be nested inside a DndContext provider.
 *
 * @example
 * ```tsx
 * // Vertical sortable list
 * function SortableList({ items, onReorder }) {
 *   return (
 *     <DndContext onDragEnd={handleDragEnd}>
 *       <SortableContext items={items.map(item => item.id)}>
 *         {items.map(item => (
 *           <SortableItem key={item.id} id={item.id}>
 *             {item.content}
 *           </SortableItem>
 *         ))}
 *       </SortableContext>
 *     </DndContext>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Horizontal sortable row
 * <SortableContext items={itemIds} strategy="horizontal">
 *   {items.map(item => <SortableChip key={item.id} id={item.id} />)}
 * </SortableContext>
 * ```
 *
 * @example
 * ```tsx
 * // Grid layout with 3 columns
 * <SortableContext items={itemIds} strategy="grid" columns={3}>
 *   {items.map(item => <SortableCard key={item.id} id={item.id} />)}
 * </SortableContext>
 * ```
 */
export function SortableContext(props: SortableContextProps): React.JSX.Element {
  const { children, items, strategy = 'vertical', columns } = props as SortableContextProps & {
    columns?: number;
  };

  // Get drag state from DndContext
  const { active, over } = useDndContext();

  // Track item rects for transform calculations
  const itemRectsRef = React.useRef<Map<UniqueIdentifier, DOMRect>>(new Map());

  // Derive sorting state
  const isSorting = active !== null;
  const activeId = active?.id ?? null;
  const overId = over?.id ?? null;

  /**
   * Get the index of an item in the items array.
   */
  const getIndex = React.useCallback(
    (id: UniqueIdentifier): number => {
      return items.indexOf(id);
    },
    [items],
  );

  /**
   * Get the new index an item would have if dropped at the current position.
   */
  const getNewIndex = React.useCallback(
    (draggedId: UniqueIdentifier, targetId: UniqueIdentifier): number => {
      const activeIndex = items.indexOf(draggedId);
      const overIndex = items.indexOf(targetId);

      if (activeIndex === -1 || overIndex === -1) {
        return activeIndex;
      }

      return overIndex;
    },
    [items],
  );

  /**
   * Register an item's DOM rect.
   */
  const registerItemRect = React.useCallback((id: UniqueIdentifier, rect: DOMRect) => {
    itemRectsRef.current.set(id, rect);
  }, []);

  /**
   * Unregister an item's DOM rect.
   */
  const unregisterItemRect = React.useCallback((id: UniqueIdentifier) => {
    itemRectsRef.current.delete(id);
  }, []);

  /**
   * Get the transform for an item during sorting.
   */
  const getItemTransform = React.useCallback(
    (id: UniqueIdentifier): Coordinates | null => {
      // No transform if not sorting or no hover target
      if (!isSorting || activeId === null || overId === null) {
        return null;
      }

      // Don't transform the actively dragged item (it follows the pointer)
      if (id === activeId) {
        return null;
      }

      // Get the sorting strategy function
      const strategyFn = getSortingStrategy(strategy);

      return strategyFn({
        id,
        activeId,
        overId,
        items,
        itemRects: itemRectsRef.current,
        columns,
      });
    },
    [isSorting, activeId, overId, items, strategy, columns],
  );

  // Memoize the context value
  const contextValue = React.useMemo<SortableContextValue>(
    () => ({
      items,
      strategy,
      columns,
      getIndex,
      getItemTransform,
      isSorting,
      getNewIndex,
      registerItemRect,
      unregisterItemRect,
    }),
    [
      items,
      strategy,
      columns,
      getIndex,
      getItemTransform,
      isSorting,
      getNewIndex,
      registerItemRect,
      unregisterItemRect,
    ],
  );

  return (
    <SortableInternalContext.Provider value={contextValue}>
      {children}
    </SortableInternalContext.Provider>
  );
}

export default SortableContext;

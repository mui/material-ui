import { expect } from 'chai';
import {
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  gridSortingStrategy,
  getSortingStrategy,
  type SortingStrategyArgs,
} from './strategies';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';

describe('sorting strategies', () => {
  /**
   * Helper function to create a mock DOMRect
   */
  const mockRect = (
    left: number,
    top: number,
    width: number,
    height: number,
  ): DOMRect => ({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => {},
  }) as DOMRect;

  /**
   * Helper to create item rects map
   */
  const createItemRects = (
    rects: Array<{ id: UniqueIdentifier; rect: DOMRect }>,
  ): Map<UniqueIdentifier, DOMRect> => {
    const map = new Map<UniqueIdentifier, DOMRect>();
    rects.forEach(({ id, rect }) => {
      map.set(id, rect);
    });
    return map;
  };

  describe('verticalListSortingStrategy', () => {
    it('returns null when overId is null', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: null,
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is the activeId (dragged item)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-1',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when activeId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-999',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when overId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-999',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-999',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('shifts item up when dragging down (activeIndex < overIndex)', () => {
      // Dragging item-1 down to item-3 position
      // item-2 should shift UP to fill the gap
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.deep.equal({ x: 0, y: -50 });
    });

    it('shifts item down when dragging up (activeIndex > overIndex)', () => {
      // Dragging item-3 up to item-1 position
      // item-2 should shift DOWN to make room
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-3',
        overId: 'item-1',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.deep.equal({ x: 0, y: 50 });
    });

    it('returns null for items outside the affected range when dragging down', () => {
      // Dragging item-1 to item-2, item-3 not affected
      const args: SortingStrategyArgs = {
        id: 'item-3',
        activeId: 'item-1',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null for items outside the affected range when dragging up', () => {
      // Dragging item-3 to item-2, item-1 not affected
      const args: SortingStrategyArgs = {
        id: 'item-1',
        activeId: 'item-3',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('handles dragging to the same position (no movement)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-1',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('handles variable item heights', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 75) }, // Taller item
          { id: 'item-2', rect: mockRect(0, 75, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 125, 100, 50) },
        ]),
      };

      const result = verticalListSortingStrategy(args);
      // Should shift by the height of the active item (75px)
      expect(result).to.deep.equal({ x: 0, y: -75 });
    });

    it('handles missing rect gracefully (uses 0 for height)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
          // item-1 rect is missing
        ]),
      };

      const result = verticalListSortingStrategy(args);
      // When rect is missing, height defaults to 0, resulting in { x: 0, y: -0 }
      // In JavaScript, -0 === 0, but they differ in deep equality checks
      expect(result).to.not.equal(null);
      expect(result!.x).to.equal(0);
      expect(Math.abs(result!.y)).to.equal(0);
    });
  });

  describe('horizontalListSortingStrategy', () => {
    it('returns null when overId is null', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: null,
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is the activeId (dragged item)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-1',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when activeId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-999',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when overId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-999',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-999',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('shifts item left when dragging right (activeIndex < overIndex)', () => {
      // Dragging item-1 right to item-3 position
      // item-2 should shift LEFT to fill the gap
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.deep.equal({ x: -50, y: 0 });
    });

    it('shifts item right when dragging left (activeIndex > overIndex)', () => {
      // Dragging item-3 left to item-1 position
      // item-2 should shift RIGHT to make room
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-3',
        overId: 'item-1',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.deep.equal({ x: 50, y: 0 });
    });

    it('returns null for items outside the affected range when dragging right', () => {
      // Dragging item-1 to item-2, item-3 not affected
      const args: SortingStrategyArgs = {
        id: 'item-3',
        activeId: 'item-1',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null for items outside the affected range when dragging left', () => {
      // Dragging item-3 to item-2, item-1 not affected
      const args: SortingStrategyArgs = {
        id: 'item-1',
        activeId: 'item-3',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('handles dragging to the same position (no movement)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-1',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 100) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('handles variable item widths', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 75, 100) }, // Wider item
          { id: 'item-2', rect: mockRect(75, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(125, 0, 50, 100) },
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      // Should shift by the width of the active item (75px)
      expect(result).to.deep.equal({ x: -75, y: 0 });
    });

    it('handles missing rect gracefully (uses 0 for width)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-2', rect: mockRect(50, 0, 50, 100) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 100) },
          // item-1 rect is missing
        ]),
      };

      const result = horizontalListSortingStrategy(args);
      // When rect is missing, width defaults to 0, resulting in { x: -0, y: 0 }
      // In JavaScript, -0 === 0, but they differ in deep equality checks
      expect(result).to.not.equal(null);
      expect(Math.abs(result!.x)).to.equal(0);
      expect(result!.y).to.equal(0);
    });
  });

  describe('gridSortingStrategy', () => {
    it('returns null when overId is null', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: null,
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is the activeId (dragged item)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-1',
        activeId: 'item-1',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when columns is not provided', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        // columns is undefined
      };

      let result: ReturnType<typeof gridSortingStrategy>;
      expect(() => {
        result = gridSortingStrategy(args);
      }).toWarnDev('MUI: gridSortingStrategy requires a valid columns prop');

      expect(result!).to.equal(null);
    });

    it('returns null when columns is less than 1', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 0,
      };

      let result: ReturnType<typeof gridSortingStrategy>;
      expect(() => {
        result = gridSortingStrategy(args);
      }).toWarnDev('MUI: gridSortingStrategy requires a valid columns prop');

      expect(result!).to.equal(null);
    });

    it('returns null when activeId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-999',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when overId is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-999',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when id is not in items array', () => {
      const args: SortingStrategyArgs = {
        id: 'item-999',
        activeId: 'item-1',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('returns null when item is outside affected range', () => {
      // Dragging item-2 to item-3, item-5 is not in the affected range
      const args: SortingStrategyArgs = {
        id: 'item-5',
        activeId: 'item-2',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      expect(result).to.equal(null);
    });

    it('shifts items backward when dragging forward (same row)', () => {
      // 3-column grid: [1, 2, 3] [4, 5, 6]
      // Dragging item-1 to item-2 position
      // item-2 should shift left (backward)
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      // item-2 shifts from position 1 (index 1) to position 0 (index 0)
      // Same row, one column left
      expect(result).to.deep.equal({ x: -50, y: 0 });
    });

    it('shifts items forward when dragging backward (same row)', () => {
      // Dragging item-3 to item-1 position
      // item-2 should shift right (forward)
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-3',
        overId: 'item-1',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      // item-2 shifts from position 1 (index 1) to position 2 (index 2)
      // Same row, one column right
      expect(result).to.deep.equal({ x: 50, y: 0 });
    });

    it('shifts items with row wrap when dragging forward across rows', () => {
      // Dragging item-1 to item-5 position
      // item-4 should shift backward from row 1, col 0 to row 0, col 2
      const args: SortingStrategyArgs = {
        id: 'item-4',
        activeId: 'item-1',
        overId: 'item-5',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      // item-4 at index 3 -> new index 2 (shifted backward)
      // From row 1, col 0 to row 0, col 2
      // Column diff: 2 - 0 = 2, Row diff: 0 - 1 = -1
      expect(result).to.deep.equal({ x: 100, y: -50 });
    });

    it('shifts items with row wrap when dragging backward across rows', () => {
      // Dragging item-6 to item-2 position
      // item-3 should shift forward from row 0, col 2 to row 1, col 0
      const args: SortingStrategyArgs = {
        id: 'item-3',
        activeId: 'item-6',
        overId: 'item-2',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      // item-3 at index 2 -> new index 3 (shifted forward)
      // From row 0, col 2 to row 1, col 0
      // Column diff: 0 - 2 = -2, Row diff: 1 - 0 = 1
      expect(result).to.deep.equal({ x: -100, y: 50 });
    });

    it('handles 2-column grid', () => {
      // 2-column grid: [1, 2] [3, 4] [5, 6]
      // Dragging item-1 to item-4 position
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-4',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 50, 50) },
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-4', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(0, 100, 50, 50) },
          { id: 'item-6', rect: mockRect(50, 100, 50, 50) },
        ]),
        columns: 2,
      };

      const result = gridSortingStrategy(args);
      // item-2 at index 1 -> new index 0 (shifted backward)
      // From row 0, col 1 to row 0, col 0
      expect(result).to.deep.equal({ x: -50, y: 0 });
    });

    it('handles 1-column grid (vertical list)', () => {
      // 1-column grid: [1] [2] [3]
      // Dragging item-1 to item-3 position
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3'],
        itemRects: createItemRects([
          { id: 'item-1', rect: mockRect(0, 0, 100, 50) },
          { id: 'item-2', rect: mockRect(0, 50, 100, 50) },
          { id: 'item-3', rect: mockRect(0, 100, 100, 50) },
        ]),
        columns: 1,
      };

      const result = gridSortingStrategy(args);
      // item-2 at index 1 -> new index 0 (shifted backward)
      // From row 1, col 0 to row 0, col 0
      expect(result).to.deep.equal({ x: 0, y: -50 });
    });

    it('handles missing rect gracefully (uses 0 for dimensions)', () => {
      const args: SortingStrategyArgs = {
        id: 'item-2',
        activeId: 'item-1',
        overId: 'item-3',
        items: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
        itemRects: createItemRects([
          { id: 'item-2', rect: mockRect(50, 0, 50, 50) },
          { id: 'item-3', rect: mockRect(100, 0, 50, 50) },
          { id: 'item-4', rect: mockRect(0, 50, 50, 50) },
          { id: 'item-5', rect: mockRect(50, 50, 50, 50) },
          { id: 'item-6', rect: mockRect(100, 50, 50, 50) },
          // item-1 rect is missing
        ]),
        columns: 3,
      };

      const result = gridSortingStrategy(args);
      // item-2 at index 1 -> new index 0 (shifted backward)
      // Width and height default to 0, resulting in -0
      // In JavaScript, -0 === 0, but they differ in deep equality checks
      expect(result).to.not.equal(null);
      expect(Math.abs(result!.x)).to.equal(0);
      expect(result!.y).to.equal(0);
    });

    it('handles large grid', () => {
      // 4-column grid
      const items = Array.from({ length: 16 }, (_, i) => `item-${i + 1}`);
      const rects = items.map((id, i) => ({
        id,
        rect: mockRect((i % 4) * 50, Math.floor(i / 4) * 50, 50, 50),
      }));

      const args: SortingStrategyArgs = {
        id: 'item-6',
        activeId: 'item-1',
        overId: 'item-10',
        items,
        itemRects: createItemRects(rects),
        columns: 4,
      };

      const result = gridSortingStrategy(args);
      // item-6 at index 5 -> new index 4 (shifted backward)
      // From row 1, col 1 to row 1, col 0
      expect(result).to.deep.equal({ x: -50, y: 0 });
    });
  });

  describe('getSortingStrategy', () => {
    it('returns verticalListSortingStrategy for "vertical"', () => {
      const strategy = getSortingStrategy('vertical');
      expect(strategy).to.equal(verticalListSortingStrategy);
    });

    it('returns horizontalListSortingStrategy for "horizontal"', () => {
      const strategy = getSortingStrategy('horizontal');
      expect(strategy).to.equal(horizontalListSortingStrategy);
    });

    it('returns gridSortingStrategy for "grid"', () => {
      const strategy = getSortingStrategy('grid');
      expect(strategy).to.equal(gridSortingStrategy);
    });

    it('defaults to verticalListSortingStrategy for unknown strategy', () => {
      // @ts-expect-error Testing invalid strategy
      const strategy = getSortingStrategy('unknown');
      expect(strategy).to.equal(verticalListSortingStrategy);
    });
  });
});

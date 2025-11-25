import { expect } from 'chai';
import { rectIntersection, pointerWithin, closestCenter, closestCorners } from './collision';
import type { Active, DroppableEntry, Coordinates, UniqueIdentifier } from './DndContextTypes';

describe('collision detection', () => {
  /**
   * Helper function to create a mock DOMRect
   */
  const mockRect = (left: number, top: number, width: number, height: number): DOMRect => {
    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
      x: left,
      y: top,
      toJSON: () => {},
    } as DOMRect;
  };

  /**
   * Helper function to create a mock active draggable
   */
  const mockActive = (rect: DOMRect, id: UniqueIdentifier = 'active-1'): Active => {
    return {
      id,
      data: {},
      rect,
    };
  };

  /**
   * Helper function to create a mock droppable entry
   */
  const mockDroppable = (
    id: UniqueIdentifier,
    rect: DOMRect,
    data: Record<string, unknown> = {},
  ): DroppableEntry => {
    return {
      id,
      node: {
        getBoundingClientRect: () => rect,
      } as HTMLElement,
      data,
    };
  };

  /**
   * Helper function to create a droppables map
   */
  const createDroppablesMap = (
    entries: Array<{ id: UniqueIdentifier; rect: DOMRect; data?: Record<string, unknown> }>,
  ): Map<UniqueIdentifier, DroppableEntry> => {
    const map = new Map<UniqueIdentifier, DroppableEntry>();
    entries.forEach(({ id, rect, data = {} }) => {
      map.set(id, mockDroppable(id, rect, data));
    });
    return map;
  };

  describe('rectIntersection', () => {
    it('returns null when no intersection', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 100, 100) },
        { id: 'drop-2', rect: mockRect(300, 300, 100, 100) },
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal(null);
    });

    it('returns id of droppable with largest intersection area', () => {
      const active = mockActive(mockRect(0, 0, 100, 100));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(50, 50, 100, 100) }, // Small overlap
        { id: 'drop-2', rect: mockRect(25, 25, 200, 200) }, // Large overlap
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      expect(result).to.equal('drop-2');
    });

    it('handles edge-touching rects (no intersection)', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(50, 0, 50, 50) }, // Right edge touching
        { id: 'drop-2', rect: mockRect(0, 50, 50, 50) }, // Bottom edge touching
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal(null);
    });

    it('handles fully contained rect', () => {
      const active = mockActive(mockRect(50, 50, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(0, 0, 200, 200) }, // Fully contains active
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 75, y: 75 },
      });

      expect(result).to.equal('drop-1');
    });

    it('returns null for empty droppables map', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = new Map<UniqueIdentifier, DroppableEntry>();

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal(null);
    });

    it('handles multiple droppables with same intersection area', () => {
      const active = mockActive(mockRect(0, 0, 100, 100));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(50, 0, 100, 100) }, // 50x100 overlap
        { id: 'drop-2', rect: mockRect(0, 50, 100, 100) }, // 100x50 overlap (same area)
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      // Should return one of them (first one encountered wins)
      expect(['drop-1', 'drop-2']).to.include(result);
    });

    it('handles partial overlap correctly', () => {
      const active = mockActive(mockRect(0, 0, 100, 100));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(75, 75, 100, 100) }, // 25x25 overlap
      ]);

      const result = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      expect(result).to.equal('drop-1');
    });
  });

  describe('pointerWithin', () => {
    it('returns id when pointer is inside droppable', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 100, 100) },
      ]);

      const result = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 150, y: 150 },
      });

      expect(result).to.equal('drop-1');
    });

    it('returns null when pointer is outside all droppables', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 100, 100) },
        { id: 'drop-2', rect: mockRect(300, 300, 100, 100) },
      ]);

      const result = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      expect(result).to.equal(null);
    });

    it('prioritizes later DOM elements (reverse iteration)', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(0, 0, 200, 200) },
        { id: 'drop-2', rect: mockRect(0, 0, 200, 200) }, // Same position, later in DOM
      ]);

      const result = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 100, y: 100 },
      });

      // Should return the later element (drop-2)
      expect(result).to.equal('drop-2');
    });

    it('handles pointer exactly on border', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 100, 100) },
      ]);

      // Test all four edges
      const resultLeft = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 100, y: 150 },
      });
      expect(resultLeft).to.equal('drop-1');

      const resultRight = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 200, y: 150 },
      });
      expect(resultRight).to.equal('drop-1');

      const resultTop = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 150, y: 100 },
      });
      expect(resultTop).to.equal('drop-1');

      const resultBottom = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 150, y: 200 },
      });
      expect(resultBottom).to.equal('drop-1');
    });

    it('returns null for empty droppables map', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = new Map<UniqueIdentifier, DroppableEntry>();

      const result = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 100, y: 100 },
      });

      expect(result).to.equal(null);
    });

    it('handles nested droppables (overlapping)', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-outer', rect: mockRect(0, 0, 300, 300) },
        { id: 'drop-inner', rect: mockRect(100, 100, 100, 100) },
      ]);

      // Pointer inside inner droppable
      const result = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 150, y: 150 },
      });

      // Should return the later element (drop-inner)
      expect(result).to.equal('drop-inner');
    });
  });

  describe('closestCenter', () => {
    it('returns id of droppable with closest center', () => {
      const active = mockActive(mockRect(0, 0, 50, 50)); // Center at (25, 25)
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 50, 50) }, // Center at (125, 125)
        { id: 'drop-2', rect: mockRect(30, 30, 50, 50) }, // Center at (55, 55) - closer
      ]);

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal('drop-2');
    });

    it('handles equidistant centers', () => {
      const active = mockActive(mockRect(0, 0, 50, 50)); // Center at (25, 25)
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 0, 50, 50) }, // Center at (125, 25)
        { id: 'drop-2', rect: mockRect(0, 100, 50, 50) }, // Center at (25, 125)
      ]);

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      // Both are equidistant, first one wins
      expect(result).to.equal('drop-1');
    });

    it('returns null for empty droppables map', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = new Map<UniqueIdentifier, DroppableEntry>();

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal(null);
    });

    it('calculates distance correctly for different sizes', () => {
      const active = mockActive(mockRect(0, 0, 100, 100)); // Center at (50, 50)
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(200, 200, 20, 20) }, // Center at (210, 210)
        { id: 'drop-2', rect: mockRect(300, 300, 200, 200) }, // Center at (400, 400)
      ]);

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      expect(result).to.equal('drop-1');
    });

    it('works with single droppable', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([{ id: 'drop-1', rect: mockRect(100, 100, 50, 50) }]);

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal('drop-1');
    });

    it('handles negative coordinates', () => {
      const active = mockActive(mockRect(-50, -50, 50, 50)); // Center at (-25, -25)
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(0, 0, 50, 50) }, // Center at (25, 25), distance = sqrt(50^2+50^2) ≈ 70.71
        { id: 'drop-2', rect: mockRect(-100, -100, 50, 50) }, // Center at (-75, -75), distance = sqrt(50^2+50^2) ≈ 70.71
      ]);

      const result = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: -25, y: -25 },
      });

      // Both are equidistant (~70.71), algorithm returns first found (drop-1)
      expect(result).to.equal('drop-1');
    });
  });

  describe('closestCorners', () => {
    it('returns id of droppable with smallest aggregate corner distance', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(100, 100, 50, 50) }, // Far away
        { id: 'drop-2', rect: mockRect(40, 40, 50, 50) }, // Closer
      ]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal('drop-2');
    });

    it('handles various rect arrangements', () => {
      const active = mockActive(mockRect(0, 0, 100, 100));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(150, 150, 100, 100) },
        { id: 'drop-2', rect: mockRect(50, 50, 100, 100) }, // Overlapping
        { id: 'drop-3', rect: mockRect(300, 300, 100, 100) },
      ]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      // drop-2 is overlapping and should have smallest aggregate distance
      expect(result).to.equal('drop-2');
    });

    it('returns null for empty droppables map', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = new Map<UniqueIdentifier, DroppableEntry>();

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal(null);
    });

    it('works with single droppable', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([{ id: 'drop-1', rect: mockRect(100, 100, 50, 50) }]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal('drop-1');
    });

    it('handles droppables of different sizes', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(60, 60, 200, 200) }, // Large, slightly offset
        { id: 'drop-2', rect: mockRect(55, 55, 10, 10) }, // Small, close
      ]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      expect(result).to.equal('drop-2');
    });

    it('handles perfect overlap', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(0, 0, 50, 50) }, // Perfect overlap
        { id: 'drop-2', rect: mockRect(100, 100, 50, 50) },
      ]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });

      // Perfect overlap means aggregate distance = 0
      expect(result).to.equal('drop-1');
    });

    it('calculates aggregate distance correctly', () => {
      // Active rect with corners at (0,0), (100,0), (0,100), (100,100)
      const active = mockActive(mockRect(0, 0, 100, 100));

      // Droppable 1: corners at (50,50), (150,50), (50,150), (150,150)
      // Minimum corner distances:
      // - (0,0) to closest corner: sqrt(50^2 + 50^2) ≈ 70.71
      // - (100,0) to closest corner: sqrt(50^2 + 50^2) ≈ 70.71
      // - (0,100) to closest corner: sqrt(50^2 + 50^2) ≈ 70.71
      // - (100,100) to closest corner: sqrt(50^2 + 50^2) ≈ 70.71
      // Total ≈ 282.84
      const droppables = createDroppablesMap([{ id: 'drop-1', rect: mockRect(50, 50, 100, 100) }]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 50, y: 50 },
      });

      expect(result).to.equal('drop-1');
    });

    it('handles negative coordinates', () => {
      // Active corners: (-50,-50), (0,-50), (-50,0), (0,0)
      const active = mockActive(mockRect(-50, -50, 50, 50));
      const droppables = createDroppablesMap([
        // drop-1 corners: (0,0), (50,0), (0,50), (50,50) - shares corner with active at (0,0)
        { id: 'drop-1', rect: mockRect(0, 0, 50, 50) },
        // drop-2 corners: (-100,-100), (-50,-100), (-100,-50), (-50,-50) - shares corner with active at (-50,-50)
        { id: 'drop-2', rect: mockRect(-100, -100, 50, 50) },
      ]);

      const result = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: -25, y: -25 },
      });

      // Both share a corner with active (aggregate distance ~0 for that corner)
      // Algorithm returns first found with min distance (drop-1)
      expect(result).to.equal('drop-1');
    });
  });

  describe('edge cases across all algorithms', () => {
    it('all algorithms handle zero-sized droppables', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([{ id: 'drop-1', rect: mockRect(100, 100, 0, 0) }]);

      // rectIntersection: no intersection with zero-sized rect
      const result1 = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result1).to.equal(null);

      // pointerWithin: pointer exactly at (100,100), rect bounds are [100,100] to [100,100]
      // The check x >= left && x <= right && y >= top && y <= bottom is true
      const result2 = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 100, y: 100 },
      });
      expect(result2).to.equal('drop-1');

      // closestCenter: still finds closest center (point at 100,100)
      const result3 = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result3).to.equal('drop-1');

      // closestCorners: still finds closest corners (all at 100,100)
      const result4 = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result4).to.equal('drop-1');
    });

    it('all algorithms handle very large coordinates', () => {
      const active = mockActive(mockRect(10000, 10000, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(10025, 10025, 100, 100) },
      ]);

      const result1 = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 10025, y: 10025 },
      });
      expect(result1).to.equal('drop-1');

      const result2 = pointerWithin({
        active,
        droppables,
        pointerCoordinates: { x: 10075, y: 10075 },
      });
      expect(result2).to.equal('drop-1');

      const result3 = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 10025, y: 10025 },
      });
      expect(result3).to.equal('drop-1');

      const result4 = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 10025, y: 10025 },
      });
      expect(result4).to.equal('drop-1');
    });

    it('all algorithms handle multiple droppables correctly', () => {
      const active = mockActive(mockRect(0, 0, 50, 50));
      const droppables = createDroppablesMap([
        { id: 'drop-1', rect: mockRect(25, 25, 100, 100) },
        { id: 'drop-2', rect: mockRect(200, 200, 100, 100) },
        { id: 'drop-3', rect: mockRect(400, 400, 100, 100) },
      ]);

      // All should select drop-1 as it's closest
      const result1 = rectIntersection({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result1).to.equal('drop-1');

      const result3 = closestCenter({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result3).to.equal('drop-1');

      const result4 = closestCorners({
        active,
        droppables,
        pointerCoordinates: { x: 25, y: 25 },
      });
      expect(result4).to.equal('drop-1');
    });
  });
});

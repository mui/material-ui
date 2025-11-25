import type { Active, Coordinates, DroppableEntry, UniqueIdentifier } from './DndContextTypes';

/**
 * Check if two rectangles intersect.
 */
function rectsIntersect(rect1: DOMRect, rect2: DOMRect): boolean {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

/**
 * Calculate the area of intersection between two rectangles.
 */
function getIntersectionArea(rect1: DOMRect, rect2: DOMRect): number {
  const left = Math.max(rect1.left, rect2.left);
  const right = Math.min(rect1.right, rect2.right);
  const top = Math.max(rect1.top, rect2.top);
  const bottom = Math.min(rect1.bottom, rect2.bottom);

  const width = right - left;
  const height = bottom - top;

  if (width <= 0 || height <= 0) {
    return 0;
  }

  return width * height;
}

/**
 * Default collision detection algorithm using rectangle intersection.
 *
 * Returns the ID of the droppable with the largest intersection area
 * with the active draggable, or null if no intersection.
 */
export function rectIntersection({
  active,
  droppables,
}: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}): UniqueIdentifier | null {
  const activeRect = active.rect;

  let maxArea = 0;
  let result: UniqueIdentifier | null = null;

  droppables.forEach((droppable, id) => {
    const droppableRect = droppable.node.getBoundingClientRect();

    if (rectsIntersect(activeRect, droppableRect)) {
      const area = getIntersectionArea(activeRect, droppableRect);

      if (area > maxArea) {
        maxArea = area;
        result = id;
      }
    }
  });

  return result;
}

/**
 * Pointer-based collision detection.
 *
 * Returns the ID of the droppable that contains the pointer coordinates,
 * or null if the pointer is not over any droppable.
 */
export function pointerWithin({
  droppables,
  pointerCoordinates,
}: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}): UniqueIdentifier | null {
  const { x, y } = pointerCoordinates;

  // Iterate in reverse to prioritize elements rendered on top (later in DOM)
  const entries = Array.from(droppables.entries()).reverse();

  for (const [id, droppable] of entries) {
    const rect = droppable.node.getBoundingClientRect();

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return id;
    }
  }

  return null;
}

/**
 * Center-based collision detection using Euclidean distance.
 *
 * Returns the ID of the droppable whose center is closest to the active
 * draggable's center, or null if no droppables are available.
 */
export function closestCenter({
  active,
  droppables,
}: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}): UniqueIdentifier | null {
  const activeRect = active.rect;

  // Calculate center of active draggable
  const activeCenter = {
    x: activeRect.left + activeRect.width / 2,
    y: activeRect.top + activeRect.height / 2,
  };

  let minDistance = Infinity;
  let result: UniqueIdentifier | null = null;

  droppables.forEach((droppable, id) => {
    const rect = droppable.node.getBoundingClientRect();

    // Calculate center of droppable
    const droppableCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Calculate Euclidean distance between centers
    const distance = Math.sqrt(
      Math.pow(activeCenter.x - droppableCenter.x, 2) +
        Math.pow(activeCenter.y - droppableCenter.y, 2),
    );

    if (distance < minDistance) {
      minDistance = distance;
      result = id;
    }
  });

  return result;
}

/**
 * Corner-based collision detection.
 *
 * Calculates the minimum distance from each corner of the active draggable
 * to all corners of each droppable, then sums these minimum distances.
 * Returns the ID of the droppable with the smallest aggregate distance.
 */
export function closestCorners({
  active,
  droppables,
}: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}): UniqueIdentifier | null {
  const activeRect = active.rect;

  // Get all 4 corners of the active draggable
  const activeCorners = [
    { x: activeRect.left, y: activeRect.top }, // Top-left
    { x: activeRect.right, y: activeRect.top }, // Top-right
    { x: activeRect.left, y: activeRect.bottom }, // Bottom-left
    { x: activeRect.right, y: activeRect.bottom }, // Bottom-right
  ];

  let minAggregateDistance = Infinity;
  let result: UniqueIdentifier | null = null;

  droppables.forEach((droppable, id) => {
    const rect = droppable.node.getBoundingClientRect();

    // Get all 4 corners of the droppable
    const droppableCorners = [
      { x: rect.left, y: rect.top }, // Top-left
      { x: rect.right, y: rect.top }, // Top-right
      { x: rect.left, y: rect.bottom }, // Bottom-left
      { x: rect.right, y: rect.bottom }, // Bottom-right
    ];

    // For each active corner, find the minimum distance to any droppable corner
    let aggregateDistance = 0;
    for (const activeCorner of activeCorners) {
      let minCornerDistance = Infinity;

      for (const droppableCorner of droppableCorners) {
        const distance = Math.sqrt(
          Math.pow(activeCorner.x - droppableCorner.x, 2) +
            Math.pow(activeCorner.y - droppableCorner.y, 2),
        );

        if (distance < minCornerDistance) {
          minCornerDistance = distance;
        }
      }

      aggregateDistance += minCornerDistance;
    }

    if (aggregateDistance < minAggregateDistance) {
      minAggregateDistance = aggregateDistance;
      result = id;
    }
  });

  return result;
}

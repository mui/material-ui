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

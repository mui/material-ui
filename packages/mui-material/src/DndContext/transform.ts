import type { Coordinates } from './DndContextTypes';

/**
 * CSS transform property name constant.
 * Using translate3d for hardware acceleration.
 */
export const CSS_TRANSFORM = 'transform';

/**
 * Get CSS transform string from coordinates.
 *
 * Uses translate3d for hardware acceleration and better performance
 * during drag operations.
 *
 * @param x - X-axis offset in pixels
 * @param y - Y-axis offset in pixels
 * @returns CSS transform string for use with the transform property
 *
 * @example
 * ```tsx
 * const style = {
 *   transform: getTransformStyle(10, 20),
 * };
 * ```
 */
export function getTransformStyle(x: number, y: number): string {
  return `translate3d(${x}px, ${y}px, 0)`;
}

/**
 * Calculate the position of an element relative to a container.
 *
 * @param element - The element whose position to calculate
 * @param container - The container element to calculate position relative to
 * @returns Coordinates representing the element's position relative to the container
 *
 * @example
 * ```tsx
 * const relativePos = getRelativePosition(draggableElement, dropZoneElement);
 * console.log(`Element is at ${relativePos.x}, ${relativePos.y}`);
 * ```
 */
export function getRelativePosition(
  element: HTMLElement,
  container: HTMLElement,
): Coordinates {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    x: elementRect.left - containerRect.left,
    y: elementRect.top - containerRect.top,
  };
}

/**
 * Apply a transform to an element.
 *
 * Directly modifies the element's style to apply the transform.
 * Useful for implementing drag overlays or custom drag visualizations.
 *
 * @param element - The element to transform
 * @param transform - The coordinates to translate to
 *
 * @example
 * ```tsx
 * applyTransform(dragOverlay, { x: 100, y: 50 });
 * ```
 */
export function applyTransform(element: HTMLElement, transform: Coordinates): void {
  element.style.transform = getTransformStyle(transform.x, transform.y);
}

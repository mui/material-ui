'use client';
import * as React from 'react';

/**
 * Clamps an index value within the specified bounds.
 * @param index - The index to clamp
 * @param min - Minimum allowed value (inclusive)
 * @param max - Maximum allowed value (inclusive)
 * @returns The clamped index
 */
export function clampIndex(index: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, index));
}

/**
 * Wraps an index for loop mode, handling overflow in both directions.
 * @param index - The index to wrap
 * @param count - Total number of items
 * @returns The wrapped index (0 to count-1)
 */
export function wrapIndex(index: number, count: number): number {
  if (count <= 0) {
    return 0;
  }
  return ((index % count) + count) % count;
}

/**
 * Normalizes spacing prop to a CSS value.
 * @param spacing - Spacing as number (pixels) or string (CSS value)
 * @returns CSS-compatible spacing string
 */
export function normalizeSpacing(spacing: number | string | undefined): string {
  if (spacing === undefined || spacing === 0) {
    return '0px';
  }
  if (typeof spacing === 'number') {
    return `${spacing}px`;
  }
  return spacing;
}

/**
 * Filters and returns only valid React children that can be rendered as slides.
 * @param children - React children to filter
 * @returns Array of valid React elements
 */
export function getValidChildren(children: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child),
  );
}

/**
 * Checks if an element is an interactive element that should capture focus/events.
 * Used to prevent carousel navigation when interacting with form elements.
 * @param element - DOM element to check
 * @returns True if element is interactive (button, input, etc.)
 */
export function isInteractiveElement(element: Element | null): boolean {
  if (!element) {
    return false;
  }

  const interactiveTags = [
    'BUTTON',
    'INPUT',
    'SELECT',
    'TEXTAREA',
    'A',
    'VIDEO',
    'AUDIO',
  ];

  if (interactiveTags.includes(element.tagName)) {
    return true;
  }

  // Check for elements with interactive roles
  const role = element.getAttribute('role');
  const interactiveRoles = [
    'button',
    'link',
    'textbox',
    'listbox',
    'menuitem',
    'tab',
    'slider',
  ];

  if (role && interactiveRoles.includes(role)) {
    return true;
  }

  // Check for contenteditable
  if (element.getAttribute('contenteditable') === 'true') {
    return true;
  }

  return false;
}

/**
 * Calculates the slide width percentage based on slides per view.
 * @param slidesPerView - Number of slides visible at once
 * @param spacing - Spacing between slides
 * @returns CSS calc() expression for slide width
 */
export function calculateSlideWidth(
  slidesPerView: number,
  spacing: number | string | undefined,
): string {
  const normalizedSpacing = normalizeSpacing(spacing);

  if (slidesPerView <= 1) {
    return '100%';
  }

  // Account for spacing between slides
  // Total spacing = (slidesPerView - 1) * spacing
  // Each slide width = (100% - total spacing) / slidesPerView
  if (normalizedSpacing === '0px') {
    return `${100 / slidesPerView}%`;
  }

  return `calc((100% - ${normalizedSpacing} * ${slidesPerView - 1}) / ${slidesPerView})`;
}

/**
 * Calculates the transform offset for the slides container.
 * @param activeIndex - Current active slide index
 * @param slidesPerView - Number of slides visible at once
 * @param spacing - Spacing between slides
 * @returns CSS transform translateX value
 */
export function calculateTransformOffset(
  activeIndex: number,
  slidesPerView: number,
  spacing: number | string | undefined,
): string {
  const normalizedSpacing = normalizeSpacing(spacing);

  if (slidesPerView <= 1 && normalizedSpacing === '0px') {
    return `${-activeIndex * 100}%`;
  }

  // Complex calculation accounting for spacing
  const slideWidth = calculateSlideWidth(slidesPerView, spacing);

  if (normalizedSpacing === '0px') {
    return `calc(-${activeIndex} * ${slideWidth})`;
  }

  // Each slide offset = slideWidth + spacing
  return `calc(-${activeIndex} * (${slideWidth} + ${normalizedSpacing}))`;
}

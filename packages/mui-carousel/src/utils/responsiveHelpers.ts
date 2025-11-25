'use client';
import { Breakpoint } from '@mui/material/styles';
import { ResponsiveValue, BREAKPOINT_ORDER } from '../types';

/**
 * Type guard to check if a value is a responsive object.
 */
export function isResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
): value is Exclude<ResponsiveValue<T>, T> {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value !== 'object') {
    return false;
  }
  // Check if it has any breakpoint keys
  const breakpointKeys = new Set(['xs', 'sm', 'md', 'lg', 'xl']);
  return Object.keys(value).some((key) => breakpointKeys.has(key));
}

/**
 * Get the value for a specific breakpoint, with fallback to smaller breakpoints.
 *
 * If the requested breakpoint doesn't have a value, it falls back to the
 * next smaller breakpoint that has a value.
 *
 * @example
 * // { xs: 1, md: 3 } at 'lg' returns 3 (falls back to md)
 * // { xs: 1, md: 3 } at 'sm' returns 1 (falls back to xs)
 */
export function getBreakpointValue<T>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint,
  defaultValue: T,
): T {
  // If it's not a responsive value, return it directly
  if (!isResponsiveValue(value)) {
    return value as T;
  }

  // Get the index of the current breakpoint
  const breakpointIndex = BREAKPOINT_ORDER.indexOf(breakpoint);

  // Search from the current breakpoint down to xs for a value
  for (let i = breakpointIndex; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i];
    const bpValue = (value as Record<Breakpoint, T | undefined>)[bp];
    if (bpValue !== undefined) {
      return bpValue;
    }
  }

  // No value found at any breakpoint, return default
  return defaultValue;
}

/**
 * Normalize a value to a responsive object.
 * If the value is already responsive, returns it unchanged.
 * If it's a simple value, wraps it as { xs: value }.
 */
export function normalizeResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
): ResponsiveValue<T> {
  if (isResponsiveValue(value)) {
    return value;
  }
  return { xs: value as T };
}

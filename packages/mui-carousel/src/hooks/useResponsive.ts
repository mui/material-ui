'use client';
import { useTheme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResponsiveValue, BREAKPOINT_ORDER } from '../types';
import { isResponsiveValue, getBreakpointValue } from '../utils/responsiveHelpers';

export interface UseResponsiveParameters<T> {
  /** The responsive value (simple value or breakpoint object) */
  value: ResponsiveValue<T>;
  /** Default value if no breakpoint matches */
  defaultValue: T;
}

export interface UseResponsiveReturn<T> {
  /** The resolved value for the current breakpoint */
  value: T;
  /** The current active breakpoint */
  breakpoint: Breakpoint;
}

/**
 * Hook to resolve responsive values based on the current viewport breakpoint.
 *
 * Uses MUI's useMediaQuery to detect the active breakpoint and returns
 * the appropriate value from a responsive configuration.
 *
 * @example
 * const { value: slidesPerView } = useResponsive({
 *   value: { xs: 1, sm: 2, md: 3 },
 *   defaultValue: 1,
 * });
 *
 * @remarks
 * - SSR-safe: Returns the xs value (or default) during SSR
 * - Falls back through breakpoints if a specific breakpoint isn't defined
 */
export function useResponsive<T>({
  value,
  defaultValue,
}: UseResponsiveParameters<T>): UseResponsiveReturn<T> {
  const theme = useTheme();

  // If it's not a responsive value, return it directly
  if (!isResponsiveValue(value)) {
    return {
      value: value as T,
      breakpoint: 'xs',
    };
  }

  // Query each breakpoint (from largest to smallest for proper detection)
  // Using up() so we detect the minimum breakpoint that matches
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  // xs is always true (it's the default/smallest)

  // Determine the active breakpoint (largest matching)
  let activeBreakpoint: Breakpoint = 'xs';
  if (isXl) {
    activeBreakpoint = 'xl';
  } else if (isLg) {
    activeBreakpoint = 'lg';
  } else if (isMd) {
    activeBreakpoint = 'md';
  } else if (isSm) {
    activeBreakpoint = 'sm';
  }

  // Get the value for this breakpoint (with fallback)
  const resolvedValue = getBreakpointValue(value, activeBreakpoint, defaultValue);

  return {
    value: resolvedValue,
    breakpoint: activeBreakpoint,
  };
}

export default useResponsive;

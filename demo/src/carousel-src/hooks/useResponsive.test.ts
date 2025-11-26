import { expect } from 'chai';
import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useResponsive } from './useResponsive';

describe('useResponsive', () => {
  // Helper to create a wrapper with theme
  const createWrapper = () => {
    const theme = createTheme();
    return function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(ThemeProvider, { theme }, children);
    };
  };

  // Mock matchMedia for different breakpoints
  const mockMatchMedia = (activeBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const breakpointWidths = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    };

    const currentWidth = breakpointWidths[activeBreakpoint];

    window.matchMedia = (query: string) => {
      // Parse the min-width from the query
      const minWidthMatch = query.match(/min-width:\s*(\d+)/);
      const minWidth = minWidthMatch ? parseInt(minWidthMatch[1], 10) : 0;

      return {
        matches: currentWidth >= minWidth,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      } as MediaQueryList;
    };
  };

  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('simple values', () => {
    it('should pass through non-responsive values unchanged', () => {
      mockMatchMedia('md');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: 3,
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(3);
    });

    it('should return string values unchanged', () => {
      mockMatchMedia('md');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: 'auto',
            defaultValue: 'none',
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal('auto');
    });
  });

  describe('responsive values', () => {
    it('should resolve xs value at xs breakpoint', () => {
      mockMatchMedia('xs');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(1);
      expect(result.current.breakpoint).to.equal('xs');
    });

    it('should resolve sm value at sm breakpoint', () => {
      mockMatchMedia('sm');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(2);
      expect(result.current.breakpoint).to.equal('sm');
    });

    it('should resolve md value at md breakpoint', () => {
      mockMatchMedia('md');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(3);
      expect(result.current.breakpoint).to.equal('md');
    });

    it('should resolve lg value at lg breakpoint', () => {
      mockMatchMedia('lg');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(4);
      expect(result.current.breakpoint).to.equal('lg');
    });

    it('should resolve xl value at xl breakpoint', () => {
      mockMatchMedia('xl');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(5);
      expect(result.current.breakpoint).to.equal('xl');
    });
  });

  describe('fallback behavior', () => {
    it('should fall back to smaller breakpoint when current not defined', () => {
      mockMatchMedia('lg');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, md: 3 }, // No lg defined
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      // Should fall back to md value
      expect(result.current.value).to.equal(3);
    });

    it('should fall back to xs when only xs is defined', () => {
      mockMatchMedia('xl');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1 }, // Only xs defined
            defaultValue: 0,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(1);
    });

    it('should use defaultValue when no breakpoint matches', () => {
      mockMatchMedia('xs');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { sm: 2 }, // No xs defined
            defaultValue: 99,
          }),
        { wrapper: createWrapper() },
      );

      expect(result.current.value).to.equal(99);
    });
  });

  describe('partial responsive objects', () => {
    it('should handle objects with only some breakpoints', () => {
      mockMatchMedia('md');
      const { result } = renderHook(
        () =>
          useResponsive({
            value: { xs: 1, lg: 4 },
            defaultValue: 1,
          }),
        { wrapper: createWrapper() },
      );

      // md is between xs and lg, should fall back to xs
      expect(result.current.value).to.equal(1);
    });
  });
});

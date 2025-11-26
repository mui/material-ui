/**
 * Performance utilities for the Carousel component.
 * These utilities help optimize rendering and user interactions.
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * The throttled function will invoke func on the leading edge.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T & { cancel: () => void } {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      func.apply(this, args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastCall = 0;
  };

  return throttled;
}

/**
 * Preloads an image by creating an Image object and setting its src.
 * Returns a promise that resolves when the image is loaded or rejects on error.
 *
 * @param src - The image URL to preload
 * @returns A promise that resolves with the loaded image or rejects on error
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to preload image: ${src}`));
    };

    img.src = src;
  });
}

/**
 * Preloads multiple images in parallel.
 *
 * @param sources - Array of image URLs to preload
 * @returns A promise that resolves with an array of loaded images
 */
export function preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(sources.map(preloadImage));
}

/**
 * Development utility for measuring render times.
 * Tree-shaken in production builds when used with process.env.NODE_ENV check.
 *
 * @param componentName - Name of the component being measured
 * @param callback - Function to execute and measure
 * @returns The result of the callback
 */
export function measureRenderTime<T>(componentName: string, callback: () => T): T {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    const duration = end - start;

    // Only log if render took more than 1ms (to avoid noise)
    if (duration > 1) {
      console.debug(`[Carousel Performance] ${componentName} render: ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  return callback();
}

/**
 * Development utility for profiling a function's execution time.
 * Useful for measuring expensive calculations.
 *
 * @param label - Label for the measurement
 * @param func - Function to profile
 * @returns The result of the function
 */
export function profile<T>(label: string, func: () => T): T {
  if (process.env.NODE_ENV === 'development') {
    performance.mark(`${label}-start`);
    const result = func();
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);

    const entries = performance.getEntriesByName(label, 'measure');
    if (entries.length > 0) {
      console.debug(`[Carousel Profile] ${label}: ${entries[0].duration.toFixed(2)}ms`);
    }

    // Clean up marks and measures
    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);

    return result;
  }

  return func();
}

/**
 * Checks if the user has requested reduced motion.
 * Useful for respecting accessibility preferences.
 *
 * @returns True if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

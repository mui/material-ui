import * as React from 'react';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

/**
 * Convenience wrapper around fgLoadCSS for hooks usage
 * @param {string} href
 * @param {string} before - CSS selector
 * @returns {() => void} cleanup function
 */
export default function useLazyCSS(href, before) {
  React.useEffect(() => {
    const link = loadCSS(href, document.querySelector(before));
    return () => {
      link.parentElement.removeChild(link);
    };
  }, [href, before]);
}

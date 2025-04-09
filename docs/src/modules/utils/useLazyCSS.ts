import * as React from 'react';
import { loadCSS } from 'fg-loadcss';

/**
 * Convenience wrapper around fgLoadCSS for hooks usage
 * @param {string} href
 * @param {string} before - CSS selector
 * @returns {() => void} cleanup function
 */
export default function useLazyCSS(href: string, before: string) {
  React.useEffect(() => {
    const link = loadCSS(href, document.querySelector(before) as HTMLElement);
    return () => {
      link.parentElement?.removeChild(link);
    };
  }, [href, before]);
}

import * as React from 'react';
import { useRouter } from '@mui/docs/routing';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

export function samePageLinkNavigation(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return true;
  }
  return false;
}

function isLink(event: MouseEvent): HTMLElement | null {
  let activeElement: HTMLElement | null = event.target as HTMLElement | null;
  while (activeElement?.nodeType === Node.ELEMENT_NODE && activeElement.nodeName !== 'A') {
    activeElement = activeElement.parentElement;
  }

  // Ignore non internal link clicks.
  // Absolute URLs can be internal, we delegate this to Next.js's router
  if (
    activeElement === null ||
    activeElement.nodeName !== 'A' ||
    activeElement.getAttribute('target') === '_blank' ||
    activeElement.getAttribute('data-no-markdown-link') === 'true'
  ) {
    return null;
  }

  return activeElement;
}

export default function MarkdownLinks() {
  const router = useRouter();

  React.useEffect(() => {
    /**
     * @param {MouseEvent} event
     */
    function handleClick(event: MouseEvent) {
      // Ignore click events meant for native link handling, for example open in new tab
      if (samePageLinkNavigation(event)) {
        return;
      }

      const activeElement = isLink(event);
      if (activeElement === null) {
        return;
      }

      event.preventDefault();
      const as = activeElement.getAttribute('href');
      if (as === null) {
        return;
      }
      const canonicalPathname = pathnameToLanguage(as).canonicalPathname;
      router.push(canonicalPathname, as);
    }

    /**
     * Source copied from https://github.com/vercel/next.js/blob/ebc4eaaa2564b4283711646079d68e430496c88b/packages/next/src/client/link.tsx
     */
    function handleMouseOver(event: MouseEvent) {
      const activeElement = isLink(event);
      if (activeElement === null) {
        return;
      }

      const as = activeElement.getAttribute('href');
      if (as === null) {
        return;
      }
      const canonicalPathname = pathnameToLanguage(as).canonicalPathname;

      const prefetchPromise = router.prefetch(canonicalPathname, as, { priority: true });
      // Prefetch the JSON page if asked (only in the client)
      // We need to handle a prefetch error here since we may be
      // loading with priority which can reject but we don't
      // want to force navigation since this is only a prefetch
      Promise.resolve(prefetchPromise).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          // rethrow to show invalid URL errors
          throw err;
        }
      });
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [router]);

  return null;
}

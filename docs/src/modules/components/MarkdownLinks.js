import React from 'react';
import Router from 'next/router';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

export async function handleEvent(event, as) {
  // Ignore click for new tab/new window behavior
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return;
  }

  event.preventDefault();

  let pathname = as.replace(/#(.*)$/, '');
  // Add support for leading / in development mode.
  if (pathname !== '/') {
    // The leading / is only added to support static hosting (resolve /index.html).
    // We remove it to normalize the pathname.
    // See `rewriteUrlForNextExport` on Next.js side.
    pathname = pathname.replace(/\/$/, '');
  }
  pathname = pathnameToLanguage(pathname).canonical;

  const success = await Router.push(pathname, as);
  if (!success) {
    return;
  }
  window.scrollTo(0, 0);
  document.body.focus();
}

function handleClick(event) {
  const activeElement = document.activeElement;

  // Ignore non link clicks
  if (
    activeElement.nodeName !== 'A' ||
    activeElement.getAttribute('target') === '_blank' ||
    activeElement.getAttribute('data-no-link') === 'true' ||
    activeElement.getAttribute('href').indexOf('/') !== 0
  ) {
    return;
  }

  handleEvent(event, document.activeElement.getAttribute('href'));
}

let bound = false;

export default function MarkdownLinks() {
  React.useEffect(() => {
    if (bound) {
      return;
    }
    bound = true;
    document.addEventListener('click', handleClick);
  }, []);

  return null;
}

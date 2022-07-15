import * as React from 'react';
import Router from 'next/router';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

export function openLinkInNewTab(event) {
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

export function handleEvent(event, as) {
  // Ignore click for new tab/new window behavior
  if (openLinkInNewTab(event)) {
    return;
  }

  event.preventDefault();

  const canonicalPathname = pathnameToLanguage(as).canonicalPathname;
  Router.push(canonicalPathname, as);
}

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  let activeElement = event.target;
  while (activeElement?.nodeType === Node.ELEMENT_NODE && activeElement.nodeName !== 'A') {
    activeElement = activeElement.parentElement;
  }

  // Ignore non link clicks
  if (
    activeElement === null ||
    activeElement.nodeName !== 'A' ||
    activeElement.getAttribute('target') === '_blank' ||
    activeElement.getAttribute('data-no-markdown-link') === 'true' ||
    activeElement.getAttribute('href').indexOf('/') !== 0
  ) {
    return;
  }

  handleEvent(event, activeElement.getAttribute('href'));
}

export default function MarkdownLinks() {
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.addEventListener('click', handleClick);
    };
  }, []);

  return null;
}

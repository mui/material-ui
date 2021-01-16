import * as React from 'react';
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
  pathname = pathnameToLanguage(pathname).canonical;

  const success = await Router.push(pathname, as);
  if (!success) {
    return;
  }
  window.scrollTo(0, 0);
  document.body.focus();
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
    activeElement.getAttribute('data-no-link') === 'true' ||
    activeElement.getAttribute('href').indexOf('/') !== 0
  ) {
    return;
  }

  handleEvent(event, activeElement.getAttribute('href'));
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

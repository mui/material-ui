import React from 'react';
import Router from 'next/router';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

async function handleClick(event) {
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

  // Ignore click for new tab/new window behavior
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    (event.nativeEvent && event.nativeEvent.which === 2)
  ) {
    return;
  }

  event.preventDefault();

  const as = activeElement.getAttribute('href');
  const { canonical } = pathnameToLanguage(as);
  const href = canonical;

  const success = await Router.push(href, as);
  if (!success) {
    return;
  }
  window.scrollTo(0, 0);
  document.body.focus();
}

let bound = false;

class MarkdownLinks extends React.Component {
  componentDidMount() {
    if (bound) {
      return;
    }
    bound = true;
    document.addEventListener('click', handleClick);
  }

  render() {
    return null;
  }
}

export default MarkdownLinks;

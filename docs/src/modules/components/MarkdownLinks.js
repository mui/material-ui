import React from 'react';
import Router from 'next/router';

async function handleClick(event) {
  const activeElement = document.activeElement;

  // Ignore non link clicks
  if (
    activeElement.nodeName !== 'A' ||
    activeElement.getAttribute('target') === '_blank' ||
    activeElement.getAttribute('href').indexOf('/') !== 0
  ) {
    return;
  }

  // Ignore click for new tab / new window behavior
  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    (event.nativeEvent && event.nativeEvent.which === 2)
  ) {
    return;
  }

  event.preventDefault();
  const success = await Router.push(activeElement.getAttribute('href'));
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

import React from 'react';

function handleClick(event) {
  const rootNode = document;
  let element = event.target;

  while (element && element !== rootNode) {
    const category = element.getAttribute('data-ga-event-category');

    // We reach a tracking element, no need to look higher in the dom tree.
    if (category) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: element.getAttribute('data-ga-event-action'),
        eventLabel: element.getAttribute('data-ga-event-label'),
      });
      break;
    }

    element = element.parentNode;
  }
}

let binded = false;

// So we can write code like:
//
// <Button
//   ga-event-category="demo"
//   ga-event-action="expand"
// >
//   Foo
// </Button>
function bindEvents() {
  if (binded) {
    return;
  }

  binded = true;
  document.addEventListener('click', handleClick);
}

class GoogleAnalytics extends React.Component {
  googleTimer = null;

  componentDidMount() {
    bindEvents();
    // Wait for the title to be updated.
    setTimeout(() => {
      window.ga('set', { page: window.location.pathname });
      window.ga('send', { hitType: 'pageview' });
    });
  }

  render() {
    return null;
  }
}

export default GoogleAnalytics;

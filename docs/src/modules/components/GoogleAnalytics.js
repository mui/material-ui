import React from 'react';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

// So we can write code like:
//
// <Button
//   ga-event-category="demo"
//   ga-event-action="expand"
// >
//   Foo
// </Button>
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

let bound = false;

class GoogleAnalytics extends React.Component {
  componentDidMount() {
    // Wait for the title to be updated.
    setTimeout(() => {
      const { canonical } = pathnameToLanguage(window.location.pathname);
      window.ga('set', { page: canonical });
      window.ga('send', { hitType: 'pageview' });
    });

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

export default GoogleAnalytics;

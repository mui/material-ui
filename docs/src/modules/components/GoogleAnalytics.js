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
  let element = event.target;

  while (element && element !== document) {
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

    element = element.parentElement;
  }
}

let bound = false;

export default function GoogleAnalytics() {
  React.useEffect(() => {
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
  }, []);

  return null;
}

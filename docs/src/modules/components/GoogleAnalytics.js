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
      window.gtag('event', category, {
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
  const timeout = React.useRef();

  React.useEffect(() => {
    // Wait for the title to be updated.
    // React fires useEffect twice in dev mode
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const { canonical } = pathnameToLanguage(window.location.pathname);

      // https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: canonical,
      });
    });

    if (bound) {
      return;
    }
    bound = true;
    document.addEventListener('click', handleClick);
  }, []);

  return null;
}

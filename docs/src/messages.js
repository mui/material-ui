import React from 'react';

const messages = [
  {
    id: 1,
    text:
      "We've introduced notifications. " +
      "They use a cookie to keep track of what you've already seen.",
  },
  {
    id: 2,
    text: (
      <span>
        Check out the{' '}
        <a
          style={{ color: 'white' }}
          href="https://medium.com/@haicea/material-ui-sustainability-progress-report-9246d8b2149d"
        >
          Material-UI Sustainability Progress Report!
        </a>
      </span>
    ),
  },
  {
    id: 3,
    text: (
      <span>
        {"We've released v1.0.0-beta.30. Please check the"}{' '}
        <a
          style={{ color: 'white' }}
          href="https://github.com/mui-org/material-ui/releases/tag/v1.0.0-beta.30"
        >
          release notes{' '}
        </a>
        for breaking changes.
      </span>
    ),
  },
];

export default messages;

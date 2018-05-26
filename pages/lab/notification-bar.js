import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/lab/notification-bar/notification-bar.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/notification-bar/SimpleNotificationBar.js': {
          js: require('docs/src/pages/lab/notification-bar/SimpleNotificationBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/notification-bar/SimpleNotificationBar'), 
  'utf8')
`,
        },
        'pages/lab/notification-bar/ClosableNotificationBar.js': {
          js: require('docs/src/pages/lab/notification-bar/ClosableNotificationBar').default,
          raw: preval`
  module.exports = require('fs')
    .readFileSync(require.resolve('docs/src/pages/lab/notification-bar/ClosableNotificationBar'), 
    'utf8')
  `,
        },
        'pages/lab/notification-bar/WithoutIconNotificationBar.js': {
          js: require('docs/src/pages/lab/notification-bar/WithoutIconNotificationBar').default,
          raw: preval`
  module.exports = require('fs')
    .readFileSync(require
    .resolve('docs/src/pages/lab/notification-bar/WithoutIconNotificationBar'), 'utf8')
  `,
        },
      }}
    />
  );
}

export default withRoot(Page);

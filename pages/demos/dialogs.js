// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/dialogs/dialogs.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/dialogs/SimpleDialog.js': {
          js: require('docs/src/pages/demos/dialogs/SimpleDialog').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dialogs/SimpleDialog'), 'utf8')
`,
        },
        'pages/demos/dialogs/AlertDialog.js': {
          js: require('docs/src/pages/demos/dialogs/AlertDialog').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dialogs/AlertDialog'), 'utf8')
`,
        },
        'pages/demos/dialogs/AlertDialogSlide.js': {
          js: require('docs/src/pages/demos/dialogs/AlertDialogSlide').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dialogs/AlertDialogSlide'), 'utf8')
`,
        },
        'pages/demos/dialogs/ConfirmationDialog.js': {
          js: require('docs/src/pages/demos/dialogs/ConfirmationDialog').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dialogs/ConfirmationDialog'), 'utf8')
`,
        },
        'pages/demos/dialogs/FullScreenDialog.js': {
          js: require('docs/src/pages/demos/dialogs/FullScreenDialog').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dialogs/FullScreenDialog'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

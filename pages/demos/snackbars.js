// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/snackbars/snackbars.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/snackbars/SimpleSnackbar.js': {
          js: require('docs/src/pages/demos/snackbars/SimpleSnackbar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/snackbars/SimpleSnackbar'), 'utf8')
`,
        },
        'pages/demos/snackbars/LongTextSnackbar.js': {
          js: require('docs/src/pages/demos/snackbars/LongTextSnackbar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/snackbars/LongTextSnackbar'), 'utf8')
`,
        },
        'pages/demos/snackbars/PositionedSnackbar.js': {
          js: require('docs/src/pages/demos/snackbars/PositionedSnackbar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/snackbars/PositionedSnackbar'), 'utf8')
`,
        },
        'pages/demos/snackbars/DirectionSnackbar.js': {
          js: require('docs/src/pages/demos/snackbars/DirectionSnackbar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/snackbars/DirectionSnackbar'), 'utf8')
`,
        },
        'pages/demos/snackbars/FadeSnackbar.js': {
          js: require('docs/src/pages/demos/snackbars/FadeSnackbar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/snackbars/FadeSnackbar'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

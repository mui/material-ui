// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/progress/progress.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/progress/CircularIndeterminate.js': {
          js: require('docs/src/pages/demos/progress/CircularIndeterminate').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/CircularIndeterminate'), 'utf8')
`,
        },
        'pages/demos/progress/CircularFab.js': {
          js: require('docs/src/pages/demos/progress/CircularFab').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/CircularFab'), 'utf8')
`,
        },
        'pages/demos/progress/CircularDeterminate.js': {
          js: require('docs/src/pages/demos/progress/CircularDeterminate').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/CircularDeterminate'), 'utf8')
`,
        },
        'pages/demos/progress/LinearIndeterminate.js': {
          js: require('docs/src/pages/demos/progress/LinearIndeterminate').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/LinearIndeterminate'), 'utf8')
`,
        },
        'pages/demos/progress/LinearDeterminate.js': {
          js: require('docs/src/pages/demos/progress/LinearDeterminate').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/LinearDeterminate'), 'utf8')
`,
        },
        'pages/demos/progress/LinearBuffer.js': {
          js: require('docs/src/pages/demos/progress/LinearBuffer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/LinearBuffer'), 'utf8')
`,
        },
        'pages/demos/progress/LinearQuery.js': {
          js: require('docs/src/pages/demos/progress/LinearQuery').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/progress/LinearQuery'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/layout/grid.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/SpacingGrid.js': {
          js: require('docs/src/pages/layout/SpacingGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/SpacingGrid'), 'utf8')
`,
        },
        'pages/layout/FullWidthGrid.js': {
          js: require('docs/src/pages/layout/FullWidthGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/FullWidthGrid'), 'utf8')
`,
        },
        'pages/layout/CenteredGrid.js': {
          js: require('docs/src/pages/layout/CenteredGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/CenteredGrid'), 'utf8')
`,
        },
        'pages/layout/InteractiveGrid.js': {
          js: require('docs/src/pages/layout/InteractiveGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/InteractiveGrid'), 'utf8')
`,
        },
        'pages/layout/AutoGrid.js': {
          js: require('docs/src/pages/layout/AutoGrid').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/AutoGrid'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

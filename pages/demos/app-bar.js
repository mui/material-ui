// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/app-bar/app-bar.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/app-bar/SimpleAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/SimpleAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/SimpleAppBar'), 'utf8')
`,
        },
        'pages/demos/app-bar/ButtonAppBar.js': {
          js: require('docs/src/pages/demos/app-bar/ButtonAppBar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/app-bar/ButtonAppBar'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

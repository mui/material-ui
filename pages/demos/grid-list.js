// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/grid-list/grid-list.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/grid-list/ImageGridList.js': {
          js: require('docs/src/pages/demos/grid-list/ImageGridList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/grid-list/ImageGridList'), 'utf8')
`,
        },
        'pages/demos/grid-list/TitlebarGridList.js': {
          js: require('docs/src/pages/demos/grid-list/TitlebarGridList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/grid-list/TitlebarGridList'), 'utf8')
`,
        },
        'pages/demos/grid-list/AdvancedGridList.js': {
          js: require('docs/src/pages/demos/grid-list/AdvancedGridList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/grid-list/AdvancedGridList'), 'utf8')
`,
        },
        'pages/demos/grid-list/SingleLineGridList.js': {
          js: require('docs/src/pages/demos/grid-list/SingleLineGridList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/grid-list/SingleLineGridList'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

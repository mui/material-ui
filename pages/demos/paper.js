// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/paper/paper.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/paper/PaperSheet.js': {
          js: require('docs/src/pages/demos/paper/PaperSheet').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/paper/PaperSheet'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

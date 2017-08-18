// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/guides/composition.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/Composition.js': {
          js: require('docs/src/pages/guides/Composition').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/guides/Composition'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

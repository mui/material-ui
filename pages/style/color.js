// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/style/color.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/Color.js': {
          js: require('docs/src/pages/style/Color').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/Color'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

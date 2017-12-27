import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/layout/portal.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layout/SimplePortal.js': {
          js: require('docs/src/pages/layout/SimplePortal').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layout/SimplePortal'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

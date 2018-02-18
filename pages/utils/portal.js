import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/utils/portal/portal.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/portal/SimplePortal.js': {
          js: require('docs/src/pages/utils/portal/SimplePortal').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/portal/SimplePortal'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

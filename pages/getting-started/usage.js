import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/getting-started/usage/usage.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/getting-started/usage/Usage.js': {
          js: require('docs/src/pages/getting-started/usage/Usage').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/getting-started/usage/Usage'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

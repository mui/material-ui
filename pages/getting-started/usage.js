import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/getting-started/usage/usage.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/getting-started/usage/Usage.js': {
          js: require('docs/pages/getting-started/usage/Usage').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/getting-started/usage/Usage'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

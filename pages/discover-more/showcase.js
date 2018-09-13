import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/discover-more/showcase/showcase.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/discover-more/showcase/Showcase.js': {
          js: require('docs/pages/discover-more/showcase/Showcase').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/discover-more/showcase/Showcase'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

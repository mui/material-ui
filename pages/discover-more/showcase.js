import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/discover-more/showcase/showcase.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/discover-more/showcase/Showcase.js': {
          js: require('docs/src/pages/discover-more/showcase/Showcase').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/discover-more/showcase/Showcase'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

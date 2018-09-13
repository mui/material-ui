import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/paper/paper.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/paper/PaperSheet.js': {
          js: require('docs/pages/demos/paper/PaperSheet').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/paper/PaperSheet'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

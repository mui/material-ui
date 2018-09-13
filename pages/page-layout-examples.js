import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/page-layout-examples/page-layout-examples.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/page-layout-examples/PageLayoutExamples.js': {
          js: require('docs/pages/page-layout-examples/PageLayoutExamples').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/page-layout-examples/PageLayoutExamples'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

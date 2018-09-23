import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/page-layout-examples/page-layout-examples.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/page-layout-examples/PageLayoutExamples.js': {
          js: require('docs/src/pages/page-layout-examples/PageLayoutExamples').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/page-layout-examples/PageLayoutExamples'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

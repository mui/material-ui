import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./page-layout-examples${props.lang}.md`)}
      demos={{
        'pages/getting-started/page-layout-examples/PageLayoutExamples.js': {
          js: require('docs/src/pages/getting-started/page-layout-examples/PageLayoutExamples')
            .default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(
    require.resolve('docs/src/pages/getting-started/page-layout-examples/PageLayoutExamples'),
    'utf8'
  )
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

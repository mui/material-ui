import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./usage-${props.lang}.md`)}
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

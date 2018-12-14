import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./usage${props.lang}.md`)}
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

export default Page;

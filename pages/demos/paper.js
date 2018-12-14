import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./paper${props.lang}.md`)}
      demos={{
        'pages/demos/paper/PaperSheet.js': {
          js: require('docs/src/pages/demos/paper/PaperSheet').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/paper/PaperSheet'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;

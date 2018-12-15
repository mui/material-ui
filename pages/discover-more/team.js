import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./team${props.lang}.md`)}
      demos={{
        'pages/discover-more/team/Team.js': {
          js: require('docs/src/pages/discover-more/team/Team').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/discover-more/team/Team'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;

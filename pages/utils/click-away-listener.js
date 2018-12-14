import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./click-away-listener${props.lang}.md`)}
      demos={{
        'pages/utils/click-away-listener/ClickAway.js': {
          js: require('docs/src/pages/utils/click-away-listener/ClickAway').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/click-away-listener/ClickAway'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;

import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./no-ssr${props.lang}.md`)}
      demos={{
        'pages/utils/no-ssr/SimpleNoSsr.js': {
          js: require('docs/src/pages/utils/no-ssr/SimpleNoSsr').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/utils/no-ssr/SimpleNoSsr'), 'utf8')
`,
        },
      }}
    />
  );
}

export default Page;

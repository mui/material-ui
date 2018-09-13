import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/utils/no-ssr/no-ssr.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/utils/no-ssr/SimpleNoSsr.js': {
          js: require('docs/pages/utils/no-ssr/SimpleNoSsr').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/utils/no-ssr/SimpleNoSsr'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

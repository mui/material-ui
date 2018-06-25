import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/lab/backdrop/backdrop.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/backdrop/Backdrop.js': {
          js: require('docs/src/pages/lab/backdrop/Backdrop').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/backdrop/Backdrop'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);

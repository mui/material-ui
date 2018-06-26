import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/lab/backdrop/backdrop.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/lab/backdrop/SimpleBackdrop.js': {
          js: require('docs/src/pages/lab/backdrop/SimpleBackdrop').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/backdrop/SimpleBackdrop'), 'utf8')
`,
        },
        'pages/lab/backdrop/MultiSectionBackdrop.js': {
          js: require('docs/src/pages/lab/backdrop/MultiSectionBackdrop').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/lab/backdrop/MultiSectionBackdrop'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
